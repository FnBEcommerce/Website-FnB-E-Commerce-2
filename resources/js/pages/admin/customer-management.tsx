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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchProvider } from '@/context/search-provider';
import { MapPin, ShoppingBag, Star, Users } from 'lucide-react';
import { useState } from 'react';

const topNav = [
    {
        title: 'Overview',
        href: 'dashboard/overview',
        isActive: true,
        disabled: false,
    },
    {
        title: 'Customers',
        href: 'dashboard/customers',
        isActive: false,
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
                    <div className="w-full">
                        {/* Header */}
                        <div className="border-b bg-white">
                            <div className="container mx-auto px-6 py-6">
                                <div className="flex items-center gap-3">
                                    <Users className="size-8 text-orange-600" />
                                    <div>
                                        <h1 className="text-orange-600">
                                            Manajemen Pelanggan
                                        </h1>
                                        <p className="text-slate-600">
                                            Kelola data pelanggan dan analisis
                                            pembelian
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="container mx-auto px-6 py-6">
                            <Tabs
                                orientation="vertical"
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full"
                            >
                                <TabsList className="mb-6 grid w-full grid-cols-4">
                                    <TabsTrigger
                                        value="overview"
                                        className="flex items-center gap-2"
                                    >
                                        <Users className="size-4" />
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="customers"
                                        className="flex items-center gap-2"
                                    >
                                        <ShoppingBag className="size-4" />
                                        Data Pelanggan
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="evaluation"
                                        className="flex items-center gap-2"
                                    >
                                        <Star className="size-4" />
                                        Evaluasi Produk
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="area"
                                        className="flex items-center gap-2"
                                    >
                                        <MapPin className="size-4" />
                                        Laporan Area
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview">
                                    <CustomerStats />
                                </TabsContent>

                                <TabsContent value="customers">
                                    <CustomerList />
                                </TabsContent>

                                <TabsContent value="evaluation">
                                    <ProductEvaluation />
                                </TabsContent>

                                <TabsContent value="area">
                                    <AreaSalesReport />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </Main>
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
