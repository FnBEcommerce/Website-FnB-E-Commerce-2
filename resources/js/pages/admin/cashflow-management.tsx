import { CashflowChart } from '@/components/admin/cashflow-management/CashflowChart';
import { CashflowSummaryCard } from '@/components/admin/cashflow-management/CashflowSummaryCard';
import { DateRangeFilter } from '@/components/admin/cashflow-management/DateRangeFilter';
import { TransactionTable } from '@/components/admin/cashflow-management/TransactionTable';
import { ConfigDrawer } from '@/components/config-drawer';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { TopNav } from '@/components/layout/top-nav';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { SearchProvider } from '@/context/search-provider';
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';

const topNav = [
    {
        title: 'Overview',
        href: 'dashboard/overview',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Customers',
        href: 'dashboard/customers',
        isActive: true,
        disabled: true,
    },
    {
        title: 'Products',
        href: 'dashboard/products',
        isActive: false,
        disabled: true,
    },
    {
        title: 'Settings',
        href: 'dashboard/settings',
        isActive: false,
        disabled: true,
    },
];

export default function CashflowManagement() {
    const [period, setPeriod] = useState<PeriodType>('monthly');
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock data - in real app, this would come from API
    const summaryData = {
        totalRevenue: 125750000,
        totalOrders: 1247,
        averageOrder: 100843,
        growth: 12.5,
        revenueGrowth: 15.2,
        ordersGrowth: 8.3,
        averageGrowth: 6.4,
    };

    return (
        <AuthenticatedLayout>
            <SearchProvider>
                {/* ===== Top Heading ===sea== */}
                <Header>
                    <TopNav links={topNav} />
                    <div className="ms-auto flex items-center space-x-4">
                        <Search />
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>

                {/* ===== Main ===== */}
                <Main>
                    <div className="min-h-screen bg-gray-50/50">
                        {/* Header */}
                        <div className="border-b bg-white">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h1 className="text-gray-900">
                                            Manajemen Cash Flow
                                        </h1>
                                        <p className="mt-1 text-gray-500">
                                            Monitor dan analisis pendapatan
                                            penjualan F&B
                                        </p>
                                    </div>
                                    <DateRangeFilter
                                        period={period}
                                        setPeriod={setPeriod}
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                            {/* Summary Cards */}
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <CashflowSummaryCard
                                    title="Total Pendapatan"
                                    amount={summaryData.totalRevenue}
                                    growth={summaryData.revenueGrowth}
                                    icon={DollarSign}
                                    iconBgColor="bg-emerald-500"
                                    iconColor="text-white"
                                    period={period}
                                />
                                <CashflowSummaryCard
                                    title="Total Pesanan"
                                    amount={summaryData.totalOrders}
                                    growth={summaryData.ordersGrowth}
                                    icon={ShoppingCart}
                                    iconBgColor="bg-blue-500"
                                    iconColor="text-white"
                                    period={period}
                                    isCount
                                />
                                <CashflowSummaryCard
                                    title="Rata-rata Pesanan"
                                    amount={summaryData.averageOrder}
                                    growth={summaryData.averageGrowth}
                                    icon={CreditCard}
                                    iconBgColor="bg-violet-500"
                                    iconColor="text-white"
                                    period={period}
                                />
                                <CashflowSummaryCard
                                    title="Pertumbuhan"
                                    amount={summaryData.growth}
                                    growth={summaryData.growth}
                                    icon={TrendingUp}
                                    iconBgColor="bg-amber-500"
                                    iconColor="text-white"
                                    period={period}
                                    isPercentage
                                />
                            </div>

                            {/* Charts */}
                            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <CashflowChart period={period} type="trend" />
                                <CashflowChart
                                    period={period}
                                    type="category"
                                />
                            </div>

                            {/* Transactions Table */}
                            <TransactionTable period={period} />
                        </div>
                    </div>
                </Main>
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
