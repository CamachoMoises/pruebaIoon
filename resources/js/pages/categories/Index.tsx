import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Category, PaginatedData } from '@/types/models';

interface CategoriesIndexProps {
    categories: PaginatedData<Category>;
}

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    let linkNext = categories.links[ categories.links.length - 1 ].url;
    return (
        <AppLayout>
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Categorias
                        </h1>

                    </div>

                    {/* Categories Grid */}
                    {categories.data.length > 0 ? (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {categories.data.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categories/${category.id}`}
                                        className="group overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-xl"
                                    >
                                        {/* Category Icon/Image */}
                                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
                                            <div className="flex items-center justify-center">
                                                <svg
                                                    className="h-16 w-16 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Category Info */}
                                        <div className="p-6">
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                                                {category.name}
                                            </h3>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <svg
                                                        className="h-5 w-5"
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
                                                    <span>
                                                        {category.products_count || 0}{' '}
                                                        {category.products_count === 1
                                                            ? 'producto'
                                                            : 'productos'}
                                                    </span>
                                                </div>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        category.status?.value ===
                                                        'activo'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {category.status?.name}
                                                </span>
                                            </div>

                                            {/* Additional Info */}
                                            <div className="mt-4 border-t border-gray-100 pt-4">
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>
                                                        Creada:{' '}
                                                        {new Date(
                                                            category.created_at
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-indigo-600 group-hover:text-indigo-800">
                                                        Detalles
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {categories.last_page > 1 && (
                                <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                    <div className="flex flex-1 justify-between sm:hidden">
                                        {categories.links[0].url && (
                                            <Link
                                                href={categories.links[0].url}
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {linkNext &&  (
                                            <Link
                                                href={linkNext}
                                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing{' '}
                                                <span className="font-medium">
                                                    {(categories.current_page -
                                                        1) *
                                                        categories.per_page +
                                                        1}
                                                </span>{' '}
                                                to{' '}
                                                <span className="font-medium">
                                                    {Math.min(
                                                        categories.current_page *
                                                            categories.per_page,
                                                        categories.total
                                                    )}
                                                </span>{' '}
                                                of{' '}
                                                <span className="font-medium">
                                                    {categories.total}
                                                </span>{' '}
                                                results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                                {categories.links.map(
                                                    (link, index) => (
                                                        <Link
                                                            key={index}
                                                            href={link.url || '#'}
                                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                                link.active
                                                                    ? 'z-10 bg-indigo-600 text-white focus:z-20'
                                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                                            } ${
                                                                index === 0
                                                                    ? 'rounded-l-md'
                                                                    : ''
                                                            } ${
                                                                index ===
                                                                categories.links
                                                                    .length - 1
                                                                    ? 'rounded-r-md'
                                                                    : ''
                                                            } ${
                                                                !link.url
                                                                    ? 'cursor-not-allowed opacity-50'
                                                                    : ''
                                                            } border border-gray-300`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
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
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No categories found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by creating a new category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}