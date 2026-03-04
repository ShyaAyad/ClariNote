<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lecture\LectureRequest;
use App\Models\Lecture;
use Illuminate\Http\Request;
use Spatie\PdfToText\Pdf; // library to extract text from PDF files

/*
* Methods to implement in this controller:
* uploadLecture ---> store 
* summarizeLecture
* getLecture ---> show 
* getAllLectures ---> index
* deleteLecture ---> destroy

$lecture->lectureText()->create([
        'content' => $extractedText,
    ]);
*/

class LectureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LectureRequest $request)
    {
        // validate the request data
        $data = $request->validated();

        // create a new lecture record in the database
        $data['user_id'] = auth()->id; // authenticated user id
        $lecture = Lecture::create($data);

        // handle uploaded PDF
        $file = $request->file('file');

        // store PDF in storage/app/lectures
        $path = $file->store('lectures');
        $fullPath = realpath(storage_path('app/private/' . $path));

        if (!is_readable($fullPath)) {
            return response()->json(['error' => 'File is not readable: ' . $fullPath]);
        }

        // extract text from PDF
        $text = \Spatie\PdfToText\Pdf::getText(
            $fullPath,
            'C:\Program Files\poppler-25.12.0\Library\bin\pdftotext.exe'
        );

        return response()->json([
            'message' => 'Lecture uploaded successfully',
            'lecture' => $lecture,
            'extractedTextPreview' => $text, // preview only
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
