<?php

namespace Database\Factories;

use App\Models\Courier;
use App\Models\ShopBranch;
use App\Models\User;
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
        $subtotal = $this->faker->randomFloat(2, 15000, 200000);
        $delivery_fee = $this->faker->randomFloat(2, 5000, 25000);

        return [
            'user_id' => User::factory(),
            'shop_branch_id' => ShopBranch::factory(),
            'courier_id' => Courier::factory(),
            'payment_method' => $this->faker->randomElement(['Cash', 'Transfer', 'E-Wallet']),
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'subtotal' => $subtotal,
            'delivery_fee' => $delivery_fee,
            'total' => $subtotal + $delivery_fee,
            'confirmed_at' => now(),
            'processed_at' => now()->addMinutes(10),
            'estimated_delivery_at' => now()->addMinutes(45),
            'delivered_at' => null,
        ];
    }
}
