<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index() {
        return Inertia::render('admin/index');
    }

    public function customerManagement() {
        // $customers = User::with("orders")->where('role', 'customer')->get();
        // $orders = Order::where('date_created', '>=', now()->subMonth());

        $monthlyCustomers = [
            [ 'month' => 'Jan', 'pelanggan' => 245, 'pesanan' => 580 ],
            [ 'month' => 'Feb', 'pelanggan' => 289, 'pesanan' => 645 ],
            [ 'month' => 'Mar', 'pelanggan' => 312, 'pesanan' => 720 ],
            [ 'month' => 'Apr', 'pelanggan' => 356, 'pesanan' => 810 ],
            [ 'month' => 'Mei', 'pelanggan' => 398, 'pesanan' => 920 ],
            [ 'month' => 'Jun', 'pelanggan' => 425, 'pesanan' => 1050 ],
        ];

        $customerSegmentation = [
            [ 'name' => 'Pelanggan Setia', 'value' => 45, 'color' => '#10b981' ],
            [ 'name' => 'Pelanggan Aktif', 'value' => 30, 'color' => '#3b82f6' ],
            [ 'name' => 'Pelanggan Baru', 'value' => 15, 'color' => '#f59e0b' ],
            [ 'name' => 'Tidak Aktif', 'value' => 10, 'color' => '#ef4444' ],
        ];

        $statsData = [
            [
                'title' => 'Total Pelanggan',
                'value' => '100',
                'change' => '+12.5%',
            ],
            [
                'title' => 'Pesanan Bulan Ini',
                'value' => '20',
                'change' => '+8.2%',
            ],
            [
                'title' => 'Pelanggan Aktif',
                'value' => '1,892',
                'change' => '+15.3%',
            ],
            [
                'title' => 'Rata-rata Transaksi',
                'value' => 'Rp 125K',
                'change' => '+5.1%',
            ],
        ];

        $customersData = [
            [
                'id' => 'CST001',
                'name' => 'Budi Santoso',
                'email' => 'budi.santoso@email.com',
                'phone' => '08123456789',
                'area' => 'Jakarta Selatan',
                'totalOrders' => 24,
                'totalSpent' => 2850000,
                'lastOrder' => '2024-11-18',
                'status' => 'Setia',
                'avgRating' => 4.8,
            ],
            [
                'id' => 'CST002',
                'name' => 'Siti Nurhaliza',
                'email' => 'siti.nur@email.com',
                'phone' => '08234567890',
                'area' => 'Bandung',
                    'totalOrders' => 15,
                'totalSpent' => 1750000,
                'lastOrder' => '2024-11-19',
                'status' => 'Aktif',
                'avgRating' => 4.5,
            ],
            [
                'id' => 'CST003',
                'name' => 'Ahmad Wijaya',
                'email' => 'ahmad.w@email.com',
                'phone' => '08345678901',
                'area' => 'Jakarta Pusat',
                'totalOrders' => 31,
                'totalSpent' => 3920000,
                'lastOrder' => '2024-11-20',
                'status' => 'Setia',
                'avgRating' => 4.9,
            ],
            [
                'id' => 'CST004',
                'name' => 'Dewi Lestari',
                'email' => 'dewi.lestari@email.com',
                'phone' => '08456789012',
                'area' => 'Surabaya',
                'totalOrders' => 8,
                'totalSpent' => 920000,
                'lastOrder' => '2024-11-15',
                'status' => 'Aktif',
                'avgRating' => 4.3,
            ],
            [
                'id' => 'CST005',
                'name' => 'Rudi Hartono',
                'email' => 'rudi.h@email.com',
                'phone' => '08567890123',
                'area' => 'Jakarta Barat',
                'totalOrders' => 3,
                'totalSpent' => 285000,
                'lastOrder' => '2024-11-20',
                'status' => 'Baru',
                'avgRating' => 4.0,
            ],
            [
                'id' => 'CST006',
                'name' => 'Rina Kusuma',
                'email' => 'rina.k@email.com',
                'phone' => '08678901234',
                'area' => 'Yogyakarta',
                'totalOrders' => 18,
                'totalSpent' => 2100000,
                'lastOrder' => '2024-11-17',
                'status' => 'Setia',
                'avgRating' => 4.7,
            ],
            [
                'id' => 'CST007',
                'name' => 'Fajar Nugroho',
                'email' => 'fajar.n@email.com',
                'phone' => '08789012345',
                'area' => 'Jakarta Timur',
                'totalOrders' => 12,
                'totalSpent' => 1450000,
                'lastOrder' => '2024-11-19',
                'status' => 'Aktif',
                'avgRating' => 4.4,
            ],
            [
                'id' => 'CST008',
                'name' => 'Linda Wijayanti',
                'email' => 'linda.w@email.com',
                'phone' => '08890123456',
                'area' => 'Semarang',
                'totalOrders' => 6,
                'totalSpent' => 720000,
                'lastOrder' => '2024-10-28',
                'status' => 'Tidak Aktif',
                'avgRating' => 3.9,
            ],
        ];

        $productsData = [
            [
                'id' => 'PRD001',
                'name' => 'Nasi Goreng Spesial',
                'category' => 'Makanan',
                'totalReviews' => 345,
                'avgRating' => 4.8,
                'rating5' => 280,
                'rating4' => 45,
                'rating3' => 15,
                'rating2' => 3,
                'rating1' => 2,
                'totalSold' => 1250,
                'trend' => 'up',
            ],
            [
                'id' => 'PRD002',
                'name' => 'Es Teh Manis',
                'category' => 'Minuman',
                'totalReviews' => 520,
                'avgRating' => 4.5,
                'rating5' => 350,
                'rating4' => 120,
                'rating3' => 35,
                'rating2' => 10,
                'rating1' => 5,
                'totalSold' => 2100,
                'trend' => 'up',
            ],
            [
                'id' => 'PRD003',
                'name' => 'Ayam Geprek',
                'category' => 'Makanan',
                'totalReviews' => 412,
                'avgRating' => 4.7,
                'rating5' => 320,
                'rating4' => 68,
                'rating3' => 18,
                'rating2' => 4,
                'rating1' => 2,
                'totalSold' => 980,
                'trend' => 'up',
            ],
            [
                'id' => 'PRD004',
                'name' => 'Kopi Latte Premium',
                'category' => 'Minuman',
                'totalReviews' => 289,
                'avgRating' => 4.6,
                'rating5' => 210,
                'rating4' => 58,
                'rating3' => 15,
                'rating2' => 4,
                'rating1' => 2,
                'totalSold' => 750,
                'trend' => 'up',
            ],
            [
                'id' => 'PRD005',
                'name' => 'Mie Goreng',
                'category' => 'Makanan',
                'totalReviews' => 198,
                'avgRating' => 4.2,
                'rating5' => 110,
                'rating4' => 55,
                'rating3' => 25,
                'rating2' => 6,
                'rating1' => 2,
                'totalSold' => 560,
                'trend' => 'down',
            ],
            [
                'id' => 'PRD006',
                'name' => 'Jus Alpukat',
                'category' => 'Minuman',
                'totalReviews' => 167,
                'avgRating' => 4.4,
                'rating5' => 105,
                'rating4' => 42,
                'rating3' => 15,
                'rating2' => 3,
                'rating1' => 2,
                'totalSold' => 420,
                'trend' => 'up',
            ],
            [
                'id' => 'PRD007',
                'name' => 'Sate Ayam',
                'category' => 'Makanan',
                'totalReviews' => 234,
                'avgRating' => 4.3,
                'rating5' => 145,
                'rating4' => 62,
                'rating3' => 20,
                'rating2' => 5,
                'rating1' => 2,
                'totalSold' => 680,
                'trend' => 'down',
            ],
            [
                'id' => 'PRD008',
                'name' => 'Es Jeruk',
                'category' => 'Minuman',
                'totalReviews' => 389,
                'avgRating' => 4.6,
                'rating5' => 280,
                'rating4' => 82,
                'rating3' => 20,
                'rating2' => 5,
                'rating1' => 2,
                'totalSold' => 1150,
                'trend' => 'up',
            ],
        ];

        $ratingDistribution = [
            [ 'rating' => '5 Bintang', 'count' => 1800, 'color' => '#10b981' ],
            [ 'rating' => '4 Bintang', 'count' => 532, 'color' => '#3b82f6' ],
            [ 'rating' => '3 Bintang', 'count' => 163, 'color' => '#f59e0b' ],
            [ 'rating' => '2 Bintang', 'count' => 40, 'color' => '#f97316' ],
            [ 'rating' => '1 Bintang', 'count' => 19, 'color' => '#ef4444' ],
        ];

        $areaData = [
            [
                'area' => 'Jakarta Selatan',
                'totalCustomers' => 845,
                'totalOrders' => 3250,
                'totalRevenue' => 42500000,
                'avgOrderValue' => 130769,
                'topProduct' => 'Nasi Goreng Spesial',
                'growth' => 15.3,
            ],
            [
                'area' => 'Jakarta Pusat',
                'totalCustomers' => 698,
                'totalOrders' => 2780,
                'totalRevenue' => 38200000,
                'avgOrderValue' => 137410,
                'topProduct' => 'Ayam Geprek',
                'growth' => 12.8,
            ],
            [
                'area' => 'Jakarta Barat',
                'totalCustomers' => 612,
                'totalOrders' => 2450,
                'totalRevenue' => 32800000,
                'avgOrderValue' => 133878,
                'topProduct' => 'Kopi Latte Premium',
                'growth' => 10.5,
            ],
            [
                'area' => 'Jakarta Timur',
                'totalCustomers' => 534,
                'totalOrders' => 2120,
                'totalRevenue' => 28500000,
                'avgOrderValue' => 134433,
                'topProduct' => 'Es Teh Manis',
                'growth' => 8.7,
            ],
            [
                'area' => 'Bandung',
                'totalCustomers' => 478,
                'totalOrders' => 1890,
                'totalRevenue' => 25600000,
                'avgOrderValue' => 135449,
                'topProduct' => 'Nasi Goreng Spesial',
                'growth' => 11.2,
            ],
            [
                'area' => 'Surabaya',
                'totalCustomers' => 423,
                'totalOrders' => 1650,
                'totalRevenue' => 22100000,
                'avgOrderValue' => 133939,
                'topProduct' => 'Sate Ayam',
                'growth' => 9.8,
            ],
            [
                'area' => 'Yogyakarta',
                'totalCustomers' => 356,
                'totalOrders' => 1420,
                'totalRevenue' => 18900000,
                'avgOrderValue' => 133099,
                'topProduct' => 'Mie Goreng',
                'growth' => 7.5,
            ],
            [
                'area' => 'Semarang',
                'totalCustomers' => 289,
                'totalOrders' => 1150,
                'totalRevenue' => 15400000,
                'avgOrderValue' => 133913,
                'topProduct' => 'Ayam Geprek',
                'growth' => 6.3,
            ],
        ];

        $monthlyAreaData = [
            [ 'month' => 'Jan', 'jaksel' => 3.2, 'jakpus' => 2.8, 'jakbar' => 2.4, 'jaktim' => 2.0 ],
            [ 'month' => 'Feb', 'jaksel' => 3.5, 'jakpus' => 3.0, 'jakbar' => 2.6, 'jaktim' => 2.2 ],
            [ 'month' => 'Mar', 'jaksel' => 3.8, 'jakpus' => 3.3, 'jakbar' => 2.8, 'jaktim' => 2.4 ],
            [ 'month' => 'Apr', 'jaksel' => 4.0, 'jakpus' => 3.5, 'jakbar' => 3.0, 'jaktim' => 2.6 ],
            [ 'month' => 'Mei', 'jaksel' => 4.2, 'jakpus' => 3.7, 'jakbar' => 3.2, 'jaktim' => 2.7 ],
            [ 'month' => 'Jun', 'jaksel' => 4.5, 'jakpus' => 3.9, 'jakbar' => 3.4, 'jaktim' => 2.9 ],
        ];

        
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
        $summaryData = [
            'totalRevenue' => 125750000,
            'totalOrders' => 1247,
            'averageOrder' => 100843,
            'growth' => 12.5,
            'revenueGrowth' => 15.2,
            'ordersGrowth' => 8.3,
            'averageGrowth' => 6.4,
        ];

        $dailyTrendData = [
            ['name' => 'Sen', 'pendapatan' => 95000000, 'pesanan' => 890],
            ['name' => 'Sel', 'pendapatan' => 88000000, 'pesanan' => 825],
            ['name' => 'Rab', 'pendapatan' => 102000000, 'pesanan' => 950],
            ['name' => 'Kam', 'pendapatan' => 118000000, 'pesanan' => 1100],
            ['name' => 'Jum', 'pendapatan' => 125000000, 'pesanan' => 1180],
            ['name' => 'Sab', 'pendapatan' => 135000000, 'pesanan' => 1280],
        ];

        $weeklyTrendData = [
            ['name' => '1-7 Jan', 'pendapatan' => 650000000, 'pesanan' => 6200],
            ['name' => '8-14 Jan', 'pendapatan' => 680000000, 'pesanan' => 6450],
            ['name' => '15-21 Jan', 'pendapatan' => 750000000, 'pesanan' => 7100],
            ['name' => '22-28 Jan', 'pendapatan' => 820000000, 'pesanan' => 7800],
            ['name' => '29-4 Feb', 'pendapatan' => 890000000, 'pesanan' => 8500],
            ['name' => '5-12 Feb', 'pendapatan' => 910000000, 'pesanan' => 8700],
        ];

        $monthlyTrendData = [
            ['name' => 'Jan', 'pendapatan' => 2850000000, 'pesanan' => 26700],
            ['name' => 'Feb', 'pendapatan' => 2640000000, 'pesanan' => 24500], // Feb hari lebih sedikit
            ['name' => 'Mar', 'pendapatan' => 3060000000, 'pesanan' => 28900],
            ['name' => 'Apr', 'pendapatan' => 3250000000, 'pesanan' => 30500],
            ['name' => 'Mei', 'pendapatan' => 3450000000, 'pesanan' => 32100],
            ['name' => 'Jun', 'pendapatan' => 3600000000, 'pesanan' => 34000],
        ];

        $yearlyTrendData = [
            ['name' => '2019', 'pendapatan' => 28500000000, 'pesanan' => 270000],
            ['name' => '2020', 'pendapatan' => 24000000000, 'pesanan' => 220000], // Dip pandemi
            ['name' => '2021', 'pendapatan' => 32000000000, 'pesanan' => 295000],
            ['name' => '2022', 'pendapatan' => 38000000000, 'pesanan' => 350000],
            ['name' => '2023', 'pendapatan' => 42500000000, 'pesanan' => 390000],
            ['name' => '2024', 'pendapatan' => 46000000000, 'pesanan' => 425000],
        ];

        $trendDataPeriod = [
            'dailyTrendData' => $dailyTrendData,
            'weeklyTrendData' => $weeklyTrendData,
            'monthlyTrendData' => $monthlyTrendData,
            'yearlyTrendData' => $yearlyTrendData,
        ];

        $categoryData = [
            ['name' => 'Makanan', 'pendapatan' => 78000000, 'pesanan' => 650],
            ['name' => 'Minuman', 'pendapatan' => 32000000, 'pesanan' => 420],
            ['name' => 'Snack', 'pendapatan' => 15750000, 'pesanan' => 180],
        ];

        $props = [
            'summaryData' => $summaryData,
            'trendDataPeriod' => $trendDataPeriod,
            'categoryData' => $categoryData,
        ];

        return Inertia::render('admin/cashflow-management', $props);
    }
    public function productManagement() {
        return Inertia::render('admin/product-management');
    }
}


// AdminController.php

/* namespace App\Http\Controllers;

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
        // Ambil data pelanggan beserta relasi order dan review
        $customers = User::where('role', 'customer')
            ->with(['orders', 'reviews'])
            ->get();
        
        $products = Product::with(['orderDetails', 'reviews'])->get();
        $allOrders = Order::all();
        $currentMonth = Carbon::now()->month;

        // --- 2. Calculate Stats Data (Kartu Atas) ---
        $totalPelanggan = $customers->count();
        $pesananBulanIni = Order::whereMonth('date_created', $currentMonth)->count();
        
        // Pelanggan Aktif: Yang pernah order dalam 3 bulan terakhir
        $activeThreshold = Carbon::now()->subMonths(3);
        $activeCustomersCount = Order::where('date_created', '>=', $activeThreshold)
            ->distinct('user_id')
            ->count('user_id');

        $avgTransaction = $allOrders->avg('order_total') ?? 0;

        $statsData = [
            [
                'title' => 'Total Pelanggan',
                'value' => (string) $totalPelanggan,
                'change' => '+0%', // Perlu logika history jika ingin dinamis
            ],
            [
                'title' => 'Pesanan Bulan Ini',
                'value' => (string) $pesananBulanIni,
                'change' => 'Bulan ' . Carbon::now()->format('M'),
            ],
            [
                'title' => 'Pelanggan Aktif (3 Bulan)',
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
            $lastOrderDate = $user->orders->max('date_created');
            
            // Logika Status Sederhana
            $status = 'Baru';
            if ($totalOrders > 5) $status = 'Setia';
            elseif ($totalOrders > 0) $status = 'Aktif';
            if ($lastOrderDate && Carbon::parse($lastOrderDate)->diffInMonths(now()) > 3) $status = 'Tidak Aktif';

            // Ekstrak Area dari Alamat (Mengambil kata terakhir setelah koma, misal: Jakarta Pusat)
            $area = 'Unknown';
            if ($user->address_1) {
                $parts = explode(',', $user->address_1);
                $area = trim(end($parts));
            }

            return [
                'id' => 'CST' . str_pad($user->user_id, 3, '0', STR_PAD_LEFT),
                'name' => $user->username, // Menggunakan username karena tabel user tidak ada kolom name
                'email' => $user->username . '@example.com', // Placeholder krn tabel user tidak ada email
                'phone' => '-', // Placeholder krn tabel user tidak ada no hp
                'area' => $area,
                'totalOrders' => $totalOrders,
                'totalSpent' => (float) $totalSpent,
                'lastOrder' => $lastOrderDate ? Carbon::parse($lastOrderDate)->format('Y-m-d') : '-',
                'status' => $status,
                'avgRating' => round($user->reviews->avg('rating'), 1) ?? 0,
            ];
        })->values();

        // --- 4. Customer Segmentation (Chart Pie) ---
        $segmentationCounts = $customersData->groupBy('status')->map->count();
        $customerSegmentation = [
            [ 'name' => 'Pelanggan Setia', 'value' => $segmentationCounts['Setia'] ?? 0, 'color' => '#10b981' ],
            [ 'name' => 'Pelanggan Aktif', 'value' => $segmentationCounts['Aktif'] ?? 0, 'color' => '#3b82f6' ],
            [ 'name' => 'Pelanggan Baru', 'value' => $segmentationCounts['Baru'] ?? 0, 'color' => '#f59e0b' ],
            [ 'name' => 'Tidak Aktif', 'value' => $segmentationCounts['Tidak Aktif'] ?? 0, 'color' => '#ef4444' ],
        ];

        // --- 5. Monthly Customers (Chart Line) ---
        $monthlyStats = Order::select(
            DB::raw('DATE_FORMAT(date_created, "%b") as month'),
            DB::raw('COUNT(DISTINCT user_id) as pelanggan'),
            DB::raw('COUNT(order_id) as pesanan')
        )
        ->whereYear('date_created', Carbon::now()->year)
        ->groupBy('month')
        // PERBAIKAN DI SINI: Gunakan MIN() agar lolos validasi full_group_by
        ->orderBy(DB::raw('MIN(date_created)'), 'asc') 
        ->get();

        // dd($monthlyStats);
        
        // Jika data kosong, gunakan dummy array struktur agar chart tidak error
        $monthlyCustomers = $monthlyStats->isEmpty() ? [] : $monthlyStats->toArray();

        // --- 6. Products Data ---
        $productsData = $products->map(function ($product) {
            $totalSold = $product->orderDetails->sum('orderdetail_quantity');
            $reviews = $product->reviews;
            
            return [
                'id' => 'PRD' . str_pad($product->product_id, 3, '0', STR_PAD_LEFT),
                'name' => $product->product_name,
                'category' => $product->product_category,
                'totalReviews' => $reviews->count(),
                'avgRating' => round($reviews->avg('rating'), 1) ?? 0,
                'rating5' => $reviews->where('rating', 5)->count(),
                'rating4' => $reviews->where('rating', 4)->count(),
                'rating3' => $reviews->where('rating', 3)->count(),
                'rating2' => $reviews->where('rating', 2)->count(),
                'rating1' => $reviews->where('rating', 1)->count(),
                'totalSold' => $totalSold,
                'trend' => $totalSold > 10 ? 'up' : 'down', // Logika simpel trend
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

        // --- 8. Area Data (Group by inferred city from address) ---
        $areaData = $customersData->groupBy('area')->map(function ($group, $areaName) {
            return [
                'area' => $areaName,
                'totalCustomers' => $group->count(),
                'totalOrders' => $group->sum('totalOrders'),
                'totalRevenue' => $group->sum('totalSpent'),
                'avgOrderValue' => $group->avg('totalSpent'), // Simplifikasi
                'topProduct' => '-', // Butuh query kompleks untuk ini
                'growth' => rand(1, 15), // Placeholder/Mock
            ];
        })->values();

        // Placeholder untuk Monthly Area Data (memerlukan query cross-tabulation yang kompleks)
        $monthlyAreaData = [
            [ 'month' => 'Jan', 'jaksel' => 3.2, 'jakpus' => 2.8, 'jakbar' => 2.4, 'jaktim' => 2.0 ],
            // ... biarkan statis atau buat query group by month & area
        ];

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

        dd($props);

        return Inertia::render('admin/customer-management', $props);
    }

    public function cashflowManagement() {
        return Inertia::render('admin/cashflow-management');
    }
    public function productManagement() {
        return Inertia::render('admin/product-management');
    }
} */

