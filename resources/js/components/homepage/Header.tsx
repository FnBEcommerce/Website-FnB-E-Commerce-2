import { useCart } from '@/components/homepage/CartContext';
import { Link } from '@inertiajs/react';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface HeaderProps {
    onNavigateToHome?: () => void;
    onNavigateToProfile?: () => void;
    onNavigateToCart?: () => void;
}

export function Header({
    onNavigateToHome,
    onNavigateToCart,
    onNavigateToProfile,
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart();

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
                            {'beranda'}
                        </a>
                        <a
                            href="#products"
                            className="text-xl font-medium transition-colors hover:text-orange-600"
                        >
                            {'produk'}
                        </a>
                        <a
                            href="#about"
                            className="text-xl font-medium transition-colors hover:text-orange-600"
                        >
                            {'tentang'}
                        </a>
                        <a
                            href="#sustainability"
                            className="text-xl font-medium transition-colors hover:text-orange-600"
                        >
                            {'keberlanjutan'}
                        </a>
                        <a
                            href="#contact"
                            className="text-xl font-medium transition-colors hover:text-orange-600"
                        >
                            {'kontak'}
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
                        <Link
                            className="rounded-full p-2 transition-colors hover:bg-gray-100"
                            aria-label="Profile"
                            href="/profile"
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
