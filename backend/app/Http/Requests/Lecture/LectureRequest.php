<?php

namespace App\Http\Requests\Lecture;

use Illuminate\Foundation\Http\FormRequest;

class LectureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'original_name' => 'nullable|required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,ppt,pptx|max:204800', // max file size of 200MB, accepted file formates are pdf, doc, docx, ppt, pptx
        ];
    }
}
