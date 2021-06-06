<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Price::factory(30)->create(50);
    }
}
