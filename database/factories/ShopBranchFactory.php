<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShopBranch>
 */
class ShopBranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shop_name' => fake()->company() . ' Branch',
            'shop_address' => fake()->address(),
            'shop_phonenumber' => fake()->phoneNumber(),
            'date_created' => now(),
            'last_updated' => now(),
        ];
    }
}
