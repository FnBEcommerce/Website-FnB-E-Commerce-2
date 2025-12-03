<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Courier;
use App\Models\ShopBranch;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Review;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // ==========================================
        // 1. DATA MASTER (Realistis - Indonesia)
        // ==========================================

        // --- A. Users (Pelanggan) ---
        $usersData = [
            ['username' => 'budi_santoso', 'role' => 'customer', 'address_1' => 'Jl. Sudirman No. 45, Jakarta Pusat'],
            ['username' => 'siti_aminah', 'role' => 'customer', 'address_1' => 'Jl. Kebon Jeruk Raya No. 12, Jakarta Barat'],
            ['username' => 'andi_wijaya', 'role' => 'customer', 'address_1' => 'Jl. Dago No. 88, Bandung'],
            ['username' => 'citra_lestari', 'role' => 'customer', 'address_1' => 'Komplek Permata Hijau Blok C, Jakarta Selatan'],
            ['username' => 'admin_super', 'role' => 'admin', 'address_1' => 'Kantor Pusat, Lt. 5'],
        ];

        $userIds = [];
        foreach ($usersData as $u) {
            $user = User::create([
                'username' => $u['username'],
                'password' => Hash::make('password123'),
                'address_1' => $u['address_1'],
                'role' => $u['role'],
                'date_created' => Carbon::now()->subMonths(2),
                'last_updated' => Carbon::now()->subMonths(2)
            ]);
            $userIds[] = $user->user_id;
        }

        // --- B. Couriers (Kurir) ---
        $couriersData = [
            ['name' => 'Asep Suherman', 'plate' => 'B 3452 KXY', 'phone' => '081234567890'],
            ['name' => 'Ujang Komarudin', 'plate' => 'D 5671 ABC', 'phone' => '081987654321'],
            ['name' => 'Bambang Pamungkas', 'plate' => 'B 1111 ZZZ', 'phone' => '081333444555'],
        ];

        $courierIds = [];
        foreach ($couriersData as $c) {
            $courier = Courier::create([
                'courier_name' => $c['name'],
                'courier_license_plate' => $c['plate'],
                'courier_phone_number' => $c['phone'],
            ]);
            $courierIds[] = $courier->courier_id;
        }

        // --- C. Shops & Products (Toko & Menu Relevan) ---
        // Kita buat array asosiatif agar produk sesuai dengan tokonya
        $shopMenus = [
            [
                'name' => 'Nasi Goreng Gila Mas Doni',
                'address' => 'Jl. Tebet Raya No. 10',
                'products' => [
                    ['name' => 'Nasi Goreng Spesial', 'cat' => 'Makanan', 'price' => 25000],
                    ['name' => 'Nasi Goreng Gila', 'cat' => 'Makanan', 'price' => 30000],
                    ['name' => 'Es Teh Manis', 'cat' => 'Minuman', 'price' => 5000],
                    ['name' => 'Kerupuk Putih', 'cat' => 'Tambahan', 'price' => 2000],
                ]
            ],
            [
                'name' => 'Kopi Janji Manis',
                'address' => 'Ruko Grand Indonesia, Jakarta',
                'products' => [
                    ['name' => 'Es Kopi Susu Gula Aren', 'cat' => 'Minuman', 'price' => 18000],
                    ['name' => 'Americano', 'cat' => 'Minuman', 'price' => 15000],
                    ['name' => 'Croissant Almond', 'cat' => 'Makanan', 'price' => 22000],
                ]
            ],
            [
                'name' => 'Sate Ayam Madura Cak Imin',
                'address' => 'Jl. Sabang, Jakarta Pusat',
                'products' => [
                    ['name' => 'Sate Ayam (10 Tusuk)', 'cat' => 'Makanan', 'price' => 35000],
                    ['name' => 'Sate Kambing (10 Tusuk)', 'cat' => 'Makanan', 'price' => 50000],
                    ['name' => 'Lontong', 'cat' => 'Makanan', 'price' => 5000],
                ]
            ]
        ];

        $shopIds = [];

        foreach ($shopMenus as $shopData) {
            // 1. Buat Toko
            $shop = ShopBranch::create([
                'shop_name' => $shopData['name'],
                'shop_address' => $shopData['address'],
                'shop_phonenumber' => '021-' . rand(1000000, 9999999),
                'date_created' => Carbon::now()->subMonths(3),
                'last_updated' => Carbon::now()->subMonths(3),
            ]);
            $shopIds[] = $shop->shop_id;

            // 2. Buat Produk & Link ke Pivot
            foreach ($shopData['products'] as $prodData) {
                $product = Product::create([
                    'product_name' => $prodData['name'],
                    'product_category' => $prodData['cat'],
                    'product_price' => $prodData['price'],
                    'product_discount_price' => $prodData['price'], // Tidak diskon dulu
                    'product_description' => 'Menu lezat dan higienis dari ' . $shopData['name'],
                    'product_stock' => 100,
                    'date_created' => Carbon::now()->subMonths(3),
                    'last_updated' => Carbon::now()->subMonths(3),
                ]);

                // 3. Isi Pivot Table (Link Toko <-> Produk)
                DB::table('shopbranch_product')->insert([
                    'shop_id' => $shop->shop_id,
                    'product_id' => $product->product_id
                ]);
            }
        }

        // ==========================================
        // 2. TRANSAKSI (Logic Order Realistis)
        // ==========================================

        // Buat 15 Order dummy
        for ($i = 0; $i < 15; $i++) {
            // Pilih User, Kurir, dan Toko Acak
            $randomShopId = $shopIds[array_rand($shopIds)];
            $randomUserId = $userIds[array_rand($userIds)];
            $randomCourierId = $courierIds[array_rand($courierIds)];

            // Ambil produk HANYA yang dijual oleh toko tersebut (join table pivot)
            $availableProducts = DB::table('product')
                ->join('shopbranch_product', 'product.product_id', '=', 'shopbranch_product.product_id')
                ->where('shopbranch_product.shop_id', $randomShopId)
                ->select('product.*')
                ->get();
            
            // Tentukan Waktu Transaksi (Mundur ke belakang agar terlihat history)
            $orderDate = Carbon::now()->subDays(rand(1, 30));
            
            // Buat Order Header dulu (Total nanti diupdate)
            $order = Order::create([
                'user_id' => $randomUserId,
                'shop_id' => $randomShopId,
                'courier_id' => $randomCourierId,
                'payment_method' => ['OVO', 'GOPAY', 'CASH'][rand(0, 2)],
                'order_status' => 'delivered', // Anggap semua sudah selesai
                'order_total' => 0, // Placeholder
                'date_created' => $orderDate,
                'order_confirmed_time' => $orderDate->copy()->addMinutes(5),
                'order_processed_time' => $orderDate->copy()->addMinutes(15),
                'delivered_time_estimation' => $orderDate->copy()->addMinutes(45),
                'delivered_time' => $orderDate->copy()->addMinutes(rand(30, 60)),
            ]);

            // Generate Order Detail (Beli 1 - 3 item per order)
            $totalOrderPrice = 0;
            $itemsCount = rand(1, 3);
            // Acak produk dari toko tsb
            $selectedProducts = $availableProducts->random($itemsCount); 

            foreach ($selectedProducts as $prod) {
                $qty = rand(1, 2);
                $subtotal = $prod->product_id * $qty;
                $totalOrderPrice += $subtotal;

                OrderDetail::create([
                    'order_id' => $order->order_id,
                    // 'product_id' => $prod->get(0)->product_id,
                    'product_id' => $prod->product_id,
                    'orderdetail_quantity' => $qty,
                    'orderdetail_subtotal' => $subtotal,
                    'date_created' => $orderDate,
                    'last_updated' => $orderDate,
                ]);

                // ==========================================
                // 3. REVIEWS (Opsional, 70% user kasih review)
                // ==========================================
                if (rand(1, 10) > 3) {
                    $ratings = [5, 5, 4, 3, 5]; // Biar rating cenderung bagus
                    $comments = [
                        'Mantap, rasanya enak banget!',
                        'Pengiriman cepat, makanan masih hangat.',
                        'Lumayan lah sesuai harga.',
                        'Recommended seller!',
                        'Porsinya banyak, kenyang.'
                    ];
                    $idx = array_rand($ratings);

                    Review::create([
                        'user_id' => $randomUserId,
                        // 'product_id' => $prod->get(0)->product_id,
                        'product_id' => $prod->product_id,
                        'rating' => $ratings[$idx],
                        'review_comment' => $comments[$idx],
                        'date_created' => $orderDate->copy()->addHours(2),
                        'last_updated' => $orderDate->copy()->addHours(2),
                    ]);
                }
            }

            // Update Total Order yang sebenarnya
            $order->update(['order_total' => $totalOrderPrice]);
        }
    }
}