<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    // public function index()
    // {
    //     $cart = Auth::user()
    //         ->cart()
    //         ->with('items.product')
    //         ->first();

    //     return Inertia::render('Cart/Index', [
    //         'cart' => $cart
    //     ]);
    // }

    public function add(Request $request)
    {
        $cart = Cart::firstOrCreate([
            'user_id' => Auth::user()->id
        ]);

        $item = $cart->items()->where('product_id', $request->product_id)->first();

        if ($item) {
            $item->increment('quantity');
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => 1
            ]);
        }

        return back();
    }

    public function update(Request $request, CartItem $item)
    {
        $item->update([
            'quantity' => $request->quantity
        ]);

        return back();
    }

    public function destroy(CartItem $item)
    {
        try {
            $item->delete();
            return back();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to remove item from cart.',
                'message' => $e->getMessage()
            ]);
        }
    }
}
