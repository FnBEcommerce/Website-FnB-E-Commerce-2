<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // user_id diisi nanti saat seeding
            'payment_method' => fake()->randomElement(['Cash', 'Transfer', 'E-Wallet']),
            'order_status' => fake()->randomElement(['Pending', 'Processing', 'Completed', 'Cancelled']),
            'order_total' => 0, // Nanti dihitung ulang berdasarkan detail
            'delivered_time' => fake()->optional()->dateTime(),
            'date_created' => now(),
            'last_updated' => now(),
        ];
    }
}
