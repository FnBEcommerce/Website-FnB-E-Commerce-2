import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Clock,
    Flame,
    Heart,
    Leaf,
    Minus,
    Plus,
    Star,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

interface ProductOverviewProps {
    onNavigateToCheckout?: () => void;
}

export function ProductOverview({
    onNavigateToCheckout,
}: ProductOverviewProps) {
    const [quantity, setQuantity] = useState(1);

    const features = [
        { icon: Clock, text: '7-Minute Prep', color: 'text-green-600' },
        { icon: Leaf, text: '100% Natural', color: 'text-green-700' },
        { icon: Heart, text: 'Healthy Choice', color: 'text-red-500' },
        { icon: Flame, text: 'Authentic Taste', color: 'text-orange-600' },
        { icon: TrendingUp, text: 'Ready to Cook', color: 'text-blue-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Product Name & Tagline */}
            <div>
                <h1
                    className="mb-2 text-[32px] text-gray-900"
                    style={{ fontWeight: 700 }}
                >
                    7-Minute Khichdi - Superb Vegetable
                </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-5 w-5 ${
                                star <= 4
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                        />
                    ))}
                </div>
                <span className="text-gray-700">4.5/5</span>
                <span className="text-gray-500">(100+ ratings)</span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                    <span
                        className="text-[36px] text-primary"
                        style={{ fontWeight: 700 }}
                    >
                        Rp 89,000
                    </span>
                    <span className="text-[20px] text-gray-400 line-through">
                        Rp 100,000
                    </span>
                </div>
                <Badge className="bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                    25% OFF
                </Badge>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-2 rounded-lg border border-primary bg-amber-50 p-3"
                        >
                            <Icon className={`h-5 w-5 ${feature.color}`} />
                            <span className="text-[14px] text-gray-700">
                                {feature.text}
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
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(quantity + 1)}
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
