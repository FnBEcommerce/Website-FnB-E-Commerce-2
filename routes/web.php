<?php

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/delivery/{order}', function (Order $order) {
    $orderItems = OrderDetail::with('product')
        ->where('order_id', $order->order_id)
        ->get([
            'order_id',
            'orderdetail_quantity',
            'orderdetail_subtotal',
            'product_id'
        ]);
    return Inertia::render('delivery', ['orderNumber' => $order->order_id, 'orderItems' => $orderItems]);
})->name('delivery');

Route::prefix('/admin')->group(function () {
      Route::get('dashboard', function () {
        return Inertia::render('dashboard/dashboard-index');
    })->name('admin.dashboard');
    Route::get('customer-management', function () {
        return Inertia::render('admin/customer-management');
    })->name('admin.customer_management');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
