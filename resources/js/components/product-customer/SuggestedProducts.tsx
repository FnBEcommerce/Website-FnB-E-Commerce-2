import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/types';
// import { SuggestedProduct } from '@/pages/homepage/product-details';
import { Star } from 'lucide-react';

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
                    <Card
                        key={product.id}
                        className="overflow-hidden border-2 border-gray-200 transition-shadow duration-300 hover:border-orange-400 hover:shadow-xl"
                    >
                        <div className="relative">
                            {product.badge && (
                                <Badge className="absolute top-3 right-3 z-10 bg-[#ee3e3b] text-white">
                                    {product.badge}
                                </Badge>
                            )}
                            <div className="aspect-square overflow-hidden bg-gradient-to-br from-green-50 to-amber-50">
                                <ImageWithFallback
                                    src={product.image ?? 'none'}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 p-4">
                            <div>
                                <h3
                                    className="mb-1 line-clamp-2 text-gray-900"
                                    style={{ fontWeight: 600 }}
                                >
                                    {product.name}
                                </h3>
                                <p className="line-clamp-2 text-[14px] text-gray-600">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                            star <= Math.floor(product.rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                                <span className="ml-1 text-[14px] text-gray-600">
                                    ({product.rating})
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span
                                    className="text-[20px] text-primary"
                                    style={{ fontWeight: 700 }}
                                >
                                    Rp {product.price_discount}
                                </span>
                                {product.price_origin && (
                                    <span className="text-[14px] text-gray-400 line-through">
                                        Rp {product.price_origin}
                                    </span>
                                )}
                            </div>

                            <Button
                                className="w-full bg-primary text-white hover:bg-orange-400"
                                style={{ fontWeight: 600 }}
                            >
                                View Product
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
