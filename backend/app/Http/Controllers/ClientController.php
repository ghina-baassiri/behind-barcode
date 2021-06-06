<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Client;
use Illuminate\Support\Str;

class ClientController extends Controller
{
    protected $data = [];

    /**
    * Admin Register.
    *
    * @param  Request  $request
    * @return JSON Response
    *
    */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',           
            'display_name' => 'string|max:255',
            'phone' => 'required|string|min:8|max:17',
            'avatar' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',            
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'fcm_token' => 'string',
            'address' => 'required|string',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        $user = User::createUser($request->toArray() , config('permission_levels.client'));
        Client::createClient($request , $user->id);
        $token = $user->createToken('Laravel Password Grant User')->accessToken;
        $response = ['token' => $token];
        return response($response, 200);
    }

    public function clientDetails() {
        // Where to get the address details?
        $client = Client::with('user')->where('user_id',auth('users-api')->user()->id )->first();
        return response()->json($client ,  200);
    }
}