<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderDetail>
 */
class OrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'orderdetail_quantity' => fake()->numberBetween(1, 4),
            'orderdetail_subtotal' => fake()->numberBetween(10000, 100000),
            'date_created' => now(),
            'last_updated' => now(),
        ];
    }
}
