<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Market;
use App\Models\MarketProduct;

class MarketProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MarketProduct::factory(35)->create();

        foreach(Product::all() as $product) {
            $markets = Market::inRandomOrder()->take(rand(1,3))->pluck('id');
            $product->markets()->attach($markets);
        }

        foreach(Market::all() as $market) {
            $products = Product::inRandomOrder()->take(rand(1,3))->pluck('barcode');
            $market->products()->attach($products);
        }
    }
}
