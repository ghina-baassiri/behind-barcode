<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $random_address_ids = random_int(1,20);
        $address_id = $random_address_ids;

        return [
            'first_name' => $this->faker->firstName($gender = 'male'|'female'),
            'last_name' => $this->faker->lastName(),
            'display_name' => $this->faker->name(),
            'phone' => $this->faker->e164PhoneNumber(),          
            'address_id' => $address_id,
            'fcm_token' => Str::random(6),
            'profile_image' => $this->faker->image('public/storage/images/users',300,300, null, false),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
