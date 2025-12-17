<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Courier;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Midtrans\Snap;
use Midtrans\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        Config::$serverKey = config('midtrans.server_key');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        Config::$isProduction = config('midtrans.is_production');
        // Set sanitization on (default)
        Config::$isSanitized = config('midtrans.is_sanitized');
        // Set 3DS transaction for credit card to true
        Config::$is3ds = config('midtrans.is_3ds');

        try {
            $customOrderId = time() . rand(100, 999);
            $user = Auth::user();
            $shop_branch_id = 1;

            // Implementasi pemilihan Courier secara acak
            // Mengambil 1 data secara acak, jika kosong set null agar tidak error
            $courier = Courier::inRandomOrder()->first();
            $courier_id = $courier ? $courier->id : null;

            $order = Order::create([
                'user_id' => $user->id,
                'order_id' => $customOrderId,
                'shop_branch_id' => $shop_branch_id,
                'courier_id' => $courier_id,
                'total' => $request->total,
                'payment_status' => 'pending',
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'total_amount' => $request->total,
                'subtotal' => $request->subtotal,
                'delivery_fee' => $request->delivery_fee,
            ]);
            foreach ($request->cart_items as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'subtotal' => $request->total,
                ]);
            }

            $params = array(
                'transaction_details' => array(
                    'order_id' => $customOrderId,
                    'gross_amount' => ceil($order->total),
                ),
                'customer_details' => array(
                    'first_name' => $user->name,
                    'email' => $user->email,
                ),
            );

            $snapToken = Snap::getSnapToken($params);
    
            return response()->json([
                'order_order_id' => $order->order_id,
                'snap_token' => $snapToken,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Gagal membuat order: ' . $th->getMessage(),
            ], 500);
        }
        

    }

    public function pay(Order $order)
    {
        // VALIDASI
        if ($order->status !== 'created') {
            return response()->json([
                'message' => 'Order tidak valid untuk diproses pembayaran.',
            ], 400);
        }

        return response()->json([
            // 'snap_token' => $snapToken
        ]);
    }
}
