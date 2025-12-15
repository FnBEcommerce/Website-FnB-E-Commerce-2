<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function addReview(Request $request) {
        return Review::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'description' => $request->description,
        ]);
    }
}
