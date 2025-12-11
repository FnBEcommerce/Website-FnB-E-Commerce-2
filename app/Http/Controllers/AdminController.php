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
            // [
            //     'area' => 'Bandung',
            //     'totalCustomers' => 478,
            //     'totalOrders' => 1890,
            //     'totalRevenue' => 25600000,
            //     'avgOrderValue' => 135449,
            //     'topProduct' => 'Nasi Goreng Spesial',
            //     'growth' => 11.2,
            // ],
            // [
            //     'area' => 'Surabaya',
            //     'totalCustomers' => 423,
            //     'totalOrders' => 1650,
            //     'totalRevenue' => 22100000,
            //     'avgOrderValue' => 133939,
            //     'topProduct' => 'Sate Ayam',
            //     'growth' => 9.8,
            // ],
            // [
            //     'area' => 'Yogyakarta',
            //     'totalCustomers' => 356,
            //     'totalOrders' => 1420,
            //     'totalRevenue' => 18900000,
            //     'avgOrderValue' => 133099,
            //     'topProduct' => 'Mie Goreng',
            //     'growth' => 7.5,
            // ],
            // [
            //     'area' => 'Semarang',
            //     'totalCustomers' => 289,
            //     'totalOrders' => 1150,
            //     'totalRevenue' => 15400000,
            //     'avgOrderValue' => 133913,
            //     'topProduct' => 'Ayam Geprek',
            //     'growth' => 6.3,
            // ],
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
        return Inertia::render('admin/cashflow-management');
    }
    public function productManagement() {
        return Inertia::render('admin/product-management');
    }
}
