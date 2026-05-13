import { Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

export default function AppHeaderLayout({ children, breadcrumbs }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    const { auth, flash } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="text-xl font-extrabold text-green-800">
                        🌾 Sentinelle Agricole
                    </Link>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700">{auth.user?.name}</span>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium"
                        >
                            Déconnexion
                        </Link>
                    </div>
                </div>
            </header>

            {/* Flash messages */}
            {flash?.success && (
                <div className="mx-4 mt-4 sm:mx-6 lg:mx-8">
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-sm">
                        {flash.success}
                    </div>
                </div>
            )}
            {flash?.error && (
                <div className="mx-4 mt-4 sm:mx-6 lg:mx-8">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm">
                        {flash.error}
                    </div>
                </div>
            )}

            {/* Contenu */}
            <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
    );
}