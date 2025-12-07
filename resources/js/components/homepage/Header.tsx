import { Menu, User } from 'lucide-react';
// import img from '/logo-pbp.png';

import { useState } from 'react';
import { Button } from '../ui/button';

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src="/images/logo-pbp.png"
                            // alt="TAGIDA Naturals Logo"
                            className="h-16 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-8 md:flex">
                        <a
                            href="/"
                            className="text-xl font-medium transition-colors hover:text-green-600"
                        >
                            {'Home'}
                        </a>
                        <a
                            href="#products"
                            className="text-xl font-medium transition-colors hover:text-green-600"
                        >
                            {'Product'}
                        </a>
                        <a
                            href="#about"
                            className="text-xl font-medium transition-colors hover:text-green-600"
                        >
                            {'About'}
                        </a>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* <LanguageSwitcher /> */}
                        {/* <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex"
                        >
                            <Search className="h-4 w-4" />
                        </Button> */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex"
                        >
                            <User className="h-4 w-4" />
                        </Button>
                        {/* <Button
                            variant="ghost"
                            size="sm"
                            onClick={onCartClick}
                            className="relative"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {cartItemCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 p-0">
                                    {cartItemCount}
                                </Badge>
                            )}
                        </Button> */}

                        {/* Mobile Menu Button */}
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

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="mt-4 border-t pt-4 pb-4 md:hidden">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#home"
                                className="transition-colors hover:text-green-600"
                            >
                                {'home'}
                            </a>
                            <a
                                href="#products"
                                className="transition-colors hover:text-green-600"
                            >
                                {'products'}
                            </a>
                            <a
                                href="#about"
                                className="transition-colors hover:text-green-600"
                            >
                                {'about'}
                            </a>
                            <a
                                href="#sustainability"
                                className="transition-colors hover:text-green-600"
                            >
                                {'sustainability'}
                            </a>
                            <a
                                href="#contact"
                                className="transition-colors hover:text-green-600"
                            >
                                {'contact'}
                            </a>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
