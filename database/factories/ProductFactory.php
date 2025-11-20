<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'product_name' => fake()->words(3, true),
        'product_category' => fake()->randomElement(['Electronics', 'Clothing', 'Food', 'Furniture']),
        'product_price' => fake()->randomFloat(2, 10000, 500000),
        'product_description' => fake()->sentence(),
        'product_stock' => fake()->numberBetween(10, 100),
        'date_created' => now(),
        'last_updated' => now(),
    ];
    }
}
