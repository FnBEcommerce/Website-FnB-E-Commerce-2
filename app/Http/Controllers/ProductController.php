<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Store method called');
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required|string|max:255',
        //     'category' => 'required|string|max:255',
        //     'price_origin' => 'required|numeric',
        //     'price_discount' => 'nullable|numeric',
        //     'quantity' => 'required|integer',
        //     'description' => 'required|string',
        //     'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        // ]);
        
        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }
        $errors = [];

        if (!$request->has('name') || !is_string($request->name) || strlen($request->name) > 255) {
            $errors['name'][] = 'Name wajib diisi dan maksimal 255 karakter.';
        }

        if (!$request->has('category') || !is_string($request->category) || strlen($request->category) > 255) {
            $errors['category'][] = 'Category wajib diisi dan maksimal 255 karakter.';
        }

        if (!$request->has('price_origin') || !is_numeric($request->price_origin)) {
            $errors['price_origin'][] = 'Price origin wajib berupa angka.';
        }

        if ($request->filled('price_discount') && !is_numeric($request->price_discount)) {
            $errors['price_discount'][] = 'Price discount harus berupa angka.';
        }

        if (!$request->has('quantity') || !filter_var($request->quantity, FILTER_VALIDATE_INT)) {
            $errors['quantity'][] = 'Quantity wajib berupa bilangan bulat.';
        }

        if (!$request->has('description') || !is_string($request->description)) {
            $errors['description'][] = 'Description wajib diisi.';
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $allowedMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
            if (!in_array($image->getMimeType(), $allowedMime)) {
                $errors['image'][] = 'Format image tidak valid.';
            }

            if ($image->getSize() > 2048 * 1024) {
                $errors['image'][] = 'Ukuran image maksimal 2MB.';
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $errors
            ], 422);
        }
        Log::info('Validation passed');

        $product = new Product($request->except('image'));

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $product->image = Storage::url($path);
        }

        $product->save();

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        Log::info('Update method called');
        $errors = [];

        /**
         * helper: cek sometimes|required|string|max
         */
        function validateString($request, $field, $max, &$errors)
        {
            if ($request->has($field)) {
                if (empty($request->$field) || !is_string($request->$field)) {
                    $errors[$field][] = ucfirst($field).' wajib diisi dan berupa string.';
                } elseif (strlen($request->$field) > $max) {
                    $errors[$field][] = ucfirst($field)." maksimal {$max} karakter.";
                }
            }
        }

        /**
         * helper: cek sometimes|required|numeric
         */
        function validateNumeric($request, $field, &$errors)
        {
            if ($request->has($field)) {
                if ($request->$field === null || !is_numeric($request->$field)) {
                    $errors[$field][] = ucfirst($field).' wajib berupa angka.';
                }
            }
        }

        /**
         * helper: cek sometimes|required|integer
         */
        function validateInteger($request, $field, &$errors)
        {
            if ($request->has($field)) {
                if ($request->$field === null || !filter_var($request->$field, FILTER_VALIDATE_INT)) {
                    $errors[$field][] = ucfirst($field).' wajib berupa bilangan bulat.';
                }
            }
        }

        /* ===== VALIDATION ===== */

        validateString($request, 'name', 255, $errors);
        validateString($request, 'category', 255, $errors);
        validateNumeric($request, 'price_origin', $errors);
        validateInteger($request, 'quantity', $errors);
        validateString($request, 'description', 255, $errors);

        /* nullable|numeric */
        if ($request->filled('price_discount') && !is_numeric($request->price_discount)) {
            $errors['price_discount'][] = 'Price discount harus berupa angka.';
        }

        /* nullable|image|mimes|max */
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $allowedMime = [
                'image/jpeg',
                'image/png',
                'image/jpg',
                'image/gif',
                'image/svg+xml'
            ];

            if (!in_array($image->getMimeType(), $allowedMime)) {
                $errors['image'][] = 'Format image tidak valid.';
            }

            if ($image->getSize() > 2048 * 1024) {
                $errors['image'][] = 'Ukuran image maksimal 2MB.';
            }
        }

        /* ===== RESPONSE ===== */

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $errors
            ], 422);
        }
        Log::info('Validation passed');


        $product->fill($request->except('image'));

        if ($request->hasFile('image')) {
            Log::info('Image file exists');
            // Delete old image if it exists
            if ($product->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
            }
            $path = $request->file('image')->store('images', 'public');
            $product->image = Storage::url($path);
        }

        $product->save();
        Log::info('Product saved');

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
        }
        $product->delete();
        return response()->json(null, 204);
    }

    public function addReview(Request $request) {
        return Review::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'description' => $request->description,
        ]);
    }
}
