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
import { Download, Filter, Plus } from 'lucide-react';
import { useState } from 'react';

export type Product = {
    id: string;
    name: string;
    category: 'Makanan' | 'Minuman';
    price: number;
    stock: number;
    branch: string;
    image: string;
    description: string;
    discount?: number;
    rating?: number;
    status: 'Aktif' | 'Tidak Aktif';
};

const initialProducts: Product[] = [
    {
        id: '1',
        name: 'Nasi Goreng Spesial',
        category: 'Makanan',
        price: 35000,
        stock: 50,
        branch: 'Jakarta Pusat',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
        description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
        discount: 10,
        rating: 4.5,
        status: 'Aktif',
    },
    {
        id: '2',
        name: 'Es Teh Manis',
        category: 'Minuman',
        price: 8000,
        stock: 100,
        branch: 'Jakarta Selatan',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
        description: 'Teh manis dingin yang menyegarkan',
        rating: 4.2,
        status: 'Aktif',
    },
    {
        id: '3',
        name: 'Ayam Geprek',
        category: 'Makanan',
        price: 25000,
        stock: 30,
        branch: 'Jakarta Barat',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
        description: 'Ayam goreng crispy dengan sambal pedas',
        discount: 15,
        rating: 4.7,
        status: 'Aktif',
    },
    {
        id: '4',
        name: 'Kopi Susu Gula Aren',
        category: 'Minuman',
        price: 18000,
        stock: 75,
        branch: 'Jakarta Timur',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
        description: 'Kopi susu dengan gula aren original',
        discount: 5,
        rating: 4.8,
        status: 'Aktif',
    },
    {
        id: '5',
        name: 'Mie Goreng Seafood',
        category: 'Makanan',
        price: 32000,
        stock: 20,
        branch: 'Jakarta Pusat',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
        description: 'Mie goreng dengan seafood premium',
        rating: 4.3,
        status: 'Tidak Aktif',
    },
];

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

export default function ProductManagement() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [activeTab, setActiveTab] = useState('products');

    const handleAddProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = {
            ...product,
            id: Date.now().toString(),
        };
        setProducts([...products, newProduct]);
    };

    const handleEditProduct = (product: Product) => {
        setProducts(products.map((p) => (p.id === product.id ? product : p)));
    };

    const handleDeleteProduct = (id: string) => {
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
                product.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesCategory =
                categoryFilter === 'all' || product.category === categoryFilter;
            const matchesStatus =
                statusFilter === 'all' || product.status === statusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'stock':
                    return b.stock - a.stock;
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                default:
                    return 0;
            }
        });

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
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        {/* KIRI: Input Search */}
                                        <div className="flex-1 min-w-[240px]">
                                            <Input
                                                type="text"
                                                placeholder="Cari produk..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>

                                        {/* KANAN: Filters (mentok kanan) */}
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end w-full sm:w-auto">
                                            {/* Filter Kategori */}
                                            <div>
                                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Semua Kategori" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">Semua Kategori</SelectItem>
                                                        <SelectItem value="Makanan">Makanan</SelectItem>
                                                        <SelectItem value="Minuman">Minuman</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Filter Status */}
                                            <div>
                                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Semua Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">Semua Status</SelectItem>
                                                        <SelectItem value="Aktif">Aktif</SelectItem>
                                                        <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
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
                                            products={
                                                filteredAndSortedProducts
                                            }
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
                onSave={
                    editingProduct ? handleEditProduct : handleAddProduct
                }
                product={editingProduct}
            />
        </AuthenticatedLayout>
    );
}
