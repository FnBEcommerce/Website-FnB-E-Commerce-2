import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { SearchProvider } from '@/context/search-provider';
import { Dashboard } from '@/features/dashboard';

export default function AdminPage() {
    return (
        <AuthenticatedLayout>
            <SearchProvider>
                <Dashboard />
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
