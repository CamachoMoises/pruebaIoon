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

        return Inertia::render('products/Index', [
            'products' => $products,
            'languages' => $languages,
            'selectedLanguage' => $languageId
        ]);
    }

    public function show(string $id, Request $request): Response
    {
        $product = Product::with(['category', 'status'])
            ->findOrFail($id);

        $languageId = $request->get('language_id', Language::where('is_default', true)->first()?->id);

        $product->load([
            'productDetails' => function ($query) use ($languageId) {
                $query->where('language_id', $languageId);
            }
        ]);

        $languages = Language::where('status_id', 1)->get();

        return Inertia::render('products/Show', [
            'product' => $product,
            'languages' => $languages,
            'selectedLanguage' => $languageId
        ]);
    }
}