<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Midtrans\Snap;
use Midtrans\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function pay(Order $order)
    {
        // VALIDASI
        if ($order->status !== 'created') {
            abort(400, 'Order tidak valid');
        }

        // MIDTRANS CONFIG
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // return response()->json($order);

        // PARAMETER TRANSAKSI
        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => $order->total_amount,
            ],
            'customer_details' => [
                'name' => $order->user->name,
                'email' => $order->user->email,
            ],
        ];

        // GENERATE TOKEN
        $snapToken = Snap::getSnapToken($params);
        // Snap::

        // KUNCI ORDER
        $order->update(['status' => 'pending']);

        return response()->json([
            'snap_token' => $snapToken
        ]);
    }
    // public function getSnapToken(Request $request)
    // {
    //     Config::$serverKey = config('midtrans.server_key');
    //     Config::$isProduction = config('midtrans.is_production');
    //     Config::$isSanitized = true;
    //     Config::$is3ds = true;

    //     $params = [
    //         'transaction_details' => [
    //             'order_id' => 'ORDER-' . time(),
    //             'gross_amount' => 150000,
    //         ],
    //         'customer_details' => [
    //             'username' => 'bima',
    //             'email' => 'bima@example.com',
    //         ],
    //     ];

    //     $snapToken = Snap::getSnapToken($params);

    //     return response()->json([
    //         'snap_token' => $snapToken
    //     ]);
    // }
}
