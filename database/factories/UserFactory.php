<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => $this->faker->userName(),
            'password' => bcrypt('password'), // default password
            'address_1' => $this->faker->address(),
            'address_2' => $this->faker->address(),
            'role' => $this->faker->randomElement(['admin', 'customer']),
            'date_created' => now(),
            'last_updated' => now(),
        ];
    }
}
