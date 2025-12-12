import { ProductDialog } from '@/components/admin/product-management/ProductDialog';
import { ProductTable } from '@/components/admin/product-management/ProductTable';
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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchProvider } from '@/context/search-provider';
import { Product } from '@/types';
import { Download, Filter, Plus } from 'lucide-react';
import { useState } from 'react';

// export type Product = {
//     id: string;
//     name: string;
//     category: 'Makanan' | 'Minuman';
//     price: number;
//     stock: number;
//     branch: string;
//     image: string;
//     description: string;
//     discount?: number;
//     rating?: number;
//     status: 'Aktif' | 'Tidak Aktif';
// };

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
        isActive: true,
        disabled: false,
    },
    {
        title: 'Settings',
        href: 'admin/settings',
        isActive: false,
        disabled: false,
    },
];

type ProductManagementProps = {
    products: Product[];
};

export default function ProductManagement({
    products: initialProducts,
}: ProductManagementProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [activeTab, setActiveTab] = useState('products');

    const handleAddProduct = (product: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...product,
            id: Date.now(),
        };
        setProducts([...products, newProduct]);
    };

    const handleEditProduct = (product: Product) => {
        setProducts(products.map((p) => (p.id === product.id ? product : p)));
    };

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleOpenDialog = (product?: Product) => {
        setEditingProduct(product || null);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setEditingProduct(null);
        setIsDialogOpen(false);
    };

    const filteredAndSortedProducts = products
        .filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (product.description || '')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesCategory =
                categoryFilter === 'all' || product.category === categoryFilter;
            // const matchesStatus =
            //     statusFilter === 'all' || product.status === statusFilter;
            return matchesSearch && matchesCategory /* && matchesStatus */;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-asc':
                    return a.price_discount - b.price_discount;
                case 'price-desc':
                    return b.price_discount - a.price_discount;
                case 'stock':
                    return (b.quantity ?? 0) - (a.quantity ?? 0);
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

    return (
        <AuthenticatedLayout>
            <SearchProvider>
                {/* ===== Top Heading ===== */}
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
                            Manajemen Produk
                        </h1>
                        <div className="flex items-center space-x-2">
                            <Button onClick={() => handleOpenDialog()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Produk
                            </Button>
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export Data
                            </Button>
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
                                <TabsTrigger value="products">
                                    Daftar Produk
                                </TabsTrigger>
                                {/* Add other tabs here if needed in the future */}
                            </TabsList>
                        </div>

                        <TabsContent value="products">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Daftar Produk</CardTitle>
                                    <CardDescription>
                                        Kelola produk makanan dan minuman Anda.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                            <div className="md:col-span-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Cari produk..."
                                                    value={searchQuery}
                                                    onChange={(e) =>
                                                        setSearchQuery(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <Select
                                                value={categoryFilter}
                                                onValueChange={
                                                    setCategoryFilter
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Semua Kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        Semua Kategori
                                                    </SelectItem>
                                                    <SelectItem value="Makanan">
                                                        Makanan
                                                    </SelectItem>
                                                    <SelectItem value="Minuman">
                                                        Minuman
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                value={statusFilter}
                                                onValueChange={setStatusFilter}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Semua Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        Semua Status
                                                    </SelectItem>
                                                    <SelectItem value="Aktif">
                                                        Aktif
                                                    </SelectItem>
                                                    <SelectItem value="Tidak Aktif">
                                                        Tidak Aktif
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Filter className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">
                                                    Urutkan:
                                                </span>
                                                <Select
                                                    value={sortBy}
                                                    onValueChange={setSortBy}
                                                >
                                                    <SelectTrigger className="w-auto">
                                                        <SelectValue placeholder="Urutkan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="name">
                                                            Nama (A-Z)
                                                        </SelectItem>
                                                        <SelectItem value="price-asc">
                                                            Harga (Terendah)
                                                        </SelectItem>
                                                        <SelectItem value="price-desc">
                                                            Harga (Tertinggi)
                                                        </SelectItem>
                                                        <SelectItem value="stock">
                                                            Stok (Terbanyak)
                                                        </SelectItem>
                                                        <SelectItem value="rating">
                                                            Rating (Tertinggi)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Menampilkan{' '}
                                                {
                                                    filteredAndSortedProducts.length
                                                }{' '}
                                                dari {products.length} produk
                                            </div>
                                        </div>
                                        <ProductTable
                                            products={filteredAndSortedProducts}
                                            onEdit={handleOpenDialog}
                                            onDelete={handleDeleteProduct}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </Main>
            </SearchProvider>
            <ProductDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onSave={editingProduct ? handleEditProduct : handleAddProduct}
                product={editingProduct}
            />
        </AuthenticatedLayout>
    );
}
