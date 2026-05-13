import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {/* Colonne gauche décorative */}
            <div className="relative hidden lg:flex flex-col bg-green-800 p-10 text-white">
                <div className="absolute inset-0 bg-[url('/images/agriculture-bg.jpg')] bg-cover bg-center opacity-20" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <span className="text-3xl mr-2">🌾</span>
                    {name}
                </div>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg leading-relaxed">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-green-200">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>

            {/* Colonne droite : formulaire */}
            <div className="flex items-center justify-center p-6 lg:p-8 bg-gradient-to-br from-green-50 to-white">
                <div className="mx-auto w-full sm:w-[350px]">
                    <Link href={route('home')} className="flex items-center justify-center mb-8 lg:hidden">
                        <span className="text-3xl">🌾</span>
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center mb-6">
                        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}