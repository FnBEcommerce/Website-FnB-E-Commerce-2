<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index() {
        $products = Product::all();
        $props = [
            'products' => $products
        ];

        return Inertia::render('homepage/home', $props);
    }

    public function productDetail(Product $product) {
        $user = Auth::user();
        $reviews = $product->reviews()->get();

        // Product Images (Indexed Array)
        $productImages = [
            'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1624935984039-395c058e3944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjA0MTY3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1756361947369-8c0e1e8d6828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwZm9vZCUyMHBhY2thZ2V8ZW58MXx8fHwxNzYwNTEzNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ];

        $suggestedProducts = Product::take(4)->get();
        $props = [
            'user' => $user,
            'productImages' => $productImages,
            'product' => $product,
            'reviews' => $reviews,
            'suggestedProducts' => $suggestedProducts,
        ];
        
        return Inertia::render('homepage/product-details', $props);
    }

     public function productListing() {

        $products = Product::all();

        $props = [
            'products' => $products,
        ];

        return Inertia::render('homepage/product-listing', $props);
    }

    public function auth() {
        return Inertia::render('auth');
    }

    public function userProfile() {
        $user = Auth::user();
        $props = [
            'user' => $user,
        ];
        return Inertia::render('homepage/user-profile', $props);
    }

    public function productCart() {
        return Inertia::render('homepage/product-cart');
    }

    public function order() {
        return Inertia::render('homepage/order-dummy');
    }

    public function checkout() {
        $order = Order::find(1);
        $props = [
            'order' => $order
        ];
        return Inertia::render('homepage/checkout-dummy', $props);
    }
}
