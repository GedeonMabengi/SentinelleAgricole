import { Head } from '@inertiajs/react';

export default function PublicLayout({ children, title }) {
    return (
        <>
            <Head title={title ?? 'Sentinelle Agricole'} />
            {children}
        </>
    );
}