<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user_id = \App\Models\User::all()->pluck('id')->toArray();
        $admin_id = \App\Models\Admin::all()->pluck('id')->toArray();

        // $all_images = glob('storage/app/public/images/users/*.*');
        // $key = array_rand($all_images);

        $client_id = array();
        $index = 0;

        // Ensures that the client and admin wont have any common user id, so wach user is either an admin or a client
        foreach($user_id as $id) {
            if (!in_array($id, $admin_id)) {
                $client_id[$index] = $id;
                $index ++;
            }
        }            

        return [
            'avatar' => null,
            'phone' => $this->faker->e164PhoneNumber(),          
            'fcm_token' => Str::random(6),
            'user_id' => $this->faker->randomElement($client_id),
        ];
    }
}
