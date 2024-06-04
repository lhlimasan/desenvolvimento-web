<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message' => 'Credenciais incorretas'],401);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->json($token,200, [], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout realizado'],200);
    }
}
