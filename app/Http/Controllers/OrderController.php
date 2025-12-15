<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function create(Request $request) {

        $order = Order::create([]);

        return response()->json([
            'order' => $order,
        ]);
    }
}
