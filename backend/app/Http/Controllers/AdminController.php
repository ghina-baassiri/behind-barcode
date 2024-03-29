<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Admin;
use App\Models\Address;
use App\Models\Price;
use Illuminate\Support\Str;

class AdminController extends Controller
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        $user = User::createUser($request->toArray() , config('permission_levels.admin'));
        Admin::createAdmin($request , $user->id);
        $token = $user->createToken('Laravel Password Grant Admin')->accessToken;
        $response = ['token' => $token];
        return response($response, 200);
    }

    /**
    * Get admin details.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function adminDetails() {

        $admin = Admin::with('user')->where('user_id',auth('users-api')->user()->id )->first();
        // error_log($admin['user']->address_id);
        return response()->json($admin, 200);
    }

    /**
    * Admin change price.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function changePrice(Request $request, $price_id) {

        // error_log($admin['user']->address_id);
        return $request;
        $price = Price::find($price_id);        
        $price->update($request->all());
        $price->save();
        return response()->json($price, 200);
    }
}