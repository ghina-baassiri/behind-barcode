<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Admin;
use App\Models\Client;


/**
* User Register.
*
* @param  Request  $request
* @return JSON Response
*
*/
class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response(['message' => $validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $response['token'] = $token;

                if ($user->permission_level == 1) {
                    $client = Client::where('user_id', $user->id)->first();
                    $response['client'] = $client;
                    $response['client']['user'] = $user;

                } else {
                    $admin = Admin::where('user_id', $user->id)->first();
                    $response['admin'] = $client;
                    $response['admin']['user'] = $user;
                }                
                return response($response, 200);
            } else {
                $response = ["message" => "Password mismatch"];
                return response($response, 401);
            }
        } else {
            $response = ["message" => 'User does not exist'];
            return response($response, 401);
        }
    }

    /**
    * User Logout.
    *
    * @param  Request  $request
    * @return JSON Response
    *
    */
    public function logout(Request $request){  
        Auth::logout();
        //$request->user()->token()->revoke();
        return response()->json(['success' =>'logout_success'],200);
    }
    
}