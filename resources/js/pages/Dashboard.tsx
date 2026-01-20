import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Product } from '@/types/models';

interface DashboardProps {
    stats: {
        total_products: number;
        total_categories: number;
        active_languages: number;
        recent_products: Product[];
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">
                        Inicio
                    </h1>

                    {/* Stats Grid */}
                    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <svg
                                            className="h-8 w-8 text-blue-600"
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
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Productos totales
                                            </dt>
                                            <dd className="text-3xl font-semibold text-gray-900">
                                                {stats.total_products}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <svg
                                            className="h-8 w-8 text-green-600"
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
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Categories
                                            </dt>
                                            <dd className="text-3xl font-semibold text-gray-900">
                                                {stats.total_categories}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <svg
                                            className="h-8 w-8 text-purple-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Active Languages
                                            </dt>
                                            <dd className="text-3xl font-semibold text-gray-900">
                                                {stats.active_languages}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Products */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 bg-white px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Recent Products
                            </h2>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {stats.recent_products.map((product) => (
                                <li key={product.id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {product.product_details?.[0]?.name ||
                                                    'No name'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {product.category?.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-900">
                                                ${product.price}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(
                                                    product.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}