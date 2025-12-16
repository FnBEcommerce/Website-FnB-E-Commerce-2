import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product, ReviewProps } from '@/types';
import { getCSRFToken } from '@/utils/csrf';
import { formatPrice } from '@/utils/format-price';
import { router } from '@inertiajs/react';
import { Minus, Plus, Star } from 'lucide-react';
import { useCart } from '../homepage/CartContext';

type ProductWithRating = Product & {
    rating: Number;
};

//type intersect
interface ProductOverviewProps {
    product: Product;
    reviews: ReviewProps;
    buyQuantity: number;
    onChangeBuyQuantity: (quantity: number) => void;
    onNavigateToCheckout?: () => void;
}

export function ProductOverview({
    product,
    reviews,
    buyQuantity,
    onChangeBuyQuantity,
    onNavigateToCheckout,
}: ProductOverviewProps) {
    const ratingSum = reviews.map((r) => r.rating).reduce((a, b) => a + b, 0);
    const averageRating = !reviews.length ? 0 : ratingSum / reviews.length;
    const { cart } = useCart();

    console.log({
        cart,
        // cartItems,
        // cartCount,
        // addToCart,
        // removeFromCart,
        // updateQuantity,
        // clearCart,
    });

    const isAlreadyAddedToCart = cart.items
        .map((item) => item.id)
        .includes(product.id);

    const addCart = () => {
        const csrf = getCSRFToken();
        router.post(
            '/cart/add',
            {
                product_id: product.id,
            },
            {
                headers: {
                    'X-CSRF-TOKEN': csrf ?? '',
                },
            },
        );
    };

    const updateCart = () => {
        const csrf = getCSRFToken();
        router.post(
            `/cart/update/${cart.id}`,
            {
                buyQuantity,
            },
            {
                headers: {
                    'X-CSRF-TOKEN': csrf ?? '',
                },
            },
        );
    };

    const handleAddToCart = () => {
        if (isAlreadyAddedToCart) {
            updateCart();
        } else {
            addCart();
        }
    };
    // console.log(reviews);

    // const features = [
    //     { icon: Clock, text: '7-Minute Prep', color: 'text-green-600' },
    //     { icon: Leaf, text: '100% Natural', color: 'text-green-700' },
    //     { icon: Heart, text: 'Healthy Choice', color: 'text-red-500' },
    //     { icon: Flame, text: 'Authentic Taste', color: 'text-orange-600' },
    //     { icon: TrendingUp, text: 'Ready to Cook', color: 'text-blue-600' },
    // ];

    return (
        <div className="space-y-6">
            {/* Product Name & Tagline */}
            <div>
                <h1
                    className="mb-2 text-[32px] text-gray-900"
                    style={{ fontWeight: 700 }}
                >
                    {product.name}
                </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-5 w-5 ${
                                star <= averageRating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                        />
                    ))}
                </div>
                <span className="text-gray-700">
                    {Number(averageRating).toFixed(1)}/5
                </span>
                <span className="text-gray-500">
                    ({reviews.length} ratings)
                </span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                    <span
                        className="text-[36px] text-primary"
                        style={{ fontWeight: 700 }}
                    >
                        {formatPrice(product.price_discount)}
                    </span>
                    <span className="text-[20px] text-gray-400 line-through">
                        {formatPrice(product.price_origin)}
                    </span>
                </div>
                {product.badge && (
                    <Badge className="bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                        {product.badge}
                    </Badge>
                )}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {product.food_type &&
                    product.food_type.map((text: string, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2 rounded-lg border border-primary bg-amber-50 p-3"
                            >
                                {/* <Icon className={`h-5 w-5 ${t.color}`} /> */}
                                <span className="text-[14px] text-gray-700">
                                    {text}
                                </span>
                            </div>
                        );
                    })}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center gap-2 rounded-lg border-2 border-gray-300">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() =>
                            onChangeBuyQuantity(Math.max(1, buyQuantity - 1))
                        }
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{buyQuantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() =>
                            onChangeBuyQuantity(
                                Math.min(buyQuantity + 1, product.quantity),
                            )
                        }
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                    className="flex-1 bg-[#1B263B] py-6 text-[16px] text-white hover:bg-[#273746]"
                    style={{ fontWeight: 600 }}
                    onClick={handleAddToCart}
                >
                    ADD TO CART
                </Button>
                <Button
                    className="flex-1 bg-primary py-6 text-[16px] text-white hover:bg-orange-400"
                    style={{ fontWeight: 600 }}
                    onClick={onNavigateToCheckout}
                >
                    BUY NOW
                </Button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 text-[14px] text-gray-600">
                    <p>✓ Free shipping on orders above Rp 10,000</p>
                    <p>✓ 100% secure checkout</p>
                </div>
            </div>
        </div>
    );
}
