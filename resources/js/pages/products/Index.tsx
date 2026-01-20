import AppLayout from '@/layouts/AppLayout';
import { Language, PaginatedData, Product } from '@/types/models';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChangeEvent, useRef, useState } from 'react';

interface ProductsIndexProps {
    products: PaginatedData<Product>;
    languages: Language[];
    selectedLanguage: number;
}

export default function ProductsIndex({
    products,
    languages,
    selectedLanguage,
}: ProductsIndexProps) {
    const [isImportOpen, setIsImportOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        csv_file: null as File | null,
    });

    const handleLanguageChange = (languageId: number) => {
        router.get(
            '/products',
            { language_id: languageId },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('csv_file', e.target.files[0]);
        }
    };

    const handleImportSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.csv_file) {
            alert('Por favor seleciona un archivo CSV para importar.');
            return;
        }

        post('/products/import', {
            forceFormData: true,
            onSuccess: () => {
                setIsImportOpen(false);
                reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleCancelImport = () => {
        setIsImportOpen(false);
        reset();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout>
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Productos
                        </h1>

                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="language"
                                className="text-sm font-medium text-gray-700"
                            >
                                Idioma:
                            </label>
                            <select
                                id="language"
                                value={selectedLanguage}
                                onChange={(e) =>
                                    handleLanguageChange(Number(e.target.value))
                                }
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.name} ({lang.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => setIsImportOpen(!isImportOpen)}
                            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                        >
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Importar CSV
                        </button>
                    </div>
                    {isImportOpen && (
                        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Import Products from CSV
                                </h2>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleImportSubmit}>
                                    {/* CSV Format Info */}
                                    <div className="mb-6 rounded-lg bg-blue-50 p-4">
                                        <h3 className="mb-2 text-sm font-semibold text-blue-900">
                                            CSV Format Requirements
                                        </h3>
                                        <p className="mb-2 text-sm text-blue-800">
                                            Tu archivo CSV debe tener las siguientes
                                            columnas:
                                        </p>
                                        <ul className="list-inside list-disc space-y-1 text-sm text-blue-700">
                                            <li>
                                                <code className="rounded bg-blue-100 px-1">
                                                    categoria
                                                </code>{' '}
                                                - Nombre de la categoria
                                            </li>
                                            <li>
                                                <code className="rounded bg-blue-100 px-1">
                                                    nombre
                                                </code>{' '}
                                                - Nombre del producto (Español)
                                            </li>
                                            <li>
                                                <code className="rounded bg-blue-100 px-1">
                                                    descripcion
                                                </code>{' '}
                                                - Descripcion del Producto
                                                (Español)
                                            </li>
                                            <li>
                                                <code className="rounded bg-blue-100 px-1">
                                                    precio
                                                </code>{' '}
                                                - Precio Producto (decimales,
                                                e.g., 299.99)
                                            </li>
                                            <li>
                                                <code className="rounded bg-blue-100 px-1">
                                                    stock
                                                </code>{' '}
                                                - Stock (Entero)
                                            </li>
                                            <li>
                                                <code className="rounded bg-blue-100 px-1">
                                                    fecha_ultima_venta
                                                </code>{' '}
                                                - Ultima fecha de venta
                                                (YYYY-MM-DD, opcional)
                                            </li>
                                        </ul>
                                        <p className="mt-2 text-xs text-blue-600">
                                            Nota: Todos los productos seran importados por defecto en español.
                                        </p>
                                    </div>

                                    {/* Download Template */}
                                    <div className="mb-6">
                                        <a
                                            href="/products/template"
                                            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
                                        >
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
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            Descargar plantilla CSV
                                        </a>
                                    </div>

                                    {/* File Input */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="csv_file"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Selecionar archivo CSV
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                ref={fileInputRef}
                                                id="csv_file"
                                                type="file"
                                                accept=".tsv,.csv,text/tab-separated-values,text/csv"
                                                onChange={handleFileChange}
                                                className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                            />
                                        </div>
                                        {errors.csv_file && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.csv_file}
                                            </p>
                                        )}
                                        {data.csv_file && (
                                            <p className="mt-2 text-sm text-gray-600">
                                                Selecionado: {data.csv_file.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={handleCancelImport}
                                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                processing || !data.csv_file
                                            }
                                            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg
                                                        className="h-5 w-5 animate-spin"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Procesando...
                                                </>
                                            ) : (
                                                <>
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
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    Importar Productos
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {products.data.length > 0 ? (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {products.data.map((product) => {
                                    const detail = product.product_details?.[0];
                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.id}?language_id=${selectedLanguage}`}
                                            className="group overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
                                        >
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

                                                <div className="mt-3 border-t pt-3">
                                                    <span className="text-xs text-gray-500">
                                                        Categoria:{' '}
                                                        <span className="font-medium text-gray-700">
                                                            {product.category
                                                                ?.name || 'N/A'}
                                                        </span>
                                                    </span>
                                                </div>

                                                {product.last_sale && (
                                                    <div className="mt-2">
                                                        <span className="text-xs text-gray-500">
                                                            Ultima Venta:{' '}
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

                            {products.last_page > 1 && (
                                <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                    <div className="flex flex-1 justify-between sm:hidden">
                                        {products.links[0].url && (
                                            <Link
                                                href={`${products.links[0].url}&language_id=${selectedLanguage}`}
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Prev
                                            </Link>
                                        )}
                                        {products.links[
                                            products.links.length - 1
                                        ].url && (
                                            <Link
                                                href={`${products.links[products.links.length - 1].url}&language_id=${selectedLanguage}`}
                                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Sig
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Listado{' '}
                                                <span className="font-medium">
                                                    {(products.current_page -
                                                        1) *
                                                        products.per_page +
                                                        1}
                                                </span>{' '}
                                                hasta{' '}
                                                <span className="font-medium">
                                                    {Math.min(
                                                        products.current_page *
                                                            products.per_page,
                                                        products.total,
                                                    )}
                                                </span>{' '}
                                                de{' '}
                                                <span className="font-medium">
                                                    {products.total}
                                                </span>{' '}
                                                resultados
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                                {products.links.map(
                                                    (link, index) => (
                                                        <Link
                                                            key={index}
                                                            href={
                                                                link.url
                                                                    ? `${link.url}&language_id=${selectedLanguage}`
                                                                    : '#'
                                                            }
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
                                                                products.links
                                                                    .length -
                                                                    1
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
                                                    ),
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
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No se encontraron productos
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Carga algunos para comenzar
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
