import { Link } from '@inertiajs/react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 flex flex-col items-center justify-center p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link href={route('home')} className="flex items-center gap-2 self-center font-medium">
                    <span className="text-3xl">🌾</span>
                    <span className="text-2xl font-extrabold text-green-800">Sentinelle Agricole</span>
                </Link>

                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100">
                        <div className="px-10 pt-8 pb-0 text-center">
                            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                            <p className="text-sm text-gray-600 mt-2">{description}</p>
                        </div>
                        <div className="px-10 py-8">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}