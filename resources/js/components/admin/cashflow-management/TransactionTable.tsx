import { ArrowUpDown, Download, Search } from 'lucide-react';
import { useState } from 'react';

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface Transaction {
    id: string;
    date: string;
    type: 'income' | 'expense';
    category: string;
    description: string;
    branch: string;
    amount: number;
    paymentMethod: string;
}

interface TransactionTableProps {
    period: PeriodType;
}

export function TransactionTable({ period }: TransactionTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock transactions data
    const transactions: Transaction[] = [
        {
            id: 'TRX001',
            date: '2025-12-11 14:30',
            type: 'income',
            category: 'Makanan',
            description: 'Pesanan #1234 - Nasi Goreng Special',
            branch: 'Cabang Jakarta Pusat',
            amount: 85000,
            paymentMethod: 'Transfer',
        },
        {
            id: 'TRX002',
            date: '2025-12-11 13:15',
            type: 'income',
            category: 'Minuman',
            description: 'Pesanan #1233 - Es Teh Manis x3',
            branch: 'Cabang Jakarta Selatan',
            amount: 30000,
            paymentMethod: 'COD',
        },
        {
            id: 'TRX003',
            date: '2025-12-11 12:45',
            type: 'expense',
            category: 'Bahan Baku',
            description: 'Pembelian sayuran segar',
            branch: 'Cabang Jakarta Pusat',
            amount: 450000,
            paymentMethod: 'Transfer',
        },
        {
            id: 'TRX004',
            date: '2025-12-11 11:20',
            type: 'income',
            category: 'Paket',
            description: 'Pesanan #1232 - Paket Hemat A',
            branch: 'Cabang Jakarta Barat',
            amount: 125000,
            paymentMethod: 'Transfer',
        },
        {
            id: 'TRX005',
            date: '2025-12-11 10:30',
            type: 'expense',
            category: 'Operasional',
            description: 'Biaya listrik bulan Desember',
            branch: 'Cabang Jakarta Pusat',
            amount: 850000,
            paymentMethod: 'Transfer',
        },
        {
            id: 'TRX006',
            date: '2025-12-10 16:45',
            type: 'income',
            category: 'Makanan',
            description: 'Pesanan #1231 - Ayam Bakar',
            branch: 'Cabang Jakarta Timur',
            amount: 95000,
            paymentMethod: 'COD',
        },
        {
            id: 'TRX007',
            date: '2025-12-10 15:30',
            type: 'income',
            category: 'Snack',
            description: 'Pesanan #1230 - Pisang Goreng x2',
            branch: 'Cabang Jakarta Selatan',
            amount: 40000,
            paymentMethod: 'Transfer',
        },
        {
            id: 'TRX008',
            date: '2025-12-10 14:15',
            type: 'expense',
            category: 'Gaji',
            description: 'Gaji karyawan periode Desember',
            branch: 'Semua Cabang',
            amount: 15000000,
            paymentMethod: 'Transfer',
        },
        {
            id: 'TRX009',
            date: '2025-12-10 13:00',
            type: 'income',
            category: 'Minuman',
            description: 'Pesanan #1229 - Kopi Susu',
            branch: 'Cabang Jakarta Pusat',
            amount: 25000,
            paymentMethod: 'COD',
        },
        {
            id: 'TRX010',
            date: '2025-12-10 12:30',
            type: 'income',
            category: 'Makanan',
            description: 'Pesanan #1228 - Sate Ayam',
            branch: 'Cabang Jakarta Barat',
            amount: 75000,
            paymentMethod: 'Transfer',
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

    return (
        <div className="rounded-lg border border-gray-200 bg-white">
            {/* Table Header */}
            <div className="border-b border-gray-200 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-gray-900">Detail Transaksi</h3>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={handleExport}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                            <Download className="h-5 w-5" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-700">
                                <div className="flex items-center gap-2">
                                    ID Transaksi
                                    <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                <div className="flex items-center gap-2">
                                    Tanggal & Waktu
                                    <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Tipe
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Kategori
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Deskripsi
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Cabang
                            </th>
                            <th className="px-6 py-3 text-left text-gray-700">
                                Metode Bayar
                            </th>
                            <th className="px-6 py-3 text-right text-gray-700">
                                <div className="flex items-center justify-end gap-2">
                                    Jumlah
                                    <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedTransactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 text-gray-900">
                                    {transaction.id}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.date}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex rounded px-2 py-1 text-white ${
                                            transaction.type === 'income'
                                                ? 'bg-green-600'
                                                : 'bg-red-600'
                                        }`}
                                    >
                                        {transaction.type === 'income'
                                            ? 'Pemasukan'
                                            : 'Pengeluaran'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.category}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.description}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.branch}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {transaction.paymentMethod}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span
                                        className={
                                            transaction.type === 'income'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }
                                    >
                                        {transaction.type === 'income'
                                            ? '+'
                                            : '-'}
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
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
                        className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Sebelumnya
                    </button>
                    <div className="flex gap-1">
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-lg px-4 py-2 ${
                                    currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-300 hover:bg-gray-50'
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
                        className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    );
}
