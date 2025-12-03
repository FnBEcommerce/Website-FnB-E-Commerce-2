<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Courier>
 */
class CourierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'courier_name' => $this->faker->name(),
            'courier_license_plate' => strtoupper($this->faker->bothify('B #### ???')),
            'courier_phone_number' => $this->faker->phoneNumber(),
            'date_created' => now(),
            'last_updated' => now(),
        ];
    }
}
