<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Market;
use App\Models\Product;
use App\Models\Address;
use App\Models\Unit;
use App\Models\Category;
use App\Models\Price;
use App\Models\Rating;
use Illuminate\Support\Str;

class CommonAPIsController extends Controller
{
    protected $data = [];

    /**
    * Get all markets details.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function allMarkets() {

        $markets = Market::get();

        foreach ($markets as $market) {
            $market['address'] = Address::where('id' , $market->address_id )->first();
            $ratings = Rating::with('market')->where('market_id' , $market->id )->get();
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
            $market['rating'] = floor($avgRatings);
        }       
        return response([ 'markets' => $markets ],200);
    }

    /**
    * Get all product details.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function allProducts() {

        $products = Product::get();

        foreach ($products as $product) {
            $product['unit'] = Unit::where('id' , $product->unit_id )->pluck('name')->all();
            $product['category'] = Category::where('id' , $product->category_id )->pluck('name')->all();
        }       
        return response()->json($products, 200);
    }

    /**
    * Get all market products details.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function marketProducts($id) {

        $products = Price::with('market')->where('market_id', $id)->get();
        $market = Market::where('id', $id)->first();

        $counter = 0;

        foreach($products as $product) {
            $product['product'] = Product::where('barcode' , $product->product_barcode )->first();
            $product['product']['unit'] = Unit::where('id' , $product['product']->unit_id )->pluck('name')->all();
            $product['product']['category'] = Category::where('id' , $product['product']->category_id )->pluck('name')->all();

            $productsDetails[$counter] =  [
                'barcode' => $product['product']['barcode'],
                'brand' => $product['product']['brand'],
                'size' => $product['product']['size'],
                'image' => $product['product']['image'],
                'unit' => $product['product']['unit'],
                'category' => $product['product']['category'],
                'price' => $product['price']
            ];

            $counter++;
        }
        $marketProductsDetails['market'] = $market;
        $marketProductsDetails['products'] = $productsDetails;

        return response()->json($marketProductsDetails, 200);
    }

    /**
    * Get all market products details.
    *
    * @param  
    * @return JSON Response
    *
    */
    public function productMarkets($barcode) {

        $markets = Price::with('product')->where('product_barcode', $barcode)->get();
        $product = Product::where('barcode', $barcode)->first();

        $counter = 0;

        foreach($markets as $market) {
            $market['market'] = Market::where('id' , $market->market_id )->first();
            $market['market']['address'] = Address::where('id' , $market['market']->address_id )->first();

            $ratings = Rating::with('market')->where('market_id' , $market->id )->get();
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

            $marketsDetails[$counter] =  [
                'id' => $market['market']['id'],
                'name' => $market['market']['name'],
                'delivery' => $market['market']['delivery'],
                'logo' => $market['market']['logo'],
                'phone' => $market['market']['phone'],
                'address' => $market['market']['address'],
                'price' => $market['price'],
                'rating' => floor($avgRatings)
            ];

            $counter++;
        }   
        $productMarketsDetails['product'] = $product;
        $productMarketsDetails['markets'] = $marketsDetails;

        return response()->json($productMarketsDetails, 200);
    }

    
}