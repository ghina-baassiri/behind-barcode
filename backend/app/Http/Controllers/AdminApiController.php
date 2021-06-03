<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class AdminApiController extends Controller {

    public function dashboard() {
        return 'Admin dashboard';
    }

    public function getProducts() {
        $respone = [ 
            'all' => [],
        ];

        $products = Product::get();
        foreach ($products as $key => $product) {
            //getting owner name through join query
            $owner = Unicorn::join('users', 'unicorns.user_id', '=', 'users.id')->select('users.id', 'users.first_name', 'users.last_name')->where('users.id', $unicorn->user_id)->get()->first();
            $response['all'][$key] = [
                'id' => $unicorn->id,
                'name' => $unicorn->name,
                'owner' => $owner
            
            ];

            foreach(Product::all() as $product) {
                $markets = Market::inRandomOrder()->take(rand(1,3))->pluck('id');
                $product->markets()->attach($markets);
            }
        }
        
        return response()->json($res);
    }
}