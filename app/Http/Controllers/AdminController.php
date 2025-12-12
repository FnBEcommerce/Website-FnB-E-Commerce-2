<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function index() {
        return Inertia::render('admin/index');
    }

    public function customerManagement() {
        // --- 1. Fetch Basic Data ---
        $customers = User::where('role', 'user')
            ->with(['orders', 'reviews'])
            ->get();
        
        $products = Product::with(['orderDetails', 'reviews'])->get();
        $allOrders = Order::all();
        $currentMonth = Carbon::now()->month;

        // --- 2. Calculate Stats Data ---
        $totalPelanggan = $customers->count();
        $pesananBulanIni = Order::whereMonth('created_at', $currentMonth)->count();
        
        $activeThreshold = Carbon::now()->subMonths(3);
        $activeCustomersCount = Order::where('created_at', '>=', $activeThreshold)
            ->distinct('user_id')
            ->count('user_id');

        $avgTransaction = $allOrders->avg('order_total') ?? 0;

        $statsData = [
            [
                'title' => 'Total Pelanggan',
                'value' => (string) $totalPelanggan,
                'change' => '+0%', // Placeholder
            ],
            [
                'title' => 'Pesanan Bulan Ini',
                'value' => (string) $pesananBulanIni,
                'change' => 'Bulan ' . Carbon::now()->format('M'),
            ],
            [
                'title' => 'Pelanggan Aktif (3 Bln)',
                'value' => (string) $activeCustomersCount,
                'change' => 'Recency',
            ],
            [
                'title' => 'Rata-rata Transaksi',
                'value' => 'Rp ' . number_format($avgTransaction / 1000, 0) . 'K',
                'change' => 'Avg',
            ],
        ];

        // --- 3. Process Customers Data List ---
        $customersData = $customers->map(function ($user) {
            $totalSpent = $user->orders->sum('order_total');
            $totalOrders = $user->orders->count();
            $lastOrderDate = $user->orders->max('created_at');
            
            $status = 'Baru';
            if ($totalOrders > 5) $status = 'Setia';
            elseif ($totalOrders > 0) $status = 'Aktif';
            if ($lastOrderDate && Carbon::parse($lastOrderDate)->diffInMonths(now()) > 3) $status = 'Tidak Aktif';

            return [
                'id' => 'CST' . str_pad($user->id, 3, '0', STR_PAD_LEFT),
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone_number ?? '-',
                'area' => $user->city ?? 'Unknown',
                'totalOrders' => $totalOrders,
                'totalSpent' => (float) $totalSpent,
                'lastOrder' => $lastOrderDate ? Carbon::parse($lastOrderDate)->format('Y-m-d') : '-',
                'status' => $status,
                'avgRating' => round($user->reviews->avg('rating'), 1) ?? 0,
            ];
        })->values();

        // --- 4. Customer Segmentation ---
        $segmentationCounts = $customersData->groupBy('status')->map->count();
        $customerSegmentation = [
            [ 'name' => 'Pelanggan Setia', 'value' => $segmentationCounts['Setia'] ?? 0, 'color' => '#10b981' ],
            [ 'name' => 'Pelanggan Aktif', 'value' => $segmentationCounts['Aktif'] ?? 0, 'color' => '#3b82f6' ],
            [ 'name' => 'Pelanggan Baru', 'value' => $segmentationCounts['Baru'] ?? 0, 'color' => '#f59e0b' ],
            [ 'name' => 'Tidak Aktif', 'value' => $segmentationCounts['Tidak Aktif'] ?? 0, 'color' => '#ef4444' ],
        ];

        // --- 5. Monthly Customers ---
        $monthlyStats = Order::select(
            DB::raw('DATE_FORMAT(created_at, "%b") as month'),
            DB::raw('COUNT(DISTINCT user_id) as pelanggan'),
            DB::raw('COUNT(id) as pesanan')
        )
        ->whereYear('created_at', Carbon::now()->year)
        ->groupBy('month')
        ->orderBy(DB::raw('MIN(created_at)'), 'asc') 
        ->get();
        
        $monthlyCustomers = $monthlyStats->isEmpty() ? [] : $monthlyStats->toArray();

        // --- 6. Products Data ---
        $productsData = $products->map(function ($product) {
            $reviews = $product->reviews;
            $totalSold = $product->orderDetails->sum('quantity');
            return [
                'id' => 'PRD' . str_pad($product->id, 3, '0', STR_PAD_LEFT),
                'name' => $product->name,
                'category' => $product->category,
                'totalReviews' => $reviews->count(),
                'avgRating' => round($reviews->avg('rating'), 1) ?? 0,
                'rating5' => $reviews->where('rating', 5)->count(),
                'rating4' => $reviews->where('rating', 4)->count(),
                'rating3' => $reviews->where('rating', 3)->count(),
                'rating2' => $reviews->where('rating', 2)->count(),
                'rating1' => $reviews->where('rating', 1)->count(),
                'totalSold' => $totalSold,
                'trend' => $totalSold > 50 ? 'up' : 'down', // Simple trend logic
            ];
        })->values();

        // --- 7. Rating Distribution ---
        $allReviews = Review::all();
        $ratingDistribution = [
            [ 'rating' => '5 Bintang', 'count' => $allReviews->where('rating', 5)->count(), 'color' => '#10b981' ],
            [ 'rating' => '4 Bintang', 'count' => $allReviews->where('rating', 4)->count(), 'color' => '#3b82f6' ],
            [ 'rating' => '3 Bintang', 'count' => $allReviews->where('rating', 3)->count(), 'color' => '#f59e0b' ],
            [ 'rating' => '2 Bintang', 'count' => $allReviews->where('rating', 2)->count(), 'color' => '#f97316' ],
            [ 'rating' => '1 Bintang', 'count' => $allReviews->where('rating', 1)->count(), 'color' => '#ef4444' ],
        ];

        // --- 8. Area Data ---
        $areaData = $customersData->where('area', '!=', 'Unknown')->groupBy('area')->map(function ($group, $areaName) {
            return [
                'area' => $areaName,
                'totalCustomers' => $group->count(),
                'totalOrders' => $group->sum('totalOrders'),
                'totalRevenue' => $group->sum('totalSpent'),
                'avgOrderValue' => $group->sum('totalSpent') / ($group->sum('totalOrders') ?: 1),
                'topProduct' => '-', // Needs complex query
                'growth' => rand(5, 15), // Placeholder
            ];
        })->values();

        // --- 9. Monthly Area Data (Dynamic) ---
        // Define city abbreviations for cleaner column names
        $cityAbbreviations = [
            'Jakarta Selatan' => 'jaksel',
            'Jakarta Pusat' => 'jakpus',
            'Jakarta Barat' => 'jakbar',
            'Jakarta Timur' => 'jaktim',
            'Bandung' => 'bandung',
            'Surabaya' => 'surabaya',
            'Yogyakarta' => 'yogya',
            'Semarang' => 'semarang',
        ];

        // Get top 4 cities by revenue in the last 6 months
        $topCities = DB::table('orders')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select('users.city')
            ->whereNotNull('users.city')
            ->where('orders.created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('users.city')
            ->orderByRaw('SUM(orders.order_total) DESC')
            ->limit(4)
            ->pluck('city')
            ->toArray();

        // Build the dynamic select expressions for the pivot table
        $selects = [
            DB::raw('DATE_FORMAT(orders.created_at, "%b") as month'),
            DB::raw('MIN(orders.created_at) as month_order_key') // For sorting
        ];

        foreach ($topCities as $city) {
            // Use predefined abbreviation or generate one
            $alias = $cityAbbreviations[$city] ?? strtolower(substr(str_replace(' ', '', $city), 0, 6));
            // The value is divided by 1,000,000 to match the scale of the original static data (e.g., 3.2 for 3,200,000)
            $selects[] = DB::raw("SUM(CASE WHEN users.city = '{$city}' THEN orders.order_total / 1000000 ELSE 0 END) as {$alias}");
        }

        // Execute the final query if there are cities to report on
        if (!empty($topCities)) {
            $monthlyAreaData = DB::table('orders')
                ->join('users', 'orders.user_id', '=', 'users.id')
                ->select($selects)
                ->whereIn('users.city', $topCities)
                ->where('orders.created_at', '>=', Carbon::now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month_order_key')
                ->get()
                ->map(function($row) {
                    unset($row->month_order_key); // Clean up the sorting key
                    // Round the values to 2 decimal places
                    foreach ($row as $key => $value) {
                        if ($key !== 'month') {
                            $row->$key = round($value, 2);
                        }
                    }
                    return (array)$row;
                })
                ->toArray();
        } else {
            // Provide an empty array or a default structure if no data
            $monthlyAreaData = [];
        }

        $props = [
            'monthlyCustomers' => $monthlyCustomers,
            'customerSegmentation' => $customerSegmentation,
            'statsData' => $statsData,
            'customersData' => $customersData,
            'productsData' => $productsData,
            'ratingDistribution' => $ratingDistribution,
            'areaData' => $areaData,
            'monthlyAreaData' => $monthlyAreaData
        ];

        return Inertia::render('admin/customer-management', $props);
    }

    public function cashflowManagement() {
        $allOrders = Order::all();
        $totalRevenue = $allOrders->sum('order_total');
        $totalOrders = $allOrders->count();
        $avgOrder = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;

        $summaryData = [
            'totalRevenue' => $totalRevenue,
            'totalOrders' => $totalOrders,
            'averageOrder' => $avgOrder,
            'growth' => 0, // Placeholder
            'revenueGrowth' => 0, // Placeholder
            'ordersGrowth' => 0, // Placeholder
            'averageGrowth' => 0, // Placeholder
        ];

        $trendQuery = fn($format, $column) => Order::select(
                DB::raw("$format as name"),
                DB::raw('SUM(order_total) as pendapatan'),
                DB::raw('COUNT(id) as pesanan')
            )
            ->where('created_at', '>=', Carbon::now()->subYear())
            ->groupBy('name')
            ->orderBy($column)
            ->get();

        $trendDataPeriod = [
            'dailyTrendData' => $trendQuery('DATE_FORMAT(created_at, "%a")', 'DAYOFWEEK(created_at)'),
            'weeklyTrendData' => $trendQuery('DATE_FORMAT(created_at, "Week %v")', 'WEEK(created_at)'),
            'monthlyTrendData' => $trendQuery('DATE_FORMAT(created_at, "%b")', 'MONTH(created_at)'),
            'yearlyTrendData' => $trendQuery('YEAR(created_at)', 'YEAR(created_at)'),
        ];

        $categoryData = DB::table('order_details')
            ->join('products', 'order_details.product_id', '=', 'products.id')
            ->select(
                'products.category as name',
                DB::raw('SUM(order_details.price * order_details.quantity) as pendapatan'),
                DB::raw('COUNT(DISTINCT order_details.order_id) as pesanan')
            )
            ->groupBy('products.category')
            ->get();

        $props = [
            'summaryData' => $summaryData,
            'trendDataPeriod' => $trendDataPeriod,
            'categoryData' => $categoryData,
        ];

        return Inertia::render('admin/cashflow-management', $props);
    }

    public function productManagement() {
        // Assuming 'shopBranchProducts' is the pivot table/relation for stock and branch
        // And 'shopBranch' is the relation from pivot to the branch details
        $productsData = Product::with(['reviews', 'shopBranchProducts.shopBranch'])->get();

        $products = $productsData->map(function ($product) {
            // TODO: Ubah menjadi tidak selalu mengambil branch pertama
            $shopBranchProduct = $product->shopBranchProducts->first(); // Get first branch for simplicity
            
            return [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category,
                'price_origin' => $product->price_origin,
                'price_discount' => $product->price_discount ?? null,
                'stock' => $product->quantity ?? 0,
                'branch' => $shopBranchProduct->shopBranch->name ?? 'N/A',
                'image' => $product->image,
                'description' => $product->description,
                'rating' => round($product->reviews->avg('rating'), 1) ?? 0,
                'status' => ($product->quantity > 0) ? 'Aktif' : 'Tidak Aktif',
            ];
        });

        $props = [
            'products' => $products
        ];

        // return response()->json($products);

        return Inertia::render('admin/product-management', $props);
    }
}