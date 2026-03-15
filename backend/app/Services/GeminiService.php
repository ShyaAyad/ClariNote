<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    public function summarize($text)
    {
        $response = Http::post(
            'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' . config('services.gemini.key'),
            [
                "contents" => [
                    [
                        "parts" => [
                            [
                                "text" => "You are an expert academic assistant that helps university students understand lecture materials.

                                            Your task is to summarize the following lecture text in a clear and structured way.

                                            Instructions:
                                            - Identify the most important concepts and explanations.
                                            - Remove unnecessary details, repetitions, or filler text.
                                            - Keep important definitions and key ideas.
                                            - Use simple and clear language suitable for students reviewing for exams.

                                            Output format:

                                            1. Lecture Overview  
                                            A short paragraph explaining what the lecture is about.

                                            2. Key Concepts  
                                            List the most important concepts explained in the lecture.

                                            3. Important Definitions  
                                            Provide clear definitions if the lecture introduces them.

                                            4. Key Points  
                                            Write concise bullet points summarizing the most important ideas.

                                            5. Quick Revision Summary  
                                            Write a very short summary (3–5 sentences) that students can quickly review before exams.

                                            Format the summarized PDF lecture text into clean, readable HTML.
                                            Use <h3> for main section titles.
                                            Use <h4> for sub-section titles.
                                            Use <p> for paragraphs.
                                            Use <ul> and <li> for bullet points and lists.
                                            Do NOT include <html>, <head>, <body>, or the used HTML tags.
                                            Return ONLY the HTML with no explanation, no markdown, no code fences.


                                            Lecture Text:" . $text
                            ]
                        ]
                    ]
                ]
            ]
        );

        return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'Sorry, I could not summarize the lecture at this time.';
    }

    public function format($text)
    {
        $response = Http::post(
            'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' . config('services.gemini.key'),
            [
                "contents" => [
                    [
                        "parts" => [
                            [
                                "text" => "Format the following extracted PDF lecture text into clean, readable HTML.
                                        Use <h3> for main section titles.
                                        Use <h4> for sub-section titles.
                                        Use <p> for paragraphs.
                                        Use <ul> and <li> for bullet points and lists.
                                        Do NOT include <html>, <head>, <body>, or the used HTML tags.
                                        Return ONLY the HTML with no explanation, no markdown, no code fences.

                                        Text:
                                        " . $text
                            ]
                        ]
                    ]
                ]
            ]
        );

        return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? $text;
    }
}
