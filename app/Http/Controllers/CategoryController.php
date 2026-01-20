<?php

namespace App\Http\Controllers;

use App\Models\Category;
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

        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function show(Category $category): Response
    {
        $category->load(['status', 'products.productDetails']);

        return Inertia::render('Categories/Show', [
            'category' => $category
        ]);
    }
}