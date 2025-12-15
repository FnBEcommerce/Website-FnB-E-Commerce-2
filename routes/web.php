<?php

use App\Http\Controllers\AdminController;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DeliveryController;    
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\MidtransWebhookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;

// Route::get('/', function () {
//     return Inertia::render('home');
// })->name('home');

Route::get('/', [HomepageController::class, 'index'])->name('homepage');

// Begin payment integration dummy
Route::get('/products-dummy/{product}', [HomepageController::class, 'productDetailDummy'])->name('products-dummy.detail');
Route::get('/checkout-dummy', [HomepageController::class, 'checkoutDummy'])->name('checkout-dummy');
// End payment integration dummy

Route::get("/auth", [HomepageController::class, 'auth'])->name('auth');

Route::get("/checkout", function() {
    return Inertia::render('checkout');
})->name('checkout');

// Route::get("/products", function() {
//     return Inertia::render('product-listing');
// })->name('products');

//  Route::get("/products/{id}", function() {
//      return Inertia::render('product-detail');
// })->name('products.detail');

Route::get('/products', [HomepageController::class, 'productListing'])->name('product.listing');

Route::middleware(['role:user,admin'])->group(function() {
    Route::get('/products/{product}', [HomepageController::class, 'productDetail'])->name('product.detail');
    Route::get('/profile', [HomepageController::class, 'userProfile']);
    Route::get('/product/cart', [HomepageController::class, 'productCart'])->name('product.cart');
    Route::get('/product/status', [HomepageController::class, 'productStatus'])->name('product.cart');

    Route::middleware('order.owner')->group(function() {
        Route::get('/delivery/{order}', [DeliveryController::class, "detail"])->name('delivery');
    });
});

Route::middleware(['role:admin'])->prefix('/admin')->group(function () {
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

Route::middleware(['web'])->prefix('/api')->group(function() {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/logout', [UserController::class, 'logout']);
    // TODO: Protect route
    Route::post('/orders/create', [PaymentController::class, 'create'])
    ;
    Route::post('/orders/{order}/pay', [PaymentController::class, 'pay'])
    ;
    // Route::post('/midtrans/webhook', [MidtransWebhookController::class, 'handle']);

});

require __DIR__.'/settings.php';