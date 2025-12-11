import { AdminDashboard } from '@/features/admin';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { SearchProvider } from '@/context/search-provider';

export default function AdminPage() {
    return (
        <AuthenticatedLayout>
            <SearchProvider>
                <AdminDashboard />
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
