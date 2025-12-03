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
            "Nasi Goreng Spesial",
            "Ayam Bakar Madu",
            "Ayam Geprek Sambal Matah",
            "Sate Ayam",
            "Sate Kambing",
            "Bakso Urat",
            "Mie Ayam Pangsit",
            "Soto Ayam Lamongan",
            "Rawon Daging",
            "Rendang Sapi",
            "Gulai Ayam",
            "Ikan Bakar Jimbaran",
            "Cumi Saus Padang",
            "Udang Goreng Tepung",
            "Pepes Ikan",
            "Tahu Crispy",
            "Tempe Mendoan",
            "French Fries",
            "Beef Burger",
            "Chicken Burger",
            "Spaghetti Bolognese",
            "Spaghetti Carbonara",
            "Chicken Katsu",
            "Beef Teriyaki",
            "Rice Bowl Chicken Teriyaki",
            "Rice Bowl Beef Blackpepper",
            "Nasi Ayam Hainan",
            "Dimsum Chicken",
            "Dimsum Shrimp",
            "Pizza Pepperoni",
            "Pizza Margherita",
            "Salad Buah",
            "Salad Sayur",
            "Roti Bakar Coklat",
            "Martabak Manis",
            "Martabak Telur",
            "Es Teh Manis",
            "Es Jeruk",
            "Lemon Tea",
            "Milkshake Coklat",
            "Milkshake Strawberry",
            "Thai Tea",
            "Green Tea Latte",
            "Cappuccino",
            "Americano",
            "Es Kopi Susu Gula Aren"
        ];
        $product_categories = [
            "Makanan Berat",
            "Makanan Ringan",
            "Minuman",
            "Dessert",
            "Snack",
            "Fast Food",
            "Rice Bowl",
            "Noodles",
            "Seafood",
            "Ayam & Daging",
            "Sayuran",
            "Sate & Grill",
            "Soup",
            "Bakery",
            "Coffee",
            "Tea",
            "Juice",
            "Milkshake",
            "Traditional Food",
            "Western Food",
            "Asian Food"
        ];

        $price = fake()->randomFloat(2, 10000, 50000);

        return [
        'product_name' => fake()->randomElement($product_names),
        'product_category' => fake()->randomElement($product_categories),
        'product_price' => $price,
        'product_discount_price' => $price * 0.9,
        'product_description' => fake()->paragraphs(3, true),
        'product_stock' => fake()->numberBetween(10, 100),
        'date_created' => now(),
        'last_updated' => now(),
    ];
    }
}
