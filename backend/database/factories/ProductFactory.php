<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */        
    public function definition()
    {
        $random_unit_ids = random_int(1,5);
        $random_category_ids = random_int(1,15);
        $random_product_size = random_int(1,1000);
        $unit_id = $random_unit_ids;
        $category_id = $random_category_ids;

        return [
            'barcode' => $this->faker->isbn13(),
            'brand' => $this->faker->streetName(),
            'size' => $random_product_size,
            'image' => $this->faker->image('public/storage/images/products',300,300, null, false),
            'unit_id' => $unit_id,
            'category_id' => $category_id 
        ];
    }
}
