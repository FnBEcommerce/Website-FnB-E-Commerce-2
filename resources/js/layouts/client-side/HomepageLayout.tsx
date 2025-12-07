import { Footer } from '@/components/homepage/Footer';
import { Header } from '@/components/homepage/Header';
import { LanguageProvider } from '@/components/homepage/LanguageContext';
import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function HomepageLayout({ children }: LayoutProps) {
    return (
        <LanguageProvider>
            <div className="min-h-screen">
                <Header />

                {children}

                <Footer />
            </div>
        </LanguageProvider>
    );
}
