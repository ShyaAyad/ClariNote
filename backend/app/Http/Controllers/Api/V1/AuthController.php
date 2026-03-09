<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {

        // validate data
        $data = $request->validated();
        $data['password'] =  bcrypt($data['password']);

        // create user in database
        $user = User::create($data);

        $token = $user->createToken('register_token')->plainTextToken;

        // log user in after registration
        Auth::login($user);

        return response()->json([
            'message' => 'registered successfully',
            'status' => 'success',
            'data' => [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ]
        ], 201);
    }
    public function login(LoginRequest $request)
    {

        // validate data
        $data = $request->validated();

        // check user credentials
        if (!Auth::attempt($data)) {
            return response()->json([
                'message' => 'Invalid user credentials!'
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('login_token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully',
            'status' => 'success',
            'data' => [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ]
        ], 200);
    }
    public function logout(Request $request)
    {
        // get currently authenticated user and delete token to log them out
        $request->user()->currentAccessToken()->delete();
        // $user->tokens()->delete(); to delete all tokens (logging out in all devices)

        return response()->json([
            'message' => 'Logged out successfully!'
        ], 200);
    }

    // get current users information (frontend purpose)
    public function me()
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ], 200);
    }
}
