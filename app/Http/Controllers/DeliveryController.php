<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class DeliveryController extends Controller
{
    public function index(Order $order) {
        $orderItems = OrderDetail::with('product')
        ->where('order_id', $order->order_id)
        ->get([
            'order_id',
            'orderdetail_quantity',
            'orderdetail_subtotal',
            'product_id'
        ]);
    return Inertia::render('delivery', ['orderNumber' => $order->order_id, 'orderItems' => $orderItems]);
    }
}
