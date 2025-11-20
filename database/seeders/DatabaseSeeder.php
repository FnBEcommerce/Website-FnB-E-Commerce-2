<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\ShopBranch;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Data Master (User, Product, Shop)
        $users = User::factory(10)->create();
        $products = Product::factory(50)->create();
        $shops = ShopBranch::factory(5)->create();

        // 2. Isi Tabel Pivot ShopBranch <-> Product (Many-to-Many)
        // Setiap toko akan memiliki 10-20 produk acak
        foreach ($shops as $shop) {
            // Ambil ID produk acak
            $randomProducts = $products->random(rand(10, 20))->pluck('product_id');
            
            // Attach menggunakan query builder atau relationship jika sudah dibuat di model
            foreach($randomProducts as $prodId) {
                DB::table('shopbranch_product')->insert([
                    'shop_id' => $shop->shop_branch_id,
                    'product_id' => $prodId
                ]);
            }
        }

        // 3. Buat Transaksi & Order (Logika Kompleks)
        foreach ($users as $user) {
            // Setiap user membuat 1-3 order
            Order::factory(rand(1, 3))->create([
                'user_id' => $user->user_id
            ])->each(function ($order) use ($products) {
                
                // A. Buat Order Detail (Item Belanja)
                $subtotalOrder = 0;
                $itemsCount = rand(1, 5); // Beli 1-5 jenis barang
                $selectedProducts = $products->random($itemsCount);

                foreach ($selectedProducts as $product) {
                    $qty = rand(1, 3);
                    $lineTotal = $product->product_price * $qty;
                    $subtotalOrder += $lineTotal;

                    OrderDetail::create([
                        'order_id' => $order->order_id,
                        'product_id' => $product->product_id,
                        'orderdetail_quantity' => $qty,
                        'orderdetail_subtotal' => $lineTotal,
                        'date_created' => now(),
                        'last_updated' => now(),
                    ]);
                    
                    // Kurangi stok produk (Opsional)
                    // $product->decrement('product_stock', $qty);
                }

                // B. Update Total Harga di Tabel Order
                $order->update(['order_total' => $subtotalOrder]);

                // C. Buat Record Transaction
                Transaction::create([
                    'order_id' => $order->order_id,
                    'date_created' => now(),
                    'last_updated' => now(),
                ]);
            });
        }
    }
}
