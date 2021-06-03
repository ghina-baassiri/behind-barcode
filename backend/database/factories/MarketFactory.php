<?php

namespace Database\Factories;

use App\Models\Market;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Market::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $random_address_ids = random_int(1,20);
        $random_admin_ids = random_int(1,10);
        $address_id = $random_address_ids;
        $admin_id = $random_admin_ids;

        return [
            'name' => $this->faker->city(),
            'delivery' => $this->faker->boolean($chanceOfGettingTrue = 50),
            'logo' => $this->faker->image('public/storage/images/markets',300,300, null, false),
            'phone' => $this->faker->e164PhoneNumber(),          
            'address_id' => $address_id,
            'market_admin_id' =>  $admin_id
        ];
    }
}
