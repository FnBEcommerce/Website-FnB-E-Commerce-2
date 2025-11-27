<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
        // 1. Buat Data Master (Independen)
        $users = User::factory(10)->create();
        $couriers = Courier::factory(5)->create();
        $shops = ShopBranch::factory(5)->create();
        $products = Product::factory(20)->create();

        // dd($shops->first());

        // 2. Isi Pivot Table (ShopBranch - Product)
        foreach ($shops as $shop) {
            // Ambil 5 produk acak untuk setiap toko
            // dd($shop);
            $randomProducts = $products->random(5);
            foreach($randomProducts as $prod) {
                DB::table('shopbranch_product')->insert([
                    'shop_id' => $shop->shop_id,
                    'product_id' => $prod->product_id
                ]);
            }
        }

        // 3. Buat Order & Detail (Dependen)
        // Kita loop manual agar relasi ID nya valid dari data yang sudah ada
        for ($i = 0; $i < 10; $i++) {
            $order = Order::factory()->create([
                'user_id' => $users->random()->user_id,
                'courier_id' => $couriers->random()->courier_id,
                'shop_id' => $shops->random()->shop_id,
            ]);

            // Buat Detail Order
            OrderDetail::factory(2)->create([
                'order_id' => $order->order_id,
                'product_id' => $products->random()->product_id,
                'orderdetail_quantity' => 1,
                'orderdetail_subtotal' => 50000 // Dummy value
            ]);
        }

        // 4. Buat Review
        Review::factory(10)->create([
            'user_id' => $users->random()->user_id,
            'product_id' => $products->random()->product_id,
            'rating' => rand(1, 5),
            'review_comment' => 'Produk bagus!',
            'date_created' => now()
        ]);
    }
}