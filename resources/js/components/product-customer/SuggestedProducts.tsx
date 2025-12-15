import { Product } from '@/types';
// import { SuggestedProduct } from '@/pages/homepage/product-details';
import { ProductCard } from '@/components/ui/product-card-homepage';

interface SuggestedProductsProps {
    products: Product[];
}

export function SuggestedProducts({ products }: SuggestedProductsProps) {
    return (
        <div className="mt-16">
            <div className="mb-8 text-center">
                <h2
                    className="mb-2 text-[28px] text-gray-900"
                    style={{ fontWeight: 700 }}
                >
                    You Might Also Like
                </h2>
                <p className="text-gray-600">
                    Discover more delicious khichdi varieties from Kamlesh
                    Khichdi Wala
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price_discount={product.price_discount}
                        image={product.image}
                        rating={product.rating ?? 0}
                        category={product.category}
                    />
                ))}
            </div>
        </div>
    );
}
