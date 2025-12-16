<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Models\OrderDetail;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function create(Request $request) {
        // $request->validate([
        //     'products' => 'required|array',
        //     'products.*.id' => 'required|exists:products,id',
        //     'products.*.quantity' => 'required|integer|min:1',
        // ]);

        // $user = Auth::user();

        // $order = Order::create([
        //     'user_id' => $user->id,
        //     'order_number' => Str::uuid(),
        //     'status' => 'created',
        //     'total_price' => 0,
        // ]);

        // $totalPrice = 0;

        // foreach ($request->products as $productData) {
        //     $product = Product::find($productData['id']);
        //     $quantity = $productData['quantity'];
        //     $subtotal = $product->price * $quantity;

        //     OrderDetail::create([
        //         'order_id' => $order->id,
        //         'product_id' => $product->id,
        //         'quantity' => $quantity,
        //         'subtotal' => $subtotal,
        //     ]);

        //     $totalPrice += $subtotal;
        // }

        // $order->update(['total_price' => $totalPrice]);

        // return response()->json([
        //     'order' => $order->load('details.product'),
        // ]);
    }
}
