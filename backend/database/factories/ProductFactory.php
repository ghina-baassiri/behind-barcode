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
        $random_category_ids = random_int(1,13);
        $random_product_size = random_int(1,1000);
        $unit_id = $random_unit_ids;
        $category_id = $random_category_ids;

        $all_images = glob('storage/app/public/images/products/*.*');
        $key = array_rand($all_images);

        return [
            'barcode' => $this->faker->isbn13(),
            'brand' => 'The Brand',
            'size' => $random_product_size,
            'image' => $all_images[$key],
            'unit_id' => $unit_id,
            'category_id' => $category_id 
        ];
    }
}
