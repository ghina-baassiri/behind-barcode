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
        $admin_id = \App\Models\Admin::all()->pluck('id')->toArray();
        $address_id = \App\Models\Address::all()->pluck('id')->toArray();

        $all_images = glob('storage/app/public/images/markets/*.*');
        $key = array_rand($all_images);
        
        return [
            'name' => 'The Market',
            'delivery' => $this->faker->boolean($chanceOfGettingTrue = 50),
            'logo' => $all_images[$key],
            'phone' => $this->faker->e164PhoneNumber(),          
            'address_id' => $this->faker->randomElement($address_id),
            'admin_id' =>  $this->faker->randomElement($admin_id),
        ];
    }
}
