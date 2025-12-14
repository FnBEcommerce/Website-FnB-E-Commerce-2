import { useCart } from '@/components/homepage/CartContext';
import { Link } from '@inertiajs/react';
import { Bell, Menu, ShoppingCart, Truck, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

interface HeaderProps {
    onNavigateToHome?: () => void;
    onNavigateToProfile?: () => void;
    onNavigateToCart?: () => void;
    onNavigateToOrderStatus?: () => void;
}

export function Header({
    onNavigateToHome,
    onNavigateToCart,
    onNavigateToProfile,
    onNavigateToOrderStatus,
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    const notifications = [
        {
            id: 1,
            title: 'Order Shipped',
            message: 'Your order #12345 has been shipped and will arrive soon.',
            time: '5 minutes ago',
            unread: true,
        },
        {
            id: 2,
            title: 'New Offer Available',
            message: 'Get 20% off on all Khichdi varieties this weekend!',
            time: '2 hours ago',
            unread: true,
        },
        {
            id: 3,
            title: 'Review Request',
            message: 'How was your recent purchase? Share your experience.',
            time: '1 day ago',
            unread: true,
        },
        {
            id: 4,
            title: 'Order Delivered',
            message: 'Your order #12344 has been successfully delivered.',
            time: '2 days ago',
            unread: false,
        },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }
        }

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [showNotifications]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="/images/logo-pbp.png"
                            className="h-16 w-auto object-contain"
                        />
                    </div>

                    <nav className="hidden items-center space-x-8 md:flex">
                        <a
                            href="/"
                            className="text-xl font-medium transition-colors hover:text-orange-600"
                        >
                            {'Beranda'}
                        </a>
                        <a
                            href="#products"
                            className="text-xl font-medium transition-colors hover:text-orange-600"
                        >
                            {'Produk Kami'}
                        </a>

                        <a
                            href="#contact"
                            className="text-xl font-medium transition-colors hover:text-orange-600"
                        >
                            {'Kontak'}
                        </a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link
                            className="relative rounded-full p-2 transition-colors hover:bg-gray-100"
                            aria-label="Cart"
                            href="/product/cart"
                        >
                            <ShoppingCart className="h-5 w-5 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#D97706] text-[11px] text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Product status icon */}
                        <Link
                            className="relative rounded-full p-2 transition-colors hover:bg-gray-100"
                            aria-label="Profile"
                            href="/product/status"
                        >
                            <Truck className="h-5 w-5 text-gray-700" />
                            <span
                                className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6900] text-[11px] text-white"
                                style={{ fontWeight: 600 }}
                            >
                                1
                            </span>
                        </Link>

                        {/* Notification Bell with Dropdown */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                className="relative rounded-full p-2 transition-colors hover:bg-gray-100"
                                aria-label="Notifications"
                                onClick={() =>
                                    setShowNotifications(!showNotifications)
                                }
                            >
                                <Bell className="h-5 w-5 text-gray-700" />
                                {unreadCount > 0 && (
                                    <span
                                        className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6900] text-[11px] text-white"
                                        style={{ fontWeight: 600 }}
                                    >
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="absolute top-full right-0 mt-2 w-96 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                                    {/* Header */}
                                    <div className="border-b border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <h3
                                                className="text-[16px] text-gray-900"
                                                style={{ fontWeight: 700 }}
                                            >
                                                Notifications
                                            </h3>
                                            {unreadCount > 0 && (
                                                <span
                                                    className="text-[12px] text-[#FF6900]"
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    {unreadCount} new
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Notification List */}
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <button
                                                key={notification.id}
                                                className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 ${
                                                    notification.unread
                                                        ? 'bg-orange-50/30'
                                                        : ''
                                                }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${
                                                            notification.unread
                                                                ? 'bg-[#FF6900]'
                                                                : 'bg-transparent'
                                                        }`}
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <p
                                                            className="mb-1 text-[14px] text-gray-900"
                                                            style={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {notification.title}
                                                        </p>
                                                        <p className="mb-2 line-clamp-2 text-[13px] text-gray-600">
                                                            {
                                                                notification.message
                                                            }
                                                        </p>
                                                        <p className="text-[12px] text-gray-500">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <Link
                            className="rounded-full p-2 transition-colors hover:bg-gray-100"
                            aria-label="Profile"
                            href="/profile/1"
                        >
                            <User className="h-5 w-5 text-gray-700" />
                        </Link>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {isMenuOpen && (
                    <nav className="mt-4 border-t pt-4 pb-4 md:hidden">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#home"
                                className="transition-colors hover:text-orange-600"
                            >
                                {'beranda'}
                            </a>
                            <a
                                href="#products"
                                className="transition-colors hover:text-orange-600"
                            >
                                {'produk'}
                            </a>
                            <a
                                href="#about"
                                className="transition-colors hover:text-orange-600"
                            >
                                {'tentang'}
                            </a>
                            <a
                                href="#sustainability"
                                className="transition-colors hover:text-orange-600"
                            >
                                {'keberlanjutan'}
                            </a>
                            <a
                                href="#contact"
                                className="transition-colors hover:text-orange-600"
                            >
                                {'kontak'}
                            </a>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
