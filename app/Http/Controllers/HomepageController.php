<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageController extends Controller
{
       public function index() {
        return Inertia::render('homepage/home');
    }

    public function productDetail() {
        return Inertia::render('homepage/product-details');
    }

     public function productListing() {
        return Inertia::render('homepage/product-listing');
    }

}
