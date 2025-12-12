<?php

use App\Http\Controllers\AdminController;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DeliveryController;    
use App\Http\Controllers\HomepageController;

// Route::get('/', function () {
//     return Inertia::render('home');
// })->name('home');


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

Route::prefix('/')->group(function () {
   Route::get('/', [HomepageController::class, 'index'])->name('homepage');
   Route::get('/products2/{product}', [HomepageController::class, 'productDetail'])->name('product.detail');
   Route::get('/products2', [HomepageController::class, 'productListing'])->name('product.listing');
    // Route::get('/customer-management', [AdminController::class, 'customerManagement'])->name('admin.customer_management');
    // Route::get('/cashflow-management', [AdminController::class, 'cashflowManagement'])->name('admin.cashflow_management');
    // Route::get('/product-management', [AdminController::class, 'productManagement'])->name('admin.product_management');
});


Route::prefix('/admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/customer-management', [AdminController::class, 'customerManagement'])->name('admin.customer_management');
    Route::get('/cashflow-management', [AdminController::class, 'cashflowManagement'])->name('admin.cashflow_management');
    Route::get('/product-management', [AdminController::class, 'productManagement'])->name('admin.product_management');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
