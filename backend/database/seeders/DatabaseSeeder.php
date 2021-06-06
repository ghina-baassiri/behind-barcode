<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Address::factory(20)->create();     // php artisan db:seed --class=AddressSeeder
        \App\Models\User::factory(15)->create();        // php artisan db:seed --class=UserSeeder
        \App\Models\Admin::factory(4)->create();        // php artisan db:seed --class=AdminSeeder
        \App\Models\Client::factory(16)->create();      // php artisan db:seed --class=ClientSeeder
        \App\Models\Unit::factory(5)->create();         // php artisan db:seed --class=UnitSeeder
        \App\Models\Category::factory(13)->create();    // php artisan db:seed --class=CategorySeeder
        \App\Models\Market::factory(20)->create();      // php artisan db:seed --class=MarketSeeder
        \App\Models\Product::factory(30)->create();     // php artisan db:seed --class=ProductSeeder
        // \App\Models\Rating::factory(10)->create();      // php artisan db:seed --class=RatingSeeder
        // \App\Models\Price::factory(30)->create(50);     // php artisan db:seed --class=PriceSeeder
    }
}
