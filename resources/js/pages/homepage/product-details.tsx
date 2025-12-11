import { useState } from 'react';
// import { CheckoutPage } from './components/CheckoutPage';
import { CheckoutPage } from '@/components/product-customer/CheckoutPage';
import { CustomerReviews } from '@/components/product-customer/CustomerReviews';
import { LocationPage } from '@/components/product-customer/LocationPage';
import { ProductDetails } from '@/components/product-customer/ProductDetails';
import { ProductImageGallery } from '@/components/product-customer/ProductImageGallery';
import { ProductOverview } from '@/components/product-customer/ProductOverview';
import { SuggestedProducts } from '@/components/product-customer/SuggestedProducts';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import type { Product } from '@/types/product';
import { ReactNode } from 'react';

export type SuggestedProduct = {
    id: string;
    name: string;
    description: string;
    priceDiscount: number;
    priceOrigin: number;
    rating: number;
    image: string;
    badge: string | null;
};

type ProductDetailsProps = {
    productImages: string[];
    product: Product;
    suggestedProducts: SuggestedProduct[];
};

export default function ProductDetailsPage({
    productImages,
    product,
    suggestedProducts,
}: ProductDetailsProps) {
    const [currentPage, setCurrentPage] = useState<
        'product' | 'checkout' | 'location'
    >('product');

    // const productImages: string[] = [
    //     'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //     'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //     'https://images.unsplash.com/photo-1624935984039-395c058e3944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjA0MTY3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //     'https://images.unsplash.com/photo-1756361947369-8c0e1e8d6828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwZm9vZCUyMHBhY2thZ2V8ZW58MXx8fHwxNzYwNTEzNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    // ];

    // const suggestedProducts: ProductDetail[] = [
    //     {
    //         id: '1',
    //         name: '7-Minute Khichdi - Classic Dal',
    //         description: 'Traditional dal khichdi with authentic spices',
    //         priceDiscount: 79,
    //         priceOrigin: 99,
    //         rating: 4.6,
    //         image: 'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //         badge: '20% OFF',
    //     },
    //     {
    //         id: '2',
    //         name: '7-Minute Khichdi - Spinach Special',
    //         description: 'Nutritious khichdi with fresh spinach & herbs',
    //         priceDiscount: 95,
    //         priceOrigin: 125,
    //         rating: 4.7,
    //         image: 'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //         badge: '24% OFF',
    //     },
    //     {
    //         id: '3',
    //         name: '7-Minute Khichdi - Masala Mix',
    //         description: 'Spicy khichdi with aromatic masala blend',
    //         priceDiscount: 89,
    //         priceOrigin: 90,
    //         rating: 4.5,
    //         image: 'https://images.unsplash.com/photo-1647545401842-4974e4bcbda5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXAlMjBib3dsfGVufDF8fHx8MTc2MDQ2MzY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //         badge: null,
    //     },
    //     {
    //         id: '4',
    //         name: 'Variety Pack - 4 Flavors',
    //         description: 'Try all our delicious khichdi varieties',
    //         priceDiscount: 320,
    //         priceOrigin: 400,
    //         rating: 4.8,
    //         image: 'https://images.unsplash.com/photo-1756361947369-8c0e1e8d6828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwZm9vZCUyMHBhY2thZ2V8ZW58MXx8fHwxNzYwNTEzNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //         badge: 'BEST VALUE',
    //     },
    // ];

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {currentPage === 'product' && (
                <main className="flex-1">
                    {/* Breadcrumb */}
                    <div className="border-b bg-gray-50">
                        <div className="container mx-auto px-4 py-3">
                            <div className="text-md flex items-center gap-2 text-gray-600">
                                <a href="#" className="hover:text-green-600">
                                    Home
                                </a>
                                <span>/</span>
                                <a href="#" className="hover:text-green-600">
                                    Products
                                </a>
                                <span>/</span>
                                <a href="#" className="hover:text-green-600">
                                    Instant Khichdi
                                </a>
                                <span>/</span>
                                <span className="text-gray-900">
                                    7-Minute Khichdi - Superb Vegetable
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Product Main Section */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Left Column - Product Images */}
                            <div>
                                <ProductImageGallery images={productImages} />
                            </div>

                            {/* Right Column - Product Overview */}
                            <div>
                                <ProductOverview
                                    onNavigateToCheckout={() =>
                                        setCurrentPage('checkout')
                                    }
                                />
                            </div>
                        </div>

                        {/* Product Details Tabs */}
                        <ProductDetails />

                        {/* Customer Reviews */}
                        <CustomerReviews />

                        {/* Suggested Products */}
                        <SuggestedProducts products={suggestedProducts} />
                    </div>
                </main>
            )}

            {currentPage === 'checkout' && (
                <main className="flex-1">
                    <CheckoutPage
                        onNavigateToLocation={() => setCurrentPage('location')}
                        onNavigateToHome={() => setCurrentPage('product')}
                    />
                </main>
            )}

            {currentPage === 'location' && (
                <main className="flex-1">
                    <LocationPage
                        onNavigateToCheckout={() => setCurrentPage('checkout')}
                        onNavigateToHome={() => setCurrentPage('product')}
                    />
                </main>
            )}
        </div>
    );
}
ProductDetailsPage.layout = (page: ReactNode) => (
    <HomepageLayout>{page}</HomepageLayout>
);
