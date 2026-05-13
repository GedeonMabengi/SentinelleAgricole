import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 flex flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {/* Logo + Titre */}
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <span className="text-3xl">🌾</span>
                            <span className="text-2xl font-extrabold text-green-800">Sentinelle Agricole</span>
                        </Link>
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                            <p className="text-sm text-gray-600">{description}</p>
                        </div>
                    </div>
                    {/* Contenu (formulaires) */}
                    <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}