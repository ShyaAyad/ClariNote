<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lecture\LectureRequest;
use App\Http\Resources\LectureResource;
use App\Http\Resources\LectureTextResource;
use App\Models\AiResults;
use App\Models\Lecture;
use App\Models\LectureText;
use App\Services\GeminiService;
use Exception;
use Illuminate\Support\Str;
use Spatie\PdfToText\Pdf; // library to extract text from PDF files

class LectureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all user uploaded lectures
        $lectures = Lecture::where('user_id', auth()->id())->paginate(10);
        return LectureResource::collection($lectures);
    }

    /**
     * get lecture content (text)
     */
    public function getLectureText()
    {
        $content = LectureText::whereHas('lecture', function ($query) {
            $query->where('user_id', auth()->id());
        })->paginate(10);
        return LectureTextResource::collection($content);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LectureRequest $request)
    {
        // validate the request data
        $data = $request->validated();

        // create a new lecture record in the database
        $data['user_id'] = auth()->id(); // authenticated user id
        $lecture = Lecture::create($data);

        // handle uploaded PDF
        $file = $request->file('file');

        // store PDF in a folder named 'lectures' in the storage/app directory
        $path = $file->store('lectures');
        $fullPath = storage_path('app/' . $path);

        // check if file is readable
        if (!is_readable($fullPath)) {
            throw new Exception("File is not readable, please upload readable files only!");
        }

        // extract text from PDF
        $text = Pdf::getText(
            $fullPath,
            'C:\Program Files\poppler-25.12.0\Library\bin\pdftotext.exe'
        );

        // store extracted text in the lecture_texts
        $lecture->lectureText()->create([
            'content' => $text,
        ]);

        return response()->json([
            'message' => 'Lecture uploaded successfully',
            'lecture' => $lecture,
        ], 201);
    }

    public function summarizeLecture($id, GeminiService $gemini)
    {
        $lecture = Lecture::with('lectureText')
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $text = Str::limit($lecture->lectureText->content, 1000); // small test
        $summary = $gemini->summarize($text);

        // store summary in the aiResult table (through relationships)
        $lecture->aiResults()->create([
            'type' => 'summary', 
            'content' => $summary
        ]);

        return response()->json([
            'status' => 'success',
            'summary' => $summary
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $lecture = Lecture::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$lecture) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lecture not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $lecture
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lecture = Lecture::where('id', $id)->where('user_id', auth()->id())->first();

        if (!$lecture) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lecture not found'
            ], 404);
        }

        $lecture->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Lecture has been deleted successfully!'
        ], 200);
    }
}
