<?php

namespace Database\Factories;

use App\Models\Price;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Price::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $market_id = \App\Models\Market::all()->pluck('id')->toArray();
        $product_barcode = \App\Models\Product::all()->pluck('barcode')->toArray();
         
        return [
            'price' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 5000, $max = 900000),
            'market_id' =>  $this->faker->randomElement($market_id),
            'product_barcode' => $this->faker->randomElement($product_barcode),
        ];
    }
}
