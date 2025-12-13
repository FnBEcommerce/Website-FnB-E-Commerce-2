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
    public function detail(Order $order) {
        $user = User::find(2); // TODO: Ubah ketika sudah ada sistem login
        $orderItems = OrderDetail::with('product')
        ->where('id', $order->id)
        ->get([
            'id',
            'quantity',
            'subtotal',
            'product_id'
        ]);

        $nearestBranch = [
            'name'     => "Cabang Jakarta Selatan (Pusat)",
            'distance' => "2.3 km",
            'address'  => "Jl. Senopati No. 10, Jakarta"
        ];

        $courierInfo = [
            'name'   => "Budi Santoso",
            'plate'  => "B 1234 XYZ",
            'status' => "Menuju lokasi restoran"
        ];

        $recommendations = [
            [
                'id'       => 101,
                'name'     => "Ice Matcha Latte",
                'discount' => 0.2,
                'price'    => 24000
            ],
            [
                'id'       => 102,
                'name'     => "Choco Croissant",
                'discount' => 0.15,
                'price'    => 18000
            ]
        ];

        $currentStepIndex = 2; // 0: Confirmed, 1: Processing, 2: Shipped, 3: Delivered

        $trackingDetails = [
            [
                'date'      => '12:00 PM',
                'completed' => true,
            ],
            [
                'date'      => '12:30 PM',
                'completed' => true,
            ],
            [
                'date'      => 'Sedang berlangsung',
                'completed' => true,
            ],
            [
                'date'      => 'Est. 30 min',
                'completed' => false,
            ],
        ];

        $props = [
            'user' => $user,
            'orderNumber' => $order->id,
            'orderItems' => $orderItems,
            'nearestBranch' => $nearestBranch,
            'courierInfo' => $courierInfo,
            'recommendations' => $recommendations,
            'currentStepIndex' => $currentStepIndex,
            'trackingDetails' => $trackingDetails,
        ];

        return Inertia::render('delivery', $props);
    }
}
