import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface CashflowChartProps {
    period: PeriodType;
    type: 'trend' | 'category';
}

export function CashflowChart({ period, type }: CashflowChartProps) {
    // Mock data for trend chart
    const trendData = [
        {
            name: 'Jan',
            pendapatan: 95000000,
            pengeluaran: 65000000,
            profit: 30000000,
        },
        {
            name: 'Feb',
            pendapatan: 88000000,
            pengeluaran: 62000000,
            profit: 26000000,
        },
        {
            name: 'Mar',
            pendapatan: 102000000,
            pengeluaran: 70000000,
            profit: 32000000,
        },
        {
            name: 'Apr',
            pendapatan: 118000000,
            pengeluaran: 75000000,
            profit: 43000000,
        },
        {
            name: 'Mei',
            pendapatan: 125000000,
            pengeluaran: 78000000,
            profit: 47000000,
        },
        {
            name: 'Jun',
            pendapatan: 135000000,
            pengeluaran: 82000000,
            profit: 53000000,
        },
    ];

    // Mock data for category breakdown
    const categoryData = [
        { name: 'Makanan', pendapatan: 78000000, pengeluaran: 42000000 },
        { name: 'Minuman', pendapatan: 32000000, pengeluaran: 18000000 },
        { name: 'Snack', pendapatan: 15750000, pengeluaran: 10450000 },
        { name: 'Paket', pendapatan: 22000000, pengeluaran: 8000000 },
    ];

    const formatCurrency = (value: number) => {
        return `Rp ${(value / 1000000).toFixed(1)}jt`;
    };

    if (type === 'trend') {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-6 text-gray-900">Trend Cash Flow</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis
                            stroke="#6b7280"
                            tickFormatter={formatCurrency}
                        />
                        <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="pendapatan"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Pendapatan"
                        />
                        <Line
                            type="monotone"
                            dataKey="pengeluaran"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Pengeluaran"
                        />
                        <Line
                            type="monotone"
                            dataKey="profit"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Profit"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-gray-900">Breakdown per Kategori</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={formatCurrency} />
                    <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                        }}
                    />
                    <Legend />
                    <Bar
                        dataKey="pendapatan"
                        fill="#10b981"
                        name="Pendapatan"
                    />
                    <Bar
                        dataKey="pengeluaran"
                        fill="#ef4444"
                        name="Pengeluaran"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
