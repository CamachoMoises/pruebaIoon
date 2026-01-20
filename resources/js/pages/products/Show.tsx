import AppLayout from '@/layouts/AppLayout';
import { Language, Product } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

interface ProductShowProps {
    product: Product;
    languages: Language[];
    selectedLanguage: number;
}

export default function ProductShow({
    product,
    languages,
    selectedLanguage,
}: ProductShowProps) {
    const detail = product.product_details?.[0];

    return (
        <AppLayout>
            <Head title={detail?.name || 'Product Details'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Link
                            href={`/products?language_id=${selectedLanguage}`}
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                            Volver a productos
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="grid gap-8 p-8 lg:grid-cols-2">
                            {/* Product Image */}
                            <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                                <div className="flex h-full items-center justify-center p-12">
                                    <svg
                                        className="h-48 w-48 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="mb-6">
                                    <label
                                        htmlFor="language"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Ver en idioma:
                                    </label>
                                    <select
                                        id="language"
                                        value={selectedLanguage}
                                        onChange={(e) => {
                                            window.location.href = `/products/${product.id}?language_id=${e.target.value}`;
                                        }}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-auto"
                                    >
                                        {languages.map((lang) => (
                                            <option
                                                key={lang.id}
                                                value={lang.id}
                                            >
                                                {lang.name} ({lang.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                    {detail?.name || 'No name available'}
                                </h1>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">
                                        €{product.price}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                                        {product.status?.name}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                                        Descripción
                                    </h2>
                                    <p className="text-gray-700">
                                        {detail?.description ||
                                            'No description available'}
                                    </p>
                                </div>

                                <div className="space-y-4 border-t border-gray-200 pt-6">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-900">
                                            Categoria
                                        </span>
                                        <span className="text-gray-700">
                                            {product.category?.name || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-900">
                                            UUID
                                        </span>
                                        <span className="font-mono text-sm text-gray-700">
                                            {product.uuid}
                                        </span>
                                    </div>

                                    {product.last_sale && (
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-900">
                                                Ultima venta
                                            </span>
                                            <span className="text-gray-700">
                                                {new Date(
                                                    product.last_sale,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-900">
                                            Creado:
                                        </span>
                                        <span className="text-gray-700">
                                            {new Date(
                                                product.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-900">
                                            Actualizado:
                                        </span>
                                        <span className="text-gray-700">
                                            {new Date(
                                                product.updated_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {detail && (
                                    <div className="mt-6 rounded-lg bg-blue-50 p-4">
                                        <h3 className="mb-2 text-sm font-medium text-blue-900">
                                            Info
                                        </h3>
                                        <div className="space-y-1 text-sm text-blue-700">
                                            <p>
                                                <span className="font-medium">
                                                    Idioma:
                                                </span>{' '}
                                                {detail.language?.name} (
                                                {detail.language?.code})
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    UUID:
                                                </span>{' '}
                                                <span className="font-mono text-xs">
                                                    {detail.uuid}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
