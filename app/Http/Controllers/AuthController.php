<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=> 'required|email|unique:users',
            'password'=> 'required|string|min:8|confirmed',
        ]);
        if($validator-> fails()){
            return response()->json([
               'messages'=> $validator->errors()
            ], 422);
        }
        $user = User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=> bcrypt($request->password),
        ]);
        return response()->json([
            'user'=> $user,
           'message'=> 'User registered successfully'
        ], 201);
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=> 'required|email',
            'password'=> 'required|string|min:8',
        ]);
        if($validator-> fails()){
            return response()->json([
                'messages'=> $validator->errors(),
            ], 422);
        }
        $credentials = $request->only('email', 'password');
        if(!$token = auth('api')->attempt( $credentials)){
            return response()->json([
                'message'=> 'Unauthorized',
            ], 401);
        }
        
        return response()->json([
            'message'=> 'Login successful',
            'token'=> $this->respondWithToken($token),
        ]);

    }
    public function logout(){
        auth('api')->logout();
        return response()->json([
           'message'=> 'User logged out successfully',
        ]);
    }
    public function refresh(){
        return $this ->respondWithToken(JWTAuth::refresh());
    }
    public function profile() {
        return response()->json(auth('api')->user());
    }
    protected function respondWithToken($token){
        return response()->json([
            'access_token'=> $token,
            'token_type'=> 'bearer',
            'expires_in'=> JWTAuth::factory()->getTTL() * 60,
            'role'=> auth('api')->user()->role,
        ]);
    }
}
