<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class MidtransWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // VALIDASI SIGNATURE
        $signature = hash(
            'sha512',
            $request->order_id .
            $request->status_code .
            $request->gross_amount .
            config('midtrans.server_key')
        );

        if ($signature !== $request->signature_key) {
            abort(403);
        }

        $order = Order::where('order_id', $request->order_id)->firstOrFail();

        if ($request->transaction_status === 'settlement') {
            $order->update([
                'status' => 'paid',
                'payment_type' => $request->payment_type,
                'paid_at' => now()
            ]);
        }

        if ($request->transaction_status === 'expire') {
            $order->update(['status' => 'expired']);
        }

        return response()->json(['ok' => true]);
    }
}
