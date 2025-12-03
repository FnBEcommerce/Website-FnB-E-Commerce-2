<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ShopBranch;
use App\Models\Courier;
use App\Models\User;

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
            'shop_id' => ShopBranch::factory(),
            'courier_id' => Courier::factory(),
            'user_id' => User::factory(),
            'payment_method' => fake()->randomElement(['Cash', 'Transfer', 'E-Wallet']),
            'order_status' => fake()->randomElement(['Pending', 'Processing', 'Completed', 'Cancelled']),
            'order_total' => 0, // Nanti dihitung ulang berdasarkan detail
            'order_confirmed_time' => now(),
            'order_processed_time' => now(),
            'delivered_time_estimation' => fake()->dateTime(),
            'delivered_time' => fake()->optional()->dateTime(),
            'date_created' => now(),
            'last_updated' => now(),
        ];
    }
}
