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
use App\Http\Controllers\ProductController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\TeleUsersController;
use App\Http\Controllers\CartController;


Route::get('/', [HomepageController::class, 'index'])->name('homepage');

// Begin payment integration dummy
Route::get('/products-dummy/{product}', [HomepageController::class, 'productDetailDummy'])->name('products-dummy.detail');
Route::get('/checkout-dummy', [HomepageController::class, 'checkoutDummy'])->name('checkout-dummy');
// End payment integration dummy

Route::get("/auth", [HomepageController::class, 'auth'])->name('auth');

// Route::get("/checkout", function() {
//     return Inertia::render('checkout');
// })->name('checkout');

// Route::post('/payment', [PaymentController::class, 'create'])->name('payment.create');

// Route::get('/payment/fake', function (Request $request) {
//     return Inertia::render('payment/FakePayment', [
//         'order_id' => $request->get('order_id'),
//         'total' => $request->get('total'),
//     ]);
// })->name('payment.fake');

// Route::post('/payment/fake/success', function (Request $request) {
//     $order = Order::find($request->order_id);
//     $order->payment_status = 'paid';
//     $order->paid_at = now();
//     $order->save();

//     return redirect()->route('product.status')->with('success', 'Payment successful!');
// })->name('payment.fake.success');

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
    Route::get('/product/status', [HomepageController::class, 'productStatus'])->name('product.status');

    Route::middleware('order.owner')->group(function() {
        Route::get('/delivery/{order}', [DeliveryController::class, "detail"])->name('delivery');
    });

    Route::prefix('/cart')->group(function() {
        Route::post('/add', [CartController::class, 'add'])->name('cart.add');
        Route::post('/update/{item}', [CartController::class, 'update'])->name('cart.update');
        Route::delete('/destroy/{item}', [CartController::class, 'destroy'])->name('cart.destroy');
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
        return Inertia::render('dashboard-laravel');
    })->name('dashboard');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
    Route::post('/profile', [UserController::class, 'updateProfile'])->name('user.profile.update');
});

Route::middleware(['web'])->prefix('/api')->group(function() {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/logout', [UserController::class, 'logout']);
    // TODO: Protect route
    Route::post('/orders/create', [PaymentController::class, 'create'])
    ;
    Route::post('/orders/pay', [PaymentController::class, 'pay'])
    ;
    Route::post('/product/review', [ProductController::class, 'addReview']);
    // Route::post('/midtrans/webhook', [MidtransWebhookController::class, 'handle']);
});


Route::get('courier', [TeleUsersController::class, 'index']);


require __DIR__.'/settings.php';