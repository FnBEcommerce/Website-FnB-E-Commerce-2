import { PeriodType } from '@/pages/admin/cashflow-management';
import { ArrowUpDown, Download, Search } from 'lucide-react';
import { useState } from 'react';

interface Transaction {
    id: string;
    date: string;
    category: string;
    description: string;
    branch: string;
    amount: number;
    paymentMethod: string;
    customer: string;
}

interface TransactionTableProps {
    period: PeriodType;
}

export function TransactionTable({ period }: TransactionTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock transactions data - only income
    const transactions: Transaction[] = [
        {
            id: 'TRX001',
            date: '2025-12-11 14:30',
            category: 'Makanan',
            description: 'Pesanan #1234 - Nasi Goreng Special',
            branch: 'Cabang Jakarta Pusat',
            amount: 85000,
            paymentMethod: 'Transfer',
            customer: 'Ahmad Rizki',
        },
        {
            id: 'TRX002',
            date: '2025-12-11 13:15',
            category: 'Minuman',
            description: 'Pesanan #1233 - Es Teh Manis x3',
            branch: 'Cabang Jakarta Selatan',
            amount: 30000,
            paymentMethod: 'COD',
            customer: 'Siti Nurhaliza',
        },
        {
            id: 'TRX003',
            date: '2025-12-11 11:20',
            category: 'Paket',
            description: 'Pesanan #1232 - Paket Hemat A',
            branch: 'Cabang Jakarta Barat',
            amount: 125000,
            paymentMethod: 'Transfer',
            customer: 'Budi Santoso',
        },
        {
            id: 'TRX004',
            date: '2025-12-10 16:45',
            category: 'Makanan',
            description: 'Pesanan #1231 - Ayam Bakar',
            branch: 'Cabang Jakarta Timur',
            amount: 95000,
            paymentMethod: 'COD',
            customer: 'Dewi Lestari',
        },
        {
            id: 'TRX005',
            date: '2025-12-10 15:30',
            category: 'Snack',
            description: 'Pesanan #1230 - Pisang Goreng x2',
            branch: 'Cabang Jakarta Selatan',
            amount: 40000,
            paymentMethod: 'Transfer',
            customer: 'Andi Wijaya',
        },
        {
            id: 'TRX006',
            date: '2025-12-10 13:00',
            category: 'Minuman',
            description: 'Pesanan #1229 - Kopi Susu',
            branch: 'Cabang Jakarta Pusat',
            amount: 25000,
            paymentMethod: 'COD',
            customer: 'Rina Hartati',
        },
        {
            id: 'TRX007',
            date: '2025-12-10 12:30',
            category: 'Makanan',
            description: 'Pesanan #1228 - Sate Ayam',
            branch: 'Cabang Jakarta Barat',
            amount: 75000,
            paymentMethod: 'Transfer',
            customer: 'Joko Widodo',
        },
        {
            id: 'TRX008',
            date: '2025-12-09 16:20',
            category: 'Paket',
            description: 'Pesanan #1227 - Paket Keluarga',
            branch: 'Cabang Jakarta Selatan',
            amount: 185000,
            paymentMethod: 'Transfer',
            customer: 'Mega Putri',
        },
        {
            id: 'TRX009',
            date: '2025-12-09 14:45',
            category: 'Makanan',
            description: 'Pesanan #1226 - Nasi Uduk',
            branch: 'Cabang Jakarta Timur',
            amount: 45000,
            paymentMethod: 'COD',
            customer: 'Arif Rahman',
        },
        {
            id: 'TRX010',
            date: '2025-12-09 13:15',
            category: 'Minuman',
            description: 'Pesanan #1225 - Jus Alpukat x2',
            branch: 'Cabang Jakarta Pusat',
            amount: 50000,
            paymentMethod: 'Transfer',
            customer: 'Lina Marlina',
        },
    ];

    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.branch
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.category
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.customer
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handleExport = () => {
        // In real app, this would export to CSV/Excel
        alert('Export data ke CSV');
    };

    const totalRevenue = filteredTransactions.reduce(
        (sum, t) => sum + t.amount,
        0,
    );

    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            {/* Table Header */}
            <div className="border-b p-6">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-gray-900">Detail Transaksi</h3>
                        <p className="mt-1 text-gray-500">
                            Total {filteredTransactions.length} transaksi •{' '}
                            {formatCurrency(totalRevenue)}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border py-2 pr-4 pl-9 focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none sm:w-64"
                            />
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={handleExport}
                            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-emerald-700"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-700">
                                <div className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
                                    ID Transaksi
                                    <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                <div className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
                                    Tanggal & Waktu
                                    <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Kategori
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Deskripsi
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Pelanggan
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Cabang
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Metode Bayar
                            </th>
                            <th className="px-6 py-3 text-right text-gray-700">
                                <div className="flex cursor-pointer items-center justify-end gap-2 hover:text-gray-900">
                                    Jumlah
                                    <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedTransactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="transition-colors hover:bg-gray-50/50"
                            >
                                <td className="px-6 py-4">
                                    <span className="text-gray-900">
                                        {transaction.id}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.date}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-blue-700">
                                        {transaction.category}
                                    </span>
                                </td>
                                <td className="max-w-xs truncate px-6 py-4 text-gray-600">
                                    {transaction.description}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.customer}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.branch}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-md px-2.5 py-1 ${
                                            transaction.paymentMethod ===
                                            'Transfer'
                                                ? 'border border-violet-100 bg-violet-50 text-violet-700'
                                                : 'border border-amber-100 bg-amber-50 text-amber-700'
                                        }`}
                                    >
                                        {transaction.paymentMethod}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-emerald-700">
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t bg-gray-50/30 px-6 py-4">
                <p className="text-gray-600">
                    Menampilkan {startIndex + 1} -{' '}
                    {Math.min(
                        startIndex + itemsPerPage,
                        filteredTransactions.length,
                    )}{' '}
                    dari {filteredTransactions.length} transaksi
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="rounded-lg border px-4 py-2 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Sebelumnya
                    </button>
                    <div className="flex gap-1">
                        {Array.from(
                            { length: Math.min(totalPages, 5) },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-lg px-4 py-2 transition-colors ${
                                    currentPage === page
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'border hover:bg-white'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages),
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-lg border px-4 py-2 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    );
}
