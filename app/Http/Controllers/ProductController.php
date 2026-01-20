<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $languageId = $request->get('language_id', Language::where('is_default', true)->first()?->id);

        $products = Product::with([
            'category',
            'status',
            'productDetails' => function ($query) use ($languageId) {
                $query->where('language_id', $languageId);
            }
        ])
        ->whereHas('status', fn($q) => $q->where('value', 'activo'))
        ->latest()
        ->paginate(15);

        $languages = Language::where('status_id', 1)->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'languages' => $languages,
            'selectedLanguage' => $languageId
        ]);
    }

    public function show(Product $product, Request $request): Response
    {
        $languageId = $request->get('language_id', Language::where('is_default', true)->first()?->id);

        $product->load([
            'category',
            'status',
            'productDetails' => function ($query) use ($languageId) {
                $query->where('language_id', $languageId);
            }
        ]);

        $languages = Language::where('status_id', 1)->get();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'languages' => $languages,
            'selectedLanguage' => $languageId
        ]);
    }
}
