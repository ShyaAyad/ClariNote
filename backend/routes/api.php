<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\LectureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function(){

    Route::group(['middleware' => 'auth:sanctum'], function(){
            Route::get('/lectures', [LectureController::class, 'index']);
            Route::post('/upload', [LectureController::class, 'store']);
            Route::get('/lectureText', [LectureController::class, 'getLectureText']);
            Route::get('/lecture/{id}', [LectureController::class, 'show']);
            Route::delete('/lecture/{id}', [LectureController::class, 'destroy']);
    });
    // Route::middleware('auth:sanctum' )->post('/upload', [LectureController::class, 'store']);// only authenticated users can upload lectures
    // Route::get('/lectures', [LectureController::class, 'index']);
    // Route::get('/lectureText', [LectureController::class, 'getLectureText']);
    // Route::get('/lecture/{id}', [LectureController::class, 'show']);
    // Route::middleware('auth:sanctum')->delete('/delete/{id}', [LectureController::class, 'destroy']);

    Route::controller(AuthController::class)->group(function(){
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::get('me', 'me')->middleware('auth:sanctum');
        Route::middleware(['auth:sanctum'])->post('logout', 'logout'); // middleware to tell laravel which user is trying to logout
    });
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
