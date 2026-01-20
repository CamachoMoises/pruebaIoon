<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Language;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
            'active_languages' => Language::where('status_id', 1)->count(),
            'recent_products' => Product::with(['productDetails', 'category'])
                ->latest()
                ->take(5)
                ->get(),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}