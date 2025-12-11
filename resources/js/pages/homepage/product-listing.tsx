import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Button } from '@/components/ui/button';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import type { Product } from '@/types/product';
import { Heart, Search, SlidersHorizontal } from 'lucide-react';
import { ReactNode, useState } from 'react';

// interface Product {
//     id: number | string;
//     name: string;
//     category: string;
//     rating: number;
//     price: number;
//     image: string;
//     description: string;
//     popular?: boolean;
//     preparationTime?: string;
// }

// const products: Product[] = [
//     {
//         id: '1',
//         name: 'Pav Bhaji',
//         description:
//             'Pav bhaji is made with vegetables like potatoes, onions, tomatoes, peas, cauliflower, and capsicum, cooked with pav bhaji masala, turmeric, red chilli powder, cumin seeds, and sometimes garam masala, along with butter, oil, ginger-garlic paste, salt, and lemon juice, served with butter-toasted pav, chopped onions, coriander leaves, and lemon wedges.',
//         priceDiscount: 18.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=250&fit=crop',
//         category: 'Indian',
//         popular: true,
//         rating: 4.4,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '15-20 min',
//     },
//     {
//         id: '2',
//         name: 'Kung Pao Chicken',
//         description: 'Spicy stir-fried chicken with peanuts and vegetables',
//         priceDiscount: 16.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=250&fit=crop',
//         category: 'Chinese',
//         popular: true,
//         rating: 4.6,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '12-18 min',
//     },
//     {
//         id: '3',
//         name: 'Classic Cheeseburger',
//         description:
//             'Beef patty with cheese, lettuce, tomato, and special sauce',
//         priceDiscount: 14.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
//         category: 'Burgers',
//         popular: false,
//         rating: 4.5,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '10-15 min',
//     },
//     {
//         id: '4',
//         name: 'Salmon Sashimi',
//         description: 'Fresh salmon sliced thin and served raw',
//         priceDiscount: 24.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop',
//         category: 'Sushi',
//         popular: true,
//         rating: 4.9,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '5-10 min',
//     },
//     {
//         id: '5',
//         name: 'Chicken Tacos',
//         description:
//             'Three soft tacos with grilled chicken, salsa, and cilantro',
//         priceDiscount: 13.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
//         category: 'Tacos',
//         popular: false,
//         rating: 4.4,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '8-12 min',
//     },
//     {
//         id: '6',
//         name: 'Caesar Salad',
//         description: 'Crisp romaine lettuce with parmesan cheese and croutons',
//         priceDiscount: 12.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
//         category: 'Salads',
//         popular: false,
//         rating: 4.7,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '5-8 min',
//     },
//     {
//         id: '7',
//         name: 'Chocolate Cake',
//         description: 'Rich chocolate cake with chocolate frosting',
//         priceDiscount: 8.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=250&fit=crop',
//         category: 'Desserts',
//         popular: true,
//         rating: 4.6,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '3-5 min',
//     },
//     {
//         id: '8',
//         name: 'Cappuccino',
//         description: 'Rich espresso with steamed milk and foam',
//         priceDiscount: 5.99,
//         priceOrigin: 5,
//         image: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400&h=250&fit=crop',
//         category: 'Coffee',
//         popular: false,
//         rating: 4.3,
//         quantity: 10,
//         foodType: [],
//         preparationTime: '2-4 min',
//     },
// ];

type ProductListingProps = {
    products: Product[];
};

export default function ProductListingPage({ products }: ProductListingProps) {
    console.log(products);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [sortBy, setSortBy] = useState('Featured');
    const [favorites, setFavorites] = useState<(number | string)[]>([]);

    // TODO: Change categories
    const categories = [
        'All Categories',
        'Burgers',
        'Chicken',
        'Pizza',
        'Sides',
    ];

    const toggleFavorite = (productId: number | string) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId],
        );
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === 'All Categories' ||
            product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-12">
                    <h2 className="mb-4 text-[30px] font-semibold text-gray-900">
                        All Products
                    </h2>
                    <p className="mb-8 text-xl text-gray-600">
                        Discover our complete collection of delicious fast food
                        favorites
                    </p>

                    {/* Search and Filters */}
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
                            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100">
                                <SlidersHorizontal className="h-5 w-5" />
                            </button>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-[#FF6900] focus:outline-none"
                            >
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Highest Rated</option>
                            </select>
                        </div>
                    </div>

                    <p className="text-gray-500">
                        Showing {filteredProducts.length} of {products.length}{' '}
                        products
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-block rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-700 shadow-sm">
                                        {product.category}
                                    </span>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-transform hover:scale-110"
                                >
                                    <Heart
                                        className={`h-5 w-5 ${
                                            favorites.includes(product.id)
                                                ? 'fill-[#FF6900] text-[#FF6900]'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                </button>
                                <ImageWithFallback
                                    // src={`https://source.unsplash.com/400x400/?${product.image}`}
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="mb-2 text-gray-900">
                                    {product.name}
                                </h3>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            className="h-4 w-4 fill-current text-yellow-400"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                        <span className="text-gray-600">
                                            ({product.rating})
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900">
                                        ${product.priceDiscount.toFixed(2)}
                                    </span>
                                    <Button className="bg-primary text-white hover:bg-orange-600">
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

ProductListingPage.layout = (page: ReactNode) => (
    <HomepageLayout>{page}</HomepageLayout>
);
