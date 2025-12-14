import { useCart } from '@/components/homepage/CartContext';
import { ProductCard } from '@/components/ui/product-card-homepage';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import type { Product, ProductCardProps } from '@/types/index';
import { Search } from 'lucide-react';
import { ReactNode, useState } from 'react';

type ProductListingProps = ProductCardProps & {
    products: Product[];
};

export default function ProductListingPage({ products }: ProductListingProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [sortBy, setSortBy] = useState('Featured');
    const [favorites, setFavorites] = useState<(number | string)[]>([]);
    const { addToCart } = useCart();

    console.log(products);
    const categories = ['Semua Kategori', 'Makanan', 'Minuman'];

    const toggleFavorite = (productId: number | string) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId],
        );
    };

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price_discount,
            image: product.image ?? 'none',
        });
    };

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === 'Semua Kategori' ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'Harga: Rendah ke Tinggi':
                    return a.price_discount - b.price_discount;

                case 'Harga: Tinggi ke Rendah':
                    return b.price_discount - a.price_discount;

                case 'Rating Terbanyak':
                    return (b.rating ?? 0) - (a.rating ?? 0);

                default:
                    return 0;
            }
        });

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="mb-4 text-[30px] font-semibold text-gray-900">
                        Produk Kami
                    </h2>
                    <p className="mb-8 text-xl text-gray-600">
                        Temukan makanan cepat saji favorit anda!
                    </p>

                    <div className="mb-6 flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#FF6900] focus:outline-none"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-[#FF6900] focus:outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-[#FF6900] focus:outline-none"
                            >
                                <option>Harga: Rendah ke Tinggi</option>
                                <option>Harga: Tinggi ke Rendah</option>
                                <option>Rating Terbanyak</option>
                            </select>
                        </div>
                    </div>

                    <p className="text-gray-500">
                        {filteredProducts.length} dari {products.length} produk
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        //Card from here
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price_discount={product.price_discount}
                            image={product.image}
                            rating={product.rating ?? 0}
                            category={product.category}
                            // isFavourite={isFavourite}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

ProductListingPage.layout = (page: ReactNode) => (
    <HomepageLayout>{page}</HomepageLayout>
);
