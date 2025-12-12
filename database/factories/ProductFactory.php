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
        $product_names = [
            "Nasi Goreng Spesial", "Ayam Bakar Madu", "Ayam Geprek Sambal Matah", "Sate Ayam", "Sate Kambing",
            "Bakso Urat", "Mie Ayam Pangsit", "Soto Ayam Lamongan", "Rawon Daging", "Rendang Sapi", "Gulai Ayam",
            "Ikan Bakar Jimbaran", "Cumi Saus Padang", "Udang Goreng Tepung", "Pepes Ikan", "Tahu Crispy",
            "Tempe Mendoan", "French Fries", "Beef Burger", "Chicken Burger", "Spaghetti Bolognese",
            "Spaghetti Carbonara", "Chicken Katsu", "Beef Teriyaki", "Rice Bowl Chicken Teriyaki",
            "Rice Bowl Beef Blackpepper", "Nasi Ayam Hainan", "Dimsum Chicken", "Dimsum Shrimp", "Pizza Pepperoni",
            "Pizza Margherita", "Salad Buah", "Salad Sayur", "Roti Bakar Coklat", "Martabak Manis", "Martabak Telur",
            "Es Teh Manis", "Es Jeruk", "Lemon Tea", "Milkshake Coklat", "Milkshake Strawberry", "Thai Tea",
            "Green Tea Latte", "Cappuccino", "Americano", "Es Kopi Susu Gula Aren"
        ];
        $product_categories = [
            "Makanan Berat", "Makanan Ringan", "Minuman", "Dessert", "Snack", "Fast Food", "Rice Bowl", "Noodles",
            "Seafood", "Ayam & Daging", "Sayuran", "Sate & Grill", "Soup", "Bakery", "Coffee", "Tea", "Juice",
            "Milkshake", "Traditional Food", "Western Food", "Asian Food"
        ];
        $food_types = ['Spicy', 'Sweet', 'Sour', 'Salty', 'Vegetarian'];
        $badges = ['New', 'Best Seller', 'Recommended'];

        $price = $this->faker->randomFloat(2, 10000, 100000);

        return [
            'name' => $this->faker->randomElement($product_names),
            'description' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->randomElement($product_categories),
            'price_origin' => $price,
            'price_discount' => $price * $this->faker->randomFloat(2, 0.7, 0.9),
            'quantity' => $this->faker->numberBetween(0, 100),
            'image' => 'https://via.placeholder.com/640x480.png/004422?text=' . urlencode($this->faker->word),
            'popular' => $this->faker->boolean(30), // 30% chance of being popular
            'rating' => $this->faker->randomFloat(1, 3, 5),
            'preparation_time' => $this->faker->numberBetween(5, 45) . ' mins',
            'badge' => $this->faker->optional(0.4)->randomElement($badges), // 40% chance of having a badge
            'food_type' => $this->faker->randomElements($food_types, $this->faker->numberBetween(1, 3)),
        ];
    }
}
