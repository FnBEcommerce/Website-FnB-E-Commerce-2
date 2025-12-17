<?php

namespace Database\Seeders;

use App\Models\Courier;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Review;
use App\Models\ShopBranch;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a specific admin user
        $admin = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        // Create a few regular users
        $users = User::factory(10)->create();

        // Create some couriers
        $couriers = Courier::factory(5)->create();

        // Create products
        $products = Product::factory(50)->create();

        // Create shop branches
        $shopBranches = ShopBranch::factory(5)
            ->hasAttached($users->random(2), [], 'assignedUsers')
            ->create();

        // Attach at least one shop branch to each product
        $products->each(function ($product) use ($shopBranches) {
            $product->shopBranches()->attach($shopBranches->random(rand(1, 3))->pluck('id')->toArray());
        });

        // Create orders for each shop branch
        $shopBranches->each(function ($shop) use ($users, $couriers) {
            // For each shop, create a few orders
            Order::factory(rand(5, 10))
                ->for($users->random()->first(), 'user')
                ->for($couriers->random()->first(), 'courier')
                ->for($shop, 'shopBranch')
                ->has(
                    OrderDetail::factory(rand(1, 4))
                        ->state(function (array $attributes, Order $order) use ($shop) {
                            // Get products available only at the order's shop branch
                            $product = $shop->products->random();
                            $quantity = rand(1, 3);
                            return [
                                'product_id' => $product->id,
                                'quantity' => $quantity,
                                'subtotal' => $product->price_discount * $quantity,
                            ];
                        })
                )
                ->create()
                ->each(function ($order) {
                    // After creating order details, update the order totals
                    $subtotal = $order->orderDetails->sum('subtotal');
                    $order->update([
                        'subtotal' => $subtotal,
                        'total' => $subtotal + $order->delivery_fee,
                    ]);

                    // Create reviews for some of the products in the order
                    foreach ($order->orderDetails as $detail) {
                        if (rand(0, 1)) { // 50% chance to review
                            $reviewDate = (clone $order->confirmed_at)->add(new \DateInterval('P' . rand(1, 7) . 'D'));
                            Review::factory()
                                ->for($order->user)
                                ->for($detail->product)
                                ->create([
                                    'created_at' => $reviewDate,
                                    'updated_at' => $reviewDate,
                                ]);
                        }
                    }
                });
        });

        $this->call([
            NotificationSeeder::class,
        ]);
    }
}
