<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index() {
        $products = [
            [
                'id' => '1',
                'name' => 'Pav Bhaji',
                'description' => 'Pav bhaji is made with vegetables like potatoes, onions, tomatoes, peas, cauliflower, and capsicum, cooked with pav bhaji masala, turmeric, red chilli powder, cumin seeds, and sometimes garam masala, along with butter, oil, ginger-garlic paste, salt, and lemon juice, served with butter-toasted pav, chopped onions, coriander leaves, and lemon wedges.',
                'priceDiscount' => 18.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=250&fit=crop',
                'category' => 'Indian',
                'popular' => true,
                'rating' => 4.4,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '15-20 min',
            ],
            [
                'id' => '2',
                'name' => 'Kung Pao Chicken',
                'description' => 'Spicy stir-fried chicken with peanuts and vegetables',
                'priceDiscount' => 16.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=250&fit=crop',
                'category' => 'Chinese',
                'popular' => true,
                'rating' => 4.6,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '12-18 min',
            ],
            [
                'id' => '3',
                'name' => 'Classic Cheeseburger',
                'description' => 'Beef patty with cheese, lettuce, tomato, and special sauce',
                'priceDiscount' => 14.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
                'category' => 'Burgers',
                'popular' => false,
                'rating' => 4.5,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '10-15 min',
            ],
            [
                'id' => '4',
                'name' => 'Salmon Sashimi',
                'description' => 'Fresh salmon sliced thin and served raw',
                'priceDiscount' => 24.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop',
                'category' => 'Sushi',
                'popular' => true,
                'rating' => 4.9,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '5-10 min',
            ],
            [
                'id' => '5',
                'name' => 'Chicken Tacos',
                'description' => 'Three soft tacos with grilled chicken, salsa, and cilantro',
                'priceDiscount' => 13.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
                'category' => 'Tacos',
                'popular' => false,
                'rating' => 4.4,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '8-12 min',
            ],
            [
                'id' => '6',
                'name' => 'Caesar Salad',
                'description' => 'Crisp romaine lettuce with parmesan cheese and croutons',
                'priceDiscount' => 12.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
                'category' => 'Salads',
                'popular' => false,
                'rating' => 4.7,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '5-8 min',
            ],
            [
                'id' => '7',
                'name' => 'Chocolate Cake',
                'description' => 'Rich chocolate cake with chocolate frosting',
                'priceDiscount' => 8.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=250&fit=crop',
                'category' => 'Desserts',
                'popular' => true,
                'rating' => 4.6,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '3-5 min',
            ],
            [
                'id' => '8',
                'name' => 'Cappuccino',
                'description' => 'Rich espresso with steamed milk and foam',
                'priceDiscount' => 5.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400&h=250&fit=crop',
                'category' => 'Coffee',
                'popular' => false,
                'rating' => 4.3,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '2-4 min',
            ],
        ];

        $props = [
            'products' => $products
        ];
        return Inertia::render('homepage/home', $props);
    }

    public function productDetail() {
        $user = [
            'fullName' => 'Budi Santoso',
            'email' => 'budi.santoso@example.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
            'fullNumber' => '+6281234567890',
            'birthDate' => '1990-05-15',
            'gender' => 'Male',
            'addressInfo' => [
                'street' => 'Jl. Sudirman No. 45, Kebayoran Baru',
                'city' => 'Jakarta Selatan',
                'state' => 'DKI Jakarta',
            ],
            'altAddressInfo' => [
                'street' => 'Jl. Dago Pakar Utara No. 12',
                'city' => 'Bandung',
                'state' => 'Jawa Barat',
            ],
        ];

        // Product Images (Indexed Array)
        $productImages = [
            'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1624935984039-395c058e3944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjA0MTY3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1756361947369-8c0e1e8d6828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwZm9vZCUyMHBhY2thZ2V8ZW58MXx8fHwxNzYwNTEzNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ];

        $product = [
            'id'=> '10',
            'name'=> 'Supreme Truffle Burger',
            'quantity'=> 10,
            'description'=> 'Burger sapi premium dengan saus truffle jamur, keju swiss, dan bawang karamel.',
            'foodType'=> ['Daging', 'Gurih', 'Chef Recommended'],
            'priceDiscount'=> 85000,
            'priceOrigin'=> 110000,
            'image'=> 'https://images.unsplash.com/photo-1563115652-66e692719e1f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'category'=> 'Main Course',
            'popular'=> true,
            'rating'=> 4,
            'preparationTime'=> '20-25 mins',
            'reviews' => [
                [
                    'user' => [
                        'fullName' => 'Budi Santoso',
                        'email' => 'budi.santoso@example.com',
                        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
                        'fullNumber' => '+6281234567890',
                        'birthDate' => '1990-05-15',
                        'gender' => 'Male',
                        'addressInfo' => [
                            'street' => 'Jl. Sudirman No. 45, Kebayoran Baru',
                            'city' => 'Jakarta Selatan',
                            'state' => 'DKI Jakarta',
                        ],
                    ],
                    'totalRating' => 5,
                    'type' => 'Delivery Order', // Konteks: Tipe layanan
                    'description' => 'Sangat puas! Truffle Burger-nya sampai dalam keadaan masih hangat. Rotinya lembut dan dagingnya juicy banget. Packaging aman tidak tumpah.',
                ],
                [
                    'user' => [
                        'fullName' => 'Siti Aminah',
                        'email' => 'siti.aminah@testmail.com',
                        'password' => 'secret12345',
                        'fullNumber' => '+6281987654321',
                        'birthDate' => '1995-11-20',
                        'gender' => 'Female',
                        'addressInfo' => [
                            'street' => 'Jl. Dago Pakar Utara No. 10',
                            'city' => 'Bandung',
                            'state' => 'Jawa Barat',
                        ],
                    ],
                    'totalRating' => 4,
                    'type' => 'Dine-in',
                    'description' => 'Tempatnya cozy banget buat nugas. Iced Matcha Latte enak, creamy tapi ga bikin eneg. Cuma sayang pelayanan agak sedikit lama pas jam makan siang.',
                ],
                [
                    'user' => [
                        'fullName' => 'Rian Hidayat',
                        'email' => 'rian.h@workmail.com',
                        'password' => 'pass_rian_88',
                        'fullNumber' => '+628567890123',
                        'birthDate' => '1988-03-10',
                        'gender' => 'Male',
                        'addressInfo' => [
                            'street' => 'Jl. Pemuda No. 88',
                            'city' => 'Surabaya',
                            'state' => 'Jawa Timur',
                        ],
                    ],
                    'totalRating' => 3,
                    'type' => 'Takeaway',
                    'description' => 'Pesan Spicy Aglio Olio buat dibawa pulang. Rasanya oke, pedasnya pas. Tapi porsinya agak sedikit kurang banyak untuk harga segini.',
                ],
            ]
        ];

        // Suggested Products (Array of Associative Arrays)
        $suggestedProducts = [
            [
                'id' => '1',
                'name' => '7-Minute Khichdi - Classic Dal',
                'description' => 'Traditional dal khichdi with authentic spices',
                'priceDiscount' => 79,
                'priceOrigin' => 99,
                'rating' => 4.6,
                'image' => 'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                'badge' => '20% OFF',
            ],
            [
                'id' => '2',
                'name' => '7-Minute Khichdi - Spinach Special',
                'description' => 'Nutritious khichdi with fresh spinach & herbs',
                'priceDiscount' => 95,
                'priceOrigin' => 125,
                'rating' => 4.7,
                'image' => 'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                'badge' => '24% OFF',
            ],
            [
                'id' => '3',
                'name' => '7-Minute Khichdi - Masala Mix',
                'description' => 'Spicy khichdi with aromatic masala blend',
                'priceDiscount' => 89,
                'priceOrigin' => 90,
                'rating' => 4.5,
                'image' => 'https://images.unsplash.com/photo-1647545401842-4974e4bcbda5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXAlMjBib3dsfGVufDF8fHx8MTc2MDQ2MzY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                'badge' => null, // Perhatikan penanganan nilai null
            ],
            [
                'id' => '4',
                'name' => 'Variety Pack - 4 Flavors',
                'description' => 'Try all our delicious khichdi varieties',
                'priceDiscount' => 320,
                'priceOrigin' => 400,
                'rating' => 4.8,
                'image' => 'https://images.unsplash.com/photo-1756361947369-8c0e1e8d6828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwZm9vZCUyMHBhY2thZ2V8ZW58MXx8fHwxNzYwNTEzNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                'badge' => 'BEST VALUE',
            ],
        ];
        $props = [
            'user' => $user,
            'productImages' => $productImages,
            'product' => $product,
            'suggestedProducts' => $suggestedProducts,
        ];
        
        return Inertia::render('homepage/product-details', $props);
    }

     public function productListing() {
        $products = [
            [
                'id' => '1',
                'name' => 'Pav Bhaji',
                'description' => 'Pav bhaji is made with vegetables like potatoes, onions, tomatoes, peas, cauliflower, and capsicum, cooked with pav bhaji masala, turmeric, red chilli powder, cumin seeds, and sometimes garam masala, along with butter, oil, ginger-garlic paste, salt, and lemon juice, served with butter-toasted pav, chopped onions, coriander leaves, and lemon wedges.',
                'priceDiscount' => 18.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=250&fit=crop',
                'category' => 'Indian',
                'popular' => true,
                'rating' => 4.4,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '15-20 min',
            ],
            [
                'id' => '2',
                'name' => 'Kung Pao Chicken',
                'description' => 'Spicy stir-fried chicken with peanuts and vegetables',
                'priceDiscount' => 16.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=250&fit=crop',
                'category' => 'Chinese',
                'popular' => true,
                'rating' => 4.6,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '12-18 min',
            ],
            [
                'id' => '3',
                'name' => 'Classic Cheeseburger',
                'description' => 'Beef patty with cheese, lettuce, tomato, and special sauce',
                'priceDiscount' => 14.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
                'category' => 'Burgers',
                'popular' => false,
                'rating' => 4.5,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '10-15 min',
            ],
            [
                'id' => '4',
                'name' => 'Salmon Sashimi',
                'description' => 'Fresh salmon sliced thin and served raw',
                'priceDiscount' => 24.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop',
                'category' => 'Sushi',
                'popular' => true,
                'rating' => 4.9,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '5-10 min',
            ],
            [
                'id' => '5',
                'name' => 'Chicken Tacos',
                'description' => 'Three soft tacos with grilled chicken, salsa, and cilantro',
                'priceDiscount' => 13.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
                'category' => 'Tacos',
                'popular' => false,
                'rating' => 4.4,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '8-12 min',
            ],
            [
                'id' => '6',
                'name' => 'Caesar Salad',
                'description' => 'Crisp romaine lettuce with parmesan cheese and croutons',
                'priceDiscount' => 12.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
                'category' => 'Salads',
                'popular' => false,
                'rating' => 4.7,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '5-8 min',
            ],
            [
                'id' => '7',
                'name' => 'Chocolate Cake',
                'description' => 'Rich chocolate cake with chocolate frosting',
                'priceDiscount' => 8.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=250&fit=crop',
                'category' => 'Desserts',
                'popular' => true,
                'rating' => 4.6,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '3-5 min',
            ],
            [
                'id' => '8',
                'name' => 'Cappuccino',
                'description' => 'Rich espresso with steamed milk and foam',
                'priceDiscount' => 5.99,
                'priceOrigin' => 5,
                'image' => 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400&h=250&fit=crop',
                'category' => 'Coffee',
                'popular' => false,
                'rating' => 4.3,
                'quantity' => 10,
                'foodType' => [],
                'preparationTime' => '2-4 min',
            ],
        ];

        $props = [
            'products' => $products,
        ];

        return Inertia::render('homepage/product-listing', $props);
    }
}
