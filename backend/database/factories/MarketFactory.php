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

        // $all_images = glob('storage/app/public/images/markets/*.*');
        // $key = array_rand($all_images);

        $all_images = array(
            'https://spinneys-egypt.com/vendor/spinneys/assets/images/big_logo.png',
            'https://www.carrefour.fr/images/meta-social-default-image-generic.png',
            'https://www.yelleb.com/img/lb/e/1614364949-39-amleya-al-supermarket.png'
        );

        
        return [
            'name' => 'The Market',
            'delivery' => $this->faker->boolean($chanceOfGettingTrue = 50),
            'logo' => $this->faker->randomElement($all_images),
            'phone' => $this->faker->e164PhoneNumber(),          
            'address_id' => $this->faker->randomElement($address_id),
            'admin_id' =>  $this->faker->randomElement($admin_id),
        ];
    }
}
