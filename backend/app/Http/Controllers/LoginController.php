<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Symfony\Component\ErrorHandler\Exception\FlattenException;
use App\Models\User;
use App\Models\Admin;

class LoginController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users and admins for the application sending
    | Json response to be handled at the frontend. The controller uses a trait
    | to conveniently provide its functionality to both applications.
    |
    */

    use AuthenticatesUsers;

     /**
     * Admin Login API.
     *
     * @param  Request  $request
     * @return JSON Response
     */
    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => $validator->messages()->toJson(),
            ],400);
        }

        try{
            if (Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password])) {

                $admin = Auth::admin();
                $token = $user->createToken('app')->accessToken;
                return response([
                    'message' => 'success',
                    'token' => $token,
                    'admin' => $admin
                ],200);
            }
            else { 
                return response()->json(['error' => ['Email and Password are Wrong.']], 200);
            }
        } catch (\Exception $exception) {
            $flattenException = FlattenException::create($exception);
            return response([
                'message' => $exception->getMessage(),
            ],  $flattenException->getStatusCode());
        }         
    }

    /**
     * User Login API.
     *
     * @param  Request  $request
     * @return JSON Response
     */
    public function userLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => $validator->messages()->toJson(),
            ],400);
        }

        try{
            if (Auth::guard('user')->attempt(['email' => $request->email, 'password' => $request->password])) {

                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => 'success',
                    'token' => $token,
                    'user' => $user
                ],200);
            }           
            else { 
                return response()->json(['error' => ['Email and Password are Wrong.']], 200);
            }
        }
        catch (\Exception $exception) {
            $flattenException = FlattenException::create($exception);
            return response([
                'message' => $exception->getMessage(),
            ],  $flattenException->getStatusCode());
        } 
    }

    /**
     * Admin Logout API.
     *
     * @param  Request  $request
     * @return JSON Response
     */
    public function adminLogout(Request $request)
    {
        $request->admin()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ],200);
    }

    /**
     * User Logout API.
     *
     * @param  Request  $request
     * @return JSON Response
     */
    public function userLogout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ],200);
    }
}