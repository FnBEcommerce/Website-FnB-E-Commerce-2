import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CartItem, User } from '@/types';
import { formatPrice } from '@/utils/format-price';
import {
    Banknote,
    CreditCard,
    MapPin,
    Minus,
    Plus,
    Smartphone,
    Tag,
    Trash2,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';

interface CheckoutPageProps {
    user: User;
    cartItems: CartItem[];
    onNavigateToLocation: () => void;
    onNavigateToHome: () => void;
}

export function CheckoutPage({
    user,
    cartItems,
    onNavigateToLocation,
    onNavigateToHome,
}: CheckoutPageProps) {
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Cart items state
    // const [cartItems, setCartItems] = useState([
    //     {
    //         id: 1,
    //         name: '7-Minute Khichdi - Superb Vegetable',
    //         variant: '200g Pack',
    //         price: 89,
    //         originalPrice: 110,
    //         quantity: 2,
    //         image: 'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //     },
    //     {
    //         id: 2,
    //         name: '7-Minute Khichdi - Classic Dal',
    //         variant: '200g Pack',
    //         price: 79,
    //         originalPrice: 99,
    //         quantity: 1,
    //         image: 'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //     },
    // ]);

    console.log(user);
    const [deliveryAddress, setDeliveryAddress] = useState({
        name: user.name,
        phone: user.phone_number,
        street: user.street, // Updated from address
        city: user.city,
        state: user.state,
    });

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === 'SAVE20') {
            setAppliedCoupon('SAVE20');
        } else if (couponCode.toUpperCase() === 'FIRST50') {
            setAppliedCoupon('FIRST50');
        } else {
            alert('Invalid coupon code');
        }
    };

    // Calculate totals
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price_discount * item.quantity,
        0,
    );
    const savings = cartItems.reduce(
        (sum, item) =>
            sum +
            (item.product.price_origin - item.product.price_discount) *
                item.quantity,
        0,
    );
    const deliveryFee = subtotal > 299 ? 0 : 40;
    const couponDiscount =
        appliedCoupon === 'SAVE20'
            ? subtotal * 0.2
            : appliedCoupon === 'FIRST50'
              ? 50
              : 0;
    const total = subtotal + deliveryFee - couponDiscount;

    console.log('cartItem', cartItems[0]);

    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);
        try {
            const response = await fetch('/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (
                        document.querySelector(
                            'meta[name="csrf-token"]',
                        ) as HTMLMetaElement
                    )?.content,
                },
                body: JSON.stringify({
                    cart_items: cartItems.map((item) => ({
                        product_id: item.product.id,
                        quantity: item.quantity,
                    })),
                    delivery_fee: deliveryFee,
                    payment_method: paymentMethod,
                    delivery_address: deliveryAddress,
                    total: total,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const data = await response.json();
            console.log('data', data);

            // router.visit(
            //     `/payment/fake?order_id=${data.order_id}&total=${total}`,
            // );
        } catch (error) {
            console.error(error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <button
                        onClick={onNavigateToHome}
                        className="text-primaryf mb-2 hover:underline"
                    >
                        ← Continue Shopping
                    </button>
                    <h1
                        className="text-[32px] text-gray-900"
                        style={{ fontWeight: 700 }}
                    >
                        Checkout
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Complete your order in just a few clicks
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Left Column - Main Checkout Form */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Delivery Address Section */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                                        <MapPin className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h2
                                            className="text-[20px] text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Delivery Address
                                        </h2>
                                        <p className="text-[14px] text-gray-500">
                                            Where should we deliver your order?
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={onNavigateToLocation}
                                    variant="outline"
                                    className="border-primary text-[#1B263B] hover:bg-green-50"
                                >
                                    Change
                                </Button>
                            </div>

                            <div className="rounded-lg border border-primary bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                                        <MapPin className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <span
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {deliveryAddress.name}
                                            </span>
                                            <Badge className="bg-primary text-[11px] text-white">
                                                Home
                                            </Badge>
                                        </div>
                                        <p className="mb-1 text-[14px] text-gray-700">
                                            {deliveryAddress.phone}
                                        </p>
                                        {/* Updated Rendering: Street Only */}
                                        <p className="text-[14px] text-gray-600">
                                            {deliveryAddress.street}
                                        </p>
                                        {/* Updated Rendering: City, State Only (No Pincode) */}
                                        <p className="text-[14px] text-gray-600">
                                            {deliveryAddress.city},{' '}
                                            {deliveryAddress.state}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onNavigateToLocation}
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-2.5 text-primary transition-colors hover:border-primary hover:bg-orange-50"
                            >
                                <Plus className="h-4 w-4" />
                                Add New Address
                            </button>
                        </Card>

                        {/* Cart Items Section */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2
                                className="mb-4 text-[20px] text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Order Items ({cartItems.length})
                            </h2>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={item.product.image || ''}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3
                                                className="mb-1 text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {item.product.name}
                                            </h3>
                                            <p className="mb-2 text-[14px] text-gray-500">
                                                {item.product.category}
                                            </p>

                                            <div className="mb-2 flex items-center gap-2">
                                                <span
                                                    className="text-primary"
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    Rp{' '}
                                                    {
                                                        item.product
                                                            .price_discount
                                                    }
                                                </span>
                                                {item.product.price_origin && (
                                                    <>
                                                        <span className="text-[14px] text-gray-400 line-through">
                                                            Rp
                                                            {
                                                                item.product
                                                                    .price_origin
                                                            }
                                                        </span>
                                                        <Badge className="bg-orange-100 text-[11px] text-primary">
                                                            {Math.round(
                                                                ((item.product
                                                                    .price_origin -
                                                                    item.product
                                                                        .price_discount) /
                                                                    item.product
                                                                        .price_origin) *
                                                                    100,
                                                            )}
                                                            % OFF
                                                        </Badge>
                                                    </>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                                                    <button className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-gray-100">
                                                        <Minus className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                    <span
                                                        className="flex h-8 w-10 items-center justify-center border-x border-gray-300 text-gray-900"
                                                        style={{
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {item.quantity}
                                                    </span>
                                                    <button className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-gray-100">
                                                        <Plus className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                </div>

                                                <button className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {formatPrice(
                                                    item.product
                                                        .price_discount *
                                                        item.quantity,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Payment Method Section */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2
                                className="mb-4 text-[20px] text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Payment Method
                            </h2>

                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="space-y-3"
                            >
                                <div className="flex cursor-pointer items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-primary">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <Label
                                        htmlFor="cod"
                                        className="flex flex-1 cursor-pointer items-center gap-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                            <Banknote className="h-5 w-5 text-[#D97706]" />
                                        </div>
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                Cash on Delivery
                                            </p>
                                            <p className="text-[14px] text-gray-500">
                                                Pay when you receive
                                            </p>
                                        </div>
                                    </Label>
                                </div>

                                <div className="flex cursor-pointer items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-primary">
                                    <RadioGroupItem value="upi" id="upi" />
                                    <Label
                                        htmlFor="upi"
                                        className="flex flex-1 cursor-pointer items-center gap-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                                            <Smartphone className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                UPI Payment
                                            </p>
                                            <p className="text-[14px] text-gray-500">
                                                Google Pay, PhonePe, Paytm
                                            </p>
                                        </div>
                                    </Label>
                                </div>

                                <div className="flex cursor-pointer items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-primary">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label
                                        htmlFor="card"
                                        className="flex flex-1 cursor-pointer items-center gap-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                            <CreditCard className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                Credit / Debit Card
                                            </p>
                                            <p className="text-[14px] text-gray-500">
                                                Visa, Mastercard, RuPay
                                            </p>
                                        </div>
                                    </Label>
                                </div>

                                <div className="flex cursor-pointer items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 transition-colors hover:border-primary">
                                    <RadioGroupItem
                                        value="wallet"
                                        id="wallet"
                                    />
                                    <Label
                                        htmlFor="wallet"
                                        className="flex flex-1 cursor-pointer items-center gap-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                            <Wallet className="h-5 w-5 text-[#059669]" />
                                        </div>
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                Digital Wallet
                                            </p>
                                            <p className="text-[14px] text-gray-500">
                                                Paytm, Amazon Pay, MobiKwik
                                            </p>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </Card>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Apply Coupon */}
                            <Card className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mb-3 flex items-center gap-2">
                                    <Tag className="h-5 w-5 text-primary" />
                                    <h3
                                        className="text-gray-900"
                                        style={{ fontWeight: 600 }}
                                    >
                                        Apply Coupon
                                    </h3>
                                </div>

                                <div className="flex gap-2">
                                    <Input
                                        value={couponCode}
                                        onChange={(e) =>
                                            setCouponCode(
                                                e.target.value.toUpperCase(),
                                            )
                                        }
                                        placeholder="Enter coupon code"
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={applyCoupon}
                                        className="bg-primary text-white hover:bg-orange-600"
                                    >
                                        Apply
                                    </Button>
                                </div>

                                {appliedCoupon && (
                                    <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Tag className="h-4 w-4 text-[#059669]" />
                                                <span
                                                    className="text-[14px] text-[#059669]"
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    {appliedCoupon}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setAppliedCoupon(null);
                                                    setCouponCode('');
                                                }}
                                                className="text-[14px] text-red-500 hover:text-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                                    <p className="text-[13px] text-gray-600">
                                        Available Coupons:
                                    </p>
                                    <div className="space-y-2">
                                        <div className="rounded border border-orange-200 bg-orange-50 p-2 text-[12px]">
                                            <p
                                                className="text-primary"
                                                style={{ fontWeight: 600 }}
                                            >
                                                SAVE20
                                            </p>
                                            <p className="text-gray-600">
                                                Get 20% off on total
                                            </p>
                                        </div>
                                        <div className="bg-orane-50 rounded border border-orange-200 p-2 text-[12px]">
                                            <p
                                                className="text-primary"
                                                style={{ fontWeight: 600 }}
                                            >
                                                FIRST50
                                            </p>
                                            <p className="text-gray-600">
                                                Rp 50.000 off on first order
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Order Summary */}
                            <Card className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h3
                                    className="mb-4 text-[18px] text-gray-900"
                                    style={{ fontWeight: 600 }}
                                >
                                    Order Summary
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>
                                            Subtotal (
                                            {cartItems.reduce(
                                                (sum, item) =>
                                                    sum + item.quantity,
                                                0,
                                            )}{' '}
                                            items)
                                        </span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>

                                    {savings > 0 && (
                                        <div className="flex justify-between text-primary">
                                            <span>Product Savings</span>
                                            <span>
                                                - {formatPrice(savings)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        {deliveryFee === 0 ? (
                                            <span
                                                className="text-[#059669]"
                                                style={{ fontWeight: 600 }}
                                            >
                                                FREE
                                            </span>
                                        ) : (
                                            <span>
                                                {formatPrice(deliveryFee)}
                                            </span>
                                        )}
                                    </div>

                                    {couponDiscount > 0 && (
                                        <div className="flex justify-between text-[#059669]">
                                            <span>Coupon Discount</span>
                                            <span>
                                                - {formatPrice(couponDiscount)}
                                            </span>
                                        </div>
                                    )}

                                    <Separator />

                                    <div
                                        className="flex justify-between text-[18px] text-gray-900"
                                        style={{ fontWeight: 700 }}
                                    >
                                        <span>Total Amount</span>
                                        <span className="text-primary">
                                            {formatPrice(total)}
                                        </span>
                                    </div>

                                    {subtotal < 299 && (
                                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                            <p className="text-[13px] text-gray-700">
                                                Add items worth ₹
                                                {299 - subtotal} more to get
                                                FREE delivery!
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    onClick={handlePlaceOrder}
                                    disabled={isPlacingOrder}
                                    className="mt-5 w-full bg-primary py-6 text-[16px] text-white hover:bg-orange-600"
                                    style={{ fontWeight: 600 }}
                                >
                                    {isPlacingOrder
                                        ? 'Placing Order...'
                                        : `Place Order • ${formatPrice(total)}`}
                                </Button>

                                <p className="mt-3 text-center text-[12px] text-gray-500">
                                    By placing this order, you agree to our
                                    Terms & Conditions
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
