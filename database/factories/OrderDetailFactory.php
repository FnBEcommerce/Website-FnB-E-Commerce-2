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
        // Note: This factory assumes the associated product's price is set.
        // The subtotal is calculated based on a random quantity.
        $quantity = $this->faker->numberBetween(1, 3);

        // You would typically fetch a product and use its price,
        // but for a simple factory, we'll use a random value.
        $price = $this->faker->randomFloat(2, 10000, 50000);

        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'quantity' => $quantity,
            'subtotal' => $quantity * $price,
        ];
    }
}
