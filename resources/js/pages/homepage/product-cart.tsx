import { CheckoutPage } from '@/components/product-customer/CheckoutPage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import { Cart, User } from '@/types';
import { formatPrice } from '@/utils/format-price';
import { Link, router } from '@inertiajs/react';
import {
    ChevronRight,
    Minus,
    Plus,
    ShoppingBag,
    ShoppingCart,
    Trash2,
} from 'lucide-react';
import { ReactNode, useState } from 'react';

type productCartProps = {
    user: User;
    cart: Cart;
};

export default function CartPage({ user, cart }: productCartProps) {
    const [currentPage, setCurrentPage] = useState<
        'product-cart' | 'checkout' | 'location' | '/'
    >('product-cart');
    const [cartItems, setCartItems] = useState(
        !cart
            ? []
            : cart.items.map((item) => ({
                  ...item,
                  selected: true,
                  inStock: item.product.quantity > 0,
              })),
    );

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item,
            ),
        );
    };

    const removeItem = (id: number) => {
        router.delete(`/cart/destroy/${id}`, {
            preserveScroll: true,
        });
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const toggleItemSelection = (id: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item,
            ),
        );
    };

    const toggleSelectAll = () => {
        const allSelected = cartItems.every((item) => item.selected);
        setCartItems((items) =>
            items.map((item) =>
                item.inStock ? { ...item, selected: !allSelected } : item,
            ),
        );
    };

    const selectedItems = cartItems.filter(
        (item) => item.selected && item.inStock,
    );
    const subtotal = selectedItems.reduce(
        (sum, item) => sum + item.product.price_discount * item.quantity,
        0,
    );
    const deliveryFee = subtotal > 299 ? 0 : 40;
    const total = subtotal + deliveryFee;

    const allInStockSelected = cartItems
        .filter((item) => item.inStock)
        .every((item) => item.selected);

    return (
        <div className="min-h-screen bg-gray-50">
            {currentPage === 'product-cart' && (
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-6">
                        <Link href="/products">
                            <button className="mb-2 text-[#FF6900] hover:underline">
                                ← Kembali
                            </button>
                        </Link>

                        <h1
                            className="text-[32px] text-gray-900"
                            style={{ fontWeight: 700 }}
                        >
                            Keranjang Pesanan
                        </h1>
                        <p className="mt-1 text-gray-600">
                            {cartItems.length}{' '}
                            {cartItems.length === 1 ? 'item' : 'items'} dalam
                            keranjang
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        <Card className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
                                <ShoppingCart className="h-12 w-12 text-[#FF6900]" />
                            </div>
                            <h2
                                className="mb-2 text-[24px] text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Keranjang anda masih kosong
                            </h2>
                            <p className="mb-6 text-gray-600">
                                Temukan pesanan dengan harga menarik untuk anda
                            </p>
                            <Link href="/products">
                                <Button className="bg-[#FF6900] px-8 text-white hover:bg-[#E55D00]">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    Lihat produk
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                            <div className="space-y-4 lg:col-span-2">
                                <Card className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="select-all"
                                            checked={allInStockSelected}
                                            onCheckedChange={toggleSelectAll}
                                            className="border-[#FF6900] data-[state=checked]:bg-[#FF6900]"
                                        />
                                        <Label
                                            htmlFor="select-all"
                                            className="fw-600 cursor-pointer text-gray-900"
                                        >
                                            Select All Items (
                                            {
                                                cartItems.filter(
                                                    (item) => item.inStock,
                                                ).length
                                            }
                                            )
                                        </Label>
                                    </div>
                                </Card>

                                <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="space-y-6">
                                        {cartItems.map((item, index) => (
                                            <div key={item.id}>
                                                <div className="flex gap-4">
                                                    <div className="flex items-start pt-2">
                                                        <Checkbox
                                                            id={`item-${item.id}`}
                                                            checked={
                                                                item.selected
                                                            }
                                                            onCheckedChange={() =>
                                                                toggleItemSelection(
                                                                    item.id,
                                                                )
                                                            }
                                                            disabled={
                                                                !item.inStock
                                                            }
                                                            className="border-[#FF6900] data-[state=checked]:bg-[#FF6900]"
                                                        />
                                                    </div>

                                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .image || ''
                                                            }
                                                            alt={
                                                                item.product
                                                                    .name
                                                            }
                                                            className={`h-full w-full object-cover ${!item.inStock ? 'opacity-50 grayscale' : ''}`}
                                                        />
                                                        {!item.inStock && (
                                                            <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black">
                                                                <span
                                                                    className="text-[12px] text-white"
                                                                    style={{
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    Out of Stock
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <h3
                                                            className={`mb-1 text-gray-900 ${!item.inStock ? 'text-gray-500' : ''}`}
                                                            style={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {item.product.name}
                                                        </h3>

                                                        <div className="mb-3 flex items-center gap-2">
                                                            <span
                                                                className={`${item.inStock ? 'text-[#FF6900]' : 'text-gray-400'}`}
                                                                style={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {formatPrice(
                                                                    item.product
                                                                        .price_discount,
                                                                )}
                                                            </span>
                                                            {item.product
                                                                .price_origin && (
                                                                <>
                                                                    <span className="text-[14px] text-gray-400 line-through">
                                                                        {formatPrice(
                                                                            item
                                                                                .product
                                                                                .price_origin,
                                                                        )}
                                                                    </span>
                                                                    <Badge className="bg-orange-100 text-[11px] text-[#FF6900]">
                                                                        {Math.round(
                                                                            ((item
                                                                                .product
                                                                                .price_origin -
                                                                                item
                                                                                    .product
                                                                                    .price_discount) /
                                                                                item
                                                                                    .product
                                                                                    .price_origin) *
                                                                                100,
                                                                        )}
                                                                        % OFF
                                                                    </Badge>
                                                                </>
                                                            )}
                                                        </div>

                                                        {item.inStock ? (
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center overflow-hidden rounded-lg border-2 border-[#FF6900]">
                                                                    <button
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                item.id,
                                                                                item.quantity -
                                                                                    1,
                                                                            )
                                                                        }
                                                                        className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-orange-50"
                                                                    >
                                                                        <Minus className="h-4 w-4 text-[#FF6900]" />
                                                                    </button>
                                                                    <span
                                                                        className="flex h-8 w-12 items-center justify-center border-x-2 border-[#FF6900] text-gray-900"
                                                                        style={{
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                    <button
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                item.id,
                                                                                item.quantity +
                                                                                    1,
                                                                            )
                                                                        }
                                                                        className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-orange-50"
                                                                    >
                                                                        <Plus className="h-4 w-4 text-[#FF6900]" />
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    onClick={() =>
                                                                        removeItem(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <Badge className="bg-red-100 text-red-600">
                                                                    Out of Stock
                                                                </Badge>
                                                                <button
                                                                    onClick={() =>
                                                                        removeItem(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    className="ml-2 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="text-right">
                                                        <p
                                                            className={`${item.inStock ? 'text-gray-900' : 'text-gray-400'}`}
                                                            style={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {formatPrice(
                                                                item.product
                                                                    .price_discount *
                                                                    item.quantity,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                {index <
                                                    cartItems.length - 1 && (
                                                    <Separator className="mt-6" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-4">
                                    <Card className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                        <h3
                                            className="mb-4 text-[18px] text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Price Details
                                        </h3>

                                        <div className="space-y-3">
                                            {/* Individual Product Lines */}
                                            {selectedItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex justify-between text-gray-600"
                                                >
                                                    <span className="text-sm">
                                                        {item.product.name} ×{' '}
                                                        {item.quantity}
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {formatPrice(
                                                            item.product
                                                                .price_discount *
                                                                item.quantity,
                                                        )}
                                                    </span>
                                                </div>
                                            ))}

                                            {selectedItems.length === 0 && (
                                                <div className="py-2 text-center text-sm text-gray-500">
                                                    No items selected
                                                </div>
                                            )}

                                            {/* {selectedItems.length > 0 && (
                                                <>
                                                    <Separator />

                                                    <div className="flex justify-between text-gray-600">
                                                        <span>Subtotal</span>
                                                        <span>₹{subtotal}</span>
                                                    </div>

                                                    <div className="flex justify-between text-gray-600">
                                                        <span>Delivery Fee</span>
                                                        <span
                                                            className={
                                                                deliveryFee === 0
                                                                    ? 'font-medium text-green-600'
                                                                    : ''
                                                            }
                                                        >
                                                            {deliveryFee === 0
                                                                ? 'FREE'
                                                                : `₹${deliveryFee}`}
                                                        </span>
                                                    </div>
                                                </>
                                            )} */}

                                            <Separator />

                                            <div
                                                className="flex justify-between text-[18px] text-gray-900"
                                                style={{ fontWeight: 700 }}
                                            >
                                                <span>Total Amount</span>
                                                <span className="text-[#FF6900]">
                                                    {formatPrice(total)}
                                                </span>
                                            </div>
                                            {/* 
                                        {subtotal < 299 && subtotal > 0 && (
                                            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                                <p className="text-[13px] text-gray-700">
                                                    Add items worth ₹
                                                    {299 - subtotal} more to get
                                                    FREE delivery!
                                                </p>
                                            </div>
                                        )} */}
                                        </div>

                                        {/* <Link href="/checkout"> */}
                                        <Button
                                            disabled={
                                                selectedItems.length === 0
                                            }
                                            className="w-full bg-[#FF6900] py-6 text-[16px] text-white hover:bg-[#E55D00] disabled:cursor-not-allowed disabled:bg-gray-300"
                                            style={{ fontWeight: 600 }}
                                            onClick={() =>
                                                setCurrentPage('checkout')
                                            }
                                        >
                                            {selectedItems.length === 0 ? (
                                                'Select Items to Proceed'
                                            ) : (
                                                <>
                                                    Proceed to Checkout
                                                    <ChevronRight className="ml-2 h-5 w-5" />
                                                </>
                                            )}
                                        </Button>
                                        {/* </Link> */}
                                    </Card>

                                    <Card className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-[13px] text-gray-700">
                                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6900]">
                                                    <span className="text-[12px] text-white">
                                                        ✓
                                                    </span>
                                                </div>
                                                <span>
                                                    100% Safe & Secure Payments
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[13px] text-gray-700">
                                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6900]">
                                                    <span className="text-[12px] text-white">
                                                        ✓
                                                    </span>
                                                </div>
                                                <span>
                                                    Easy Returns & Refunds
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[13px] text-gray-700">
                                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6900]">
                                                    <span className="text-[12px] text-white">
                                                        ✓
                                                    </span>
                                                </div>
                                                <span>
                                                    Genuine Quality Products
                                                </span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Link href="/products2">
                                        <Button className="w-full rounded-lg border-2 border-dashed border-[#FF6900] bg-white py-3 text-[#FF6900] transition-colors hover:bg-orange-50">
                                            Add More Items
                                            <Plus className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {currentPage === 'checkout' && (
                <main className="flex-1">
                    <CheckoutPage
                        user={user}
                        cartItems={selectedItems}
                        onNavigateToLocation={() => setCurrentPage('location')}
                        onNavigateToHome={() => setCurrentPage('/')}
                    />
                </main>
            )}
        </div>
    );
}

function Label({
    htmlFor,
    children,
    className,
}: {
    htmlFor?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    );
}

CartPage.layout = (page: ReactNode) => <HomepageLayout>{page}</HomepageLayout>;
