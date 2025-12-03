<?php

use App\Http\Controllers\AdminController;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DeliveryController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
Route::get('/index', function () {
    return Inertia::render('index', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('index');

Route::get("/auth", function() {
    return Inertia::render('auth');
})->name('auth');

Route::get("/checkout", function() {
    return Inertia::render('checkout');
})->name('checkout');

Route::get("/products", function() {
    return Inertia::render('product-listing');
})->name('products');

Route::get("/products/{id}", function() {
    return Inertia::render('product-detail');
})->name('products.detail');

Route::get('/delivery/{order}', [DeliveryController::class, "detail"])->name('delivery');

Route::prefix('/admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/customer-management', [AdminController::class, 'customerManagement'])->name('admin.customer_management');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
