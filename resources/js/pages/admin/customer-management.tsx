import { AreaSalesReport } from '@/components/admin/customer-management/AreaSalesReport';
import { CustomerList } from '@/components/admin/customer-management/CustomerList';
import { CustomerStats } from '@/components/admin/customer-management/CustomerStats';
import { ProductEvaluation } from '@/components/admin/customer-management/ProductEvaluation';
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
import { useState } from 'react';

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

export default function CustomerManagement() {
    const [activeTab, setActiveTab] = useState('overview');

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
                    <div className="mb-2 flex items-center justify-between space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manajemen Pelanggan
                        </h1>
                        <div className="flex items-center space-x-2">
                            <Button>Download</Button>
                        </div>
                    </div>
                    <Tabs
                        orientation="vertical"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <div className="w-full overflow-x-auto pb-2">
                            <TabsList>
                                <TabsTrigger
                                    value="overview"
                                    className="flex items-center gap-2"
                                >
                                    {/* <Users className="size-4" /> */}
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="customers"
                                    className="flex items-center gap-2"
                                >
                                    {/* <ShoppingBag className="size-4" /> */}
                                    Data Pelanggan
                                </TabsTrigger>
                                <TabsTrigger
                                    value="evaluation"
                                    className="flex items-center gap-2"
                                >
                                    {/* <Star className="size-4" /> */}
                                    Evaluasi Produk
                                </TabsTrigger>
                                <TabsTrigger
                                    value="area"
                                    className="flex items-center gap-2"
                                >
                                    {/* <MapPin className="size-4" /> */}
                                    Laporan Area
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="overview">
                            <CustomerStats />
                        </TabsContent>

                        <TabsContent value="customers">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Pelanggan</CardTitle>
                                    <CardDescription>
                                        Berikut adalah daftar semua pelanggan
                                        Anda.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CustomerList />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="evaluation">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Evaluasi Produk</CardTitle>
                                    <CardDescription>
                                        Analisis evaluasi produk dari para
                                        pelanggan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ProductEvaluation />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="area">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Laporan Area</CardTitle>
                                    <CardDescription>
                                        Laporan penjualan berdasarkan area
                                        pelanggan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <AreaSalesReport />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </Main>
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
