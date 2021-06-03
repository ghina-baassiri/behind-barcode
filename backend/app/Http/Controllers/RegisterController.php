<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use App\Models\Address;
use Symfony\Component\ErrorHandler\Exception\FlattenException;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users and admins as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
        $this->middleware('guest:admin');
        $this->middleware('guest:user');
    }

     /**
     * @param Request $request
     *
     * @return JSON Response 
     */
    public function adminRegister(Request $request)
    {   
        // Validate request
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        
        // Send Json error response message if failed validation
        if ($validator->fails()) {
            return response([
                'message' => $validator->messages()->toJson(),
            ],400);
        }

        // Create admin object and send a Json success response if successfully created
        try {
            $admin = Admin::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);

            $token = $admin->createToken('app')->accessToken;

            return response([
                'message' => 'success',
                'admin' => $admin,
                'token' => $token
            ], 200);

        } catch (\Exception $exception) {
            $flattenException = FlattenException::create($exception);
            return response([
                'message' => $exception->getMessage(),
            ], $flattenException->getStatusCode());
        } 
    }
    
         /**
     * @param Request $request
     *
     * @return JSON Response 
     */
    public function userRegister(Request $request)
    {   
        // Validate request
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'display_name' => 'string|max:255',
            'phone' => 'required|string|min:8|max:17',
            'profile_image' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'address' => 'required|string',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric'
        ]);
        
        // Send Json error response message if failed validation
        if ($validator->fails()) {
            return response([
                'message' => $validator->messages()->toJson(),
            ],400);
        }

        // Create admin object and send a Json success response if successfully created
        try {
            $address = Address::create([
                'address' => $request->input('address'),
                'longitude' => $request->input('longitude'),
                'latitude' => $request->input('latitude'),
            ]);

            $user = User::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'display_name' => $request->input('display_name'),
                'phone' => $request->input('phone'),
                'profile_image' => $request->input('profile_image'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'address_id' => $address->id,
                'fcm_token' => 'Rb15PL'
            ]);

            $token = $user->createToken('app')->accessToken;

            return response([
                'message' => 'success',
                'user' => $user,
                'token' => $token
            ], 200);

        } catch (\Exception $exception) {
            $flattenException = FlattenException::create($exception);
            return response([
                'message' => $exception->getMessage(),
            ], $flattenException->getStatusCode());
        } 
    }
}