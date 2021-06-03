<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $categories = array('Beverages', 'Bread', 'Canned/Jarred', 'Dairy', 'Dry Food', 'Frozen Food', 'Meat', 'Produce', 'Cleaners', 'Paper Goods', 'Personal Care', 'Baby Items', 'Pet Items' );
        
        return [
            'name' => $this->faker->randomElement($categories)
        ];
    }
}
