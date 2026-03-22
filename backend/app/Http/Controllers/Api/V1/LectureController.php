<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lecture\LectureRequest;
use App\Http\Resources\LectureResource;
use App\Http\Resources\LectureTextResource;
use App\Models\Lecture;
use App\Models\LectureText;
use App\Services\GeminiService;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\PdfToText\Pdf; // library to extract text from PDF files

class LectureController extends Controller
{
    public function __construct(protected GeminiService $geminiService) {}

    public function search(){

        $term = request('title');

        $response = Lecture::with('LectureText')->where('title', 'like', '%' . $term . '%')->get();

        // you must always return array or object to avoid the undefined error in the frontend while mapping through the response
        return response()->json([
            'searchResult' => $response,
            'message' => $response->isEmpty()
                ? 'No lecture with this title exists'
                : 'Returned search result successfully'
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all user uploaded lectures
        $lectures = Lecture::where('user_id', Auth::id())->paginate(10);
        return LectureResource::collection($lectures);
    }

    /**
     * get lecture content (text)
     */
    public function getLectureText()
    {
        $content = LectureText::whereHas('lecture', function ($query) {
            $query->where('user_id', Auth::id());
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
        $data['user_id'] = Auth::id(); // authenticated user id

        try {
            // create a new lecture record in the database only if all operations succeed
            DB::transaction(function () use ($data, $request) {

                $file = $request->file('file');
                $data['original_name'] = $file->getClientOriginalName();

                $lecture = Lecture::create($data);

                $path = $file->store('lectures');
                $fullPath = storage_path('app/' . $path);

                if (!is_readable($fullPath)) {
                    Storage::delete($path);
                    throw new Exception("File is not readable!");
                }

                $text = Pdf::getText($fullPath, config('services.poppler.path'));

                if (empty(trim($text))) {
                    Storage::delete($path);
                    throw new Exception("This PDF has no readable text. Please upload a text-based PDF.");
                }

                $formattedText = $this->geminiService->format($text);

                $lecture->update(['file_path' => $path]);

                $lecture->lectureText()->create([
                    'content' => $formattedText,
                ]);
            });
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to upload lecture: ' . $e->getMessage(),
            ], 400);
        }

        return response()->json([
            'message' => 'Lecture uploaded successfully',
        ], 201);
    }

    public function summarizeLecture($id, GeminiService $gemini)
    {
        $lecture = Lecture::with('lectureText')
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $text = Str::limit($lecture->lectureText->content, 1000); // small test
        $summary = $gemini->summarize($text);

        // store summary in the aiResult table (through relationships)
        $lecture->aiResults()->create([
            'type' => 'summary',
            'content' => $summary
        ]);

        Http::post('http://localhost:5678/webhook/88bc3b23-f9f9-4d8e-8733-b4eaf26f0ebe', [
            'email' => Auth::user()->email,
            'lecture_id' => $lecture->id,
            'summary' => $summary
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
        $lecture = Lecture::where('id', $id)->where('user_id', Auth::id())->with('lectureText')->first();

        if (!$lecture) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lecture not found'
            ], 404);
        }

        return new LectureResource($lecture);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lecture = Lecture::where('id', $id)->where('user_id', Auth::id())->first();

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
