<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\MarketProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarketProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MarketProduct::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $random_market_ids = random_int(1,5);
        $market_id = $random_market_ids;
        $product_barcode = Product::all()->pluck('barcode')->toArray();

        return [
            'market_id' => $market_id,
            'product_barcode' => $this->faker->randomElement($product_barcode),
        ];
    }
}
