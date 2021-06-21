<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Client;
use App\Models\Address;
use App\Models\Rating;
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
            'name' => 'required|string|max:255',
            'phone' => 'required|string|min:8|max:17',
            // 'avatar' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',            
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'fcm_token' => 'string'
        ]);

        if ($validator->fails()) {
            return response(['message'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        $user = User::createUser($request->toArray() , config('permission_levels.client'));
        Client::createClient($request , $user->id);
        $token = $user->createToken('Laravel Password Grant User')->accessToken;
        $response = ['token' => $token];
        return response($response, 200);
    }

    /**
    * Get client details.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function clientDetails() {

        $client = Client::with('user')->where('user_id',auth('users-api')->user()->id )->first();
        // error_log($admin['user']->address_id);
        return response()->json($client, 200);
    }

    /**
    * Rate market.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function addRating(Request $request) {
        $rating = new Rating();
        $rating->client_id = $request['client_id'];
        $rating->market_id = $request['market_id'];
        $rating->stars = $request['stars'];
        $rating->save();
        return response($rating, 200);
    }

    /**
    * Get market average rating.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function marketRating($marketId) {

        $ratings = Rating::with('market')->where('market_id' , $marketId )->get();
        $numOfRatings = count($ratings);
        $avgRatings = null;
        if ($numOfRatings > 1) {
            $sumRatings = 0;
            foreach ($ratings as $rating) {
                $sumRatings += $rating->stars;
            }
            $avgRatings = $sumRatings/$numOfRatings;
        } else if ($numOfRatings == 1) {
            $avgRatings = $ratings[0]->stars;
        }
        $rating = floor($avgRatings);        
        return response()->json([ 'rating' => $rating ], 200);
    }
}