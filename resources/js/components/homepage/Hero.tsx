import { Link } from '@inertiajs/react';
import { Globe, Leaf, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from './LanguageContext';
// import greenBackground from 'figma:asset/af8f9c76d5e9d20cdce79be680203c8c9e0c8526.png';

export function Hero() {
    const { t } = useLanguage();

    return (
        <section id="home" className="relative flex min-h-screen items-center">
            {/* Background */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 bg-cover bg-center py-16 text-white"
                // style={{ backgroundImage: `url(${greenBackground})` }}
            />
            <div className="absolute inset-0 bg-black/10" />{' '}
            {/* Subtle overlay for text readability */}
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl leading-tight font-bold text-white drop-shadow-lg md:text-6xl">
                                {t('heroTitle')}
                                <span className="text-white">
                                    {' '}
                                    {t('heroTitleHighlight')}
                                </span>
                            </h1>
                            <p className="max-w-xl text-lg text-white/90 drop-shadow-md">
                                {t('heroDescription')}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <Leaf className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {t('ecoFriendly')}
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        {t('sustainablePackaging')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {t('longLasting')}
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        {t('shelfLife')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <Shield className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {t('nutrientRich')}
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        {t('nutritionRetained')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <Globe className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {t('accessible')}
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        {t('easyPreparation')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link href="/products">
                                <Button
                                    size="lg"
                                    className="cursor-pointer bg-white text-primary shadow-lg hover:bg-white/90"
                                >
                                    {t('checkOurProducts')}
                                </Button>
                            </Link>

                            <Link href="#why-us">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="cursor-pointer border-white text-white backdrop-blur-sm hover:bg-white/10"
                                >
                                    {t('learnMore')}
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center space-x-6 text-sm text-white/90">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                <span>{t('freeShipping')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                <span>{t('dayReturns')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                <span>{t('natural')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="images/menu.jpg"
                                alt="Premium freeze dried fruits and vegetables"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 rounded-xl bg-orange-500 p-4 shadow-lg backdrop-blur-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">
                                    100%
                                </div>
                                <div className="text-sm text-white">Halal</div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 rounded-xl bg-orange-500 p-4 shadow-lg backdrop-blur-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">
                                    98%
                                </div>
                                <div className="text-sm text-white">
                                    Berkualitas
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
