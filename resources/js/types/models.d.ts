export interface Status {
    id: number;
    name: string;
    value: 'activo' | 'inactivo' | 'en_proceso';
    created_at: string;
    updated_at: string;
}

export interface Language {
    id: number;
    uuid: string;
    name: string;
    code: string;
    status_id: number;
    is_default: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status?: Status;
}

export interface Category {
    id: number;
    uuid: string;
    name: string;
    status_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status?: Status;
    products?: Product[];
    products_count?: number;
}

export interface Product {
    id: number;
    uuid: string;
    stock: number;
    price: number;
    category_id: number;
    status_id: number;
    last_sale: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    category?: Category;
    status?: Status;
    product_details?: ProductDetail[];
}

export interface ProductDetail {
    id: number;
    uuid: string;
    name: string;
    description: string | null;
    product_id: number;
    language_id: number;
    status_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    product?: Product;
    language?: Language;
    status?: Status;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}