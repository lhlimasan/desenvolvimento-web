<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\TestStatus\Error;
use function PHPUnit\Framework\isNull;

class UserController extends Controller
{

    public function index(){
        return response()->json(User::all(),200);
    }

    public function show($id){

        $user = User::find($id)->first();
        if(is_null($user)){
            return response()->json(['message' => 'Usuario nao encontrado'],404);
        }
        return response()->json($user,200);
    }

    public function store(UserRequest $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json($user,201);
    }

    public function update(Request $request,$id){
        $user = User::find($id)->first();
        if(is_null($user)){
            return response()->json(['message' => 'Usuario nao encontrado'],404);
        }
        if($request->has('name')) $user->name = $request->name;
        if($request->has('email')) $user->email = $request->email;
        if($request->has('password')) $user->password = $request->password;

        $user->save();

        return response()->json($user,200);
    }

    public function destroy($id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['message' => 'Usuario nao encontrado'],404);
        }
        $user->delete();
        return response()->json('Usuario deletado com sucesso',200);
    }
}
