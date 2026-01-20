<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Language;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::with('status')
            ->withCount('products')
            ->latest()
            ->paginate(15);

        return Inertia::render('categories/Index', [
            'categories' => $categories
        ]);
    }

    public function show(string $id): Response
    {
        $category = Category::findOrFail($id);

        $defaultLanguage = Language::where('is_default', true)->first();

        $category->load([
            'status',
            'products' => function ($query) use ($defaultLanguage) {
                $query->with([
                    'status',
                    'productDetails' => function ($q) use ($defaultLanguage) {
                        $q->where('language_id', $defaultLanguage->id);
                    }
                ]);
            }
        ]);

        return Inertia::render('categories/Show', [
            'category' => $category
        ]);
    }
}
