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
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchProvider } from '@/context/search-provider';
import {
    CreditCard,
    DollarSign,
    ShoppingCart,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';

const topNav = [
    {
        title: 'Overview',
        href: 'admin',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Customers',
        href: 'admin/customer-management',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Products',
        href: 'admin/product-management',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Settings',
        href: 'admin/settings',
        isActive: false,
        disabled: false,
    },
];

export default function CashflowManagement() {
    const [period, setPeriod] = useState<PeriodType>('monthly');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('overview');

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
                {/* ===== Top Heading ===== */}
                <Header>
                    {/* <TopNav links={topNav} /> */}
                    <div className="ms-auto flex items-center space-x-4">
                        <Search />
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>

                {/* ===== Main ===== */}
                <Main>
                    <div className="mb-2 flex items-center justify-between space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manajemen Keuangan
                        </h1>
                        <div className="flex items-center space-x-2">
                            {/* <DateRangeFilter
                                period={period}
                                setPeriod={setPeriod}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            /> */}
                            <Button>Download</Button>
                        </div>
                    </div>
                    <Tabs
                        orientation="vertical"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <div className="w-full flex flex-col items-start justify-between gap-3 pb-2 md:flex-row md:items-center">
                        {/* Tab List - Left */}
                        <TabsList className="shrink-0">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="charts">Charts</TabsTrigger>
                            <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        </TabsList>

                        {/* Date Range Filter - Right */}
                        <DateRangeFilter
                            period={period}
                            setPeriod={setPeriod}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </div>

                        <TabsContent value="overview">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ringkasan</CardTitle>
                                    <CardDescription>
                                        Ringkasan pendapatan penjualan F&B Anda.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                                    {/* Total Pendapatan */}
                                    <CashflowSummaryCard
                                        title="Total Pendapatan"
                                        amount={summaryData.totalRevenue}
                                        growth={summaryData.revenueGrowth}
                                        icon={DollarSign}
                                        iconBgColor="bg-emerald-100"
                                        iconColor="text-emerald-500"
                                        period={period}
                                    />

                                    {/* Total Pesanan */}
                                    <CashflowSummaryCard
                                        title="Total Pesanan"
                                        amount={summaryData.totalOrders}
                                        growth={summaryData.ordersGrowth}
                                        icon={ShoppingCart}
                                        iconBgColor="bg-indigo-100"
                                        iconColor="text-indigo-500"
                                        period={period}
                                        isCount
                                    />

                                    {/* Rata-rata Pesanan */}
                                    <CashflowSummaryCard
                                        title="Rata-rata Pesanan"
                                        amount={summaryData.averageOrder}
                                        growth={summaryData.averageGrowth}
                                        icon={CreditCard}
                                        iconBgColor="bg-amber-100"
                                        iconColor="text-amber-500"
                                        period={period}
                                    />

                                    {/* Pertumbuhan */}
                                    <CashflowSummaryCard
                                        title="Pertumbuhan"
                                        amount={summaryData.growth}
                                        growth={summaryData.growth}
                                        icon={TrendingUp}
                                        iconBgColor="bg-rose-100"
                                        iconColor="text-rose-500"
                                        period={period}
                                        isPercentage
                                    />
                                </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="charts">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Grafik</CardTitle>
                                    <CardDescription>
                                        Visualisasi data cash flow Anda.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        <CashflowChart
                                            period={period}
                                            type="trend"
                                        />
                                        <CashflowChart
                                            period={period}
                                            type="category"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="transactions">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Transaksi</CardTitle>
                                    <CardDescription>
                                        Daftar semua transaksi yang terekam.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <TransactionTable />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </Main>
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
