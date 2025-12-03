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
            'shop_name' => $this->faker->company(),
            'shop_address' => $this->faker->address(),
            'shop_phonenumber' => $this->faker->phoneNumber(),
            'date_created' => now(),
            'last_updated' => now(),
        ];
    }
}
