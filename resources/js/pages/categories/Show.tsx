import AppLayout from '@/layouts/AppLayout';
import { Category } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface CategoryShowProps {
    category: Category;
}

export default function CategoryShow({ category }: CategoryShowProps) {
    const [selectedLanguage, setSelectedLanguage] = useState(1);

    return (
        <AppLayout>
            <Head title={category.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Link
                            href="/categories"
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                            Volver a categorias
                        </Link>
                    </div>

                    {/* Category Header */}
                    <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-12 text-white">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-white/20 p-4">
                                    <svg
                                        className="h-12 w-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold">
                                        {category.name}
                                    </h1>
                                    <p className="mt-2 text-indigo-100">
                                        {category.products?.length || 0}{' '}
                                        {category.products?.length === 1
                                            ? 'producto'
                                            : 'productss'}{' '}
                                        en esta categoria
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-6">
                            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Estatus
                                    </dt>
                                    <dd className="mt-1">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                                category.status?.value ===
                                                'activo'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {category.status?.name}
                                        </span>
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        UUID
                                    </dt>
                                    <dd className="mt-1 font-mono text-sm text-gray-900">
                                        {category.uuid}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Creado
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(
                                            category.created_at,
                                        ).toLocaleDateString('es', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Products in Category */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                            Productos en esta categoria
                        </h2>

                        {category.products && category.products.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {category.products.map((product) => {
                                    const detail = product.product_details?.[0];
                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.id}?language_id=${selectedLanguage}`}
                                            className="group overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
                                        >
                                            {/* Product Image Placeholder */}
                                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                                                <div className="flex h-full items-center justify-center">
                                                    <svg
                                                        className="h-20 w-20 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4">
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                                                    {detail?.name ||
                                                        'No name available'}
                                                </h3>

                                                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                                    {detail?.description ||
                                                        'No description available'}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-xl font-bold text-gray-900">
                                                        €{product.price}
                                                    </span>

                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                        {product.status?.name}
                                                    </span>
                                                </div>

                                                {/* Last Sale */}
                                                {product.last_sale && (
                                                    <div className="mt-3 border-t pt-3">
                                                        <span className="text-xs text-gray-500">
                                                            Ultima venta:{' '}
                                                            {new Date(
                                                                product.last_sale,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="rounded-lg bg-white p-12 text-center shadow">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    No products in this category
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This category doesn't have any products yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
