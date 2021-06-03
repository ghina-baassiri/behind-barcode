<?php

namespace Database\Factories;

use App\Models\Rating;
use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Rating::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    { 
        $stars = random_int(1,5);
        $random_market_ids = random_int(1,5);
        $random_user_ids = random_int(1,20);
        $market_id = $random_market_ids;
        $user_id = $random_user_ids;

        return [
            'stars' => $stars,
            'market_id' => $market_id,
            'user_id' => $user_id
        ];
    }
}
