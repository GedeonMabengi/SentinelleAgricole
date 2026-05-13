import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const navigation = [
    { name: 'Tableau de bord', href: route('dashboard'), icon: '📊' },
    { name: 'Prédictions', href: route('predictions.index'), icon: '📈' },
    { name: 'Détection maladies', href: route('detection.index'), icon: '🔍' },
    { name: 'Mes parcelles', href: route('plots.index'), icon: '🌱' },
    { name: 'Assistant IA', href: route('chat.index'), icon: '💬' },
    { name: 'Paramètres', href: route('profile.edit'), icon: '⚙️' },
];

export default function AppSidebarLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Overlay mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center h-16 px-6 border-b border-gray-200">
                    <Link href="/" className="text-xl font-extrabold text-green-800">
                        🌾 Sentinelle
                    </Link>
                </div>
                <nav className="mt-6 px-4 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                            activeClassName="bg-green-50 text-green-700"
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Contenu principal */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden -ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Breadcrumbs */}
                        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                            {breadcrumbs.map((crumb, index) => (
                                <span key={index}>
                                    {index > 0 && <span className="mx-2">/</span>}
                                    {crumb.url ? (
                                        <Link href={crumb.url} className="hover:text-green-700">{crumb.title}</Link>
                                    ) : (
                                        <span>{crumb.title}</span>
                                    )}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                {auth.user?.name}
                            </span>
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

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}