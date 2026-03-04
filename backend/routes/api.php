<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\LectureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function(){

    Route::middleware('auth:sanctum' )->post('/upload', [LectureController::class, 'store']);// only authenticated users can upload lectures
    Route::get('/lectures', [LectureController::class, 'index']);

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
