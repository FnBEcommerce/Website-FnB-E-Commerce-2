
import { ArrowUpDown, Download, Search } from 'lucide-react';
import { useState } from 'react';

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

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

export function TransactionTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock transactions data - only income
    const transactions: Transaction[] = [
    {
        id: "TRX001",
        date: "2025-12-11 14:30",
        category: "Makanan",
        description: "Pesanan #1234 - Nasi Goreng Special",
        branch: "Cabang Jakarta Pusat",
        amount: 85000,
        paymentMethod: "Transfer",
        customer: "Ahmad Rizki",
    },
    {
        id: "TRX002",
        date: "2025-12-11 13:15",
        category: "Minuman",
        description: "Pesanan #1233 - Es Teh Manis x3",
        branch: "Cabang Jakarta Selatan",
        amount: 30000,
        paymentMethod: "COD",
        customer: "Siti Nurhaliza",
    },
    {
        id: "TRX003",
        date: "2025-12-11 11:20",
        category: "Makanan", // paket diubah jadi makanan
        description: "Pesanan #1232 - Paket Hemat A",
        branch: "Cabang Jakarta Barat",
        amount: 125000,
        paymentMethod: "Transfer",
        customer: "Budi Santoso",
    },
    {
        id: "TRX004",
        date: "2025-12-10 16:45",
        category: "Makanan",
        description: "Pesanan #1231 - Ayam Bakar",
        branch: "Cabang Jakarta Timur",
        amount: 95000,
        paymentMethod: "COD",
        customer: "Dewi Lestari",
    },
    {
        id: "TRX005",
        date: "2025-12-10 15:30",
        category: "Makanan", // Snack -> Makanan
        description: "Pesanan #1230 - Pisang Goreng x2",
        branch: "Cabang Jakarta Selatan",
        amount: 40000,
        paymentMethod: "Transfer",
        customer: "Andi Wijaya",
    },
    {
        id: "TRX006",
        date: "2025-12-10 13:00",
        category: "Minuman",
        description: "Pesanan #1229 - Kopi Susu",
        branch: "Cabang Jakarta Pusat",
        amount: 25000,
        paymentMethod: "COD",
        customer: "Rina Hartati",
    },
    {
        id: "TRX007",
        date: "2025-12-10 12:30",
        category: "Makanan",
        description: "Pesanan #1228 - Sate Ayam",
        branch: "Cabang Jakarta Barat",
        amount: 75000,
        paymentMethod: "Transfer",
        customer: "Joko Widodo",
    },
    {
        id: "TRX008",
        date: "2025-12-09 16:20",
        category: "Makanan",
        description: "Pesanan #1227 - Ayam",
        branch: "Cabang Jakarta Selatan",
        amount: 185000,
        paymentMethod: "Transfer",
        customer: "Mega Putri",
    },
    {
        id: "TRX009",
        date: "2025-12-09 14:45",
        category: "Makanan",
        description: "Pesanan #1226 - Nasi Uduk",
        branch: "Cabang Jakarta Timur",
        amount: 45000,
        paymentMethod: "COD",
        customer: "Arif Rahman",
    },
    {
        id: "TRX010",
        date: "2025-12-09 13:15",
        category: "Minuman",
        description: "Pesanan #1225 - Jus Alpukat x2",
        branch: "Cabang Jakarta Pusat",
        amount: 50000,
        paymentMethod: "Transfer",
        customer: "Lina Marlina",
    },
];

    const categoryColors: Record<string, string> = {
    Makanan: "border-red-100 bg-red-50 text-red-700",
    Minuman: "border-blue-100 bg-blue-50 text-blue-700",
};

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
        <div className="px-6 overflow-hidden rounded-xl border bg-white shadow-sm">
            {/* Table Header */}
            <div className="border-b p-6">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-gray-900 font-bold">Detail Transaksi</h3>
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
                            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white shadow-sm transition-colors hover:bg-orange-400"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Transaksi</TableHead>
                        <TableHead>Tanggal & Waktu</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Pelanggan</TableHead>
                        <TableHead>Cabang</TableHead>
                        <TableHead>Metode Bayar</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                                <span
                                    className={`inline-flex rounded-md px-2.5 py-1 ${
                                        categoryColors[transaction.category] ||
                                        "border-gray-200 bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {transaction.category}
                                </span>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                                {transaction.description}
                            </TableCell>
                            <TableCell>{transaction.customer}</TableCell>
                            <TableCell>{transaction.branch}</TableCell>
                            <TableCell>
                                <span
                                    className={`inline-flex rounded-md px-2.5 py-1 ${
                                        transaction.paymentMethod === "Transfer"
                                            ? "border border-blue-100 bg-blue-50 text-blue-700"
                                            : "border border-green-100 bg-green-50 text-green-700"
                                    }`}
                                >
                                    {transaction.paymentMethod}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <span className="text-black">
                                    {formatCurrency(transaction.amount)}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
                                        ? 'bg-primary text-white shadow-sm'
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
