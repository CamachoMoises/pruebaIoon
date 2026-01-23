<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Http\Response as HttpResponse;

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

    public function downloadTemplate(): HttpResponse
    {
        $csvContent = "categoria,nombre,descripcion,precio,stock,fecha_ultima_venta\n";
        $csvContent .= "Electrónica,,,,,\n";
        $csvContent .= "Electrónica,Smartphone XYZ,Teléfono inteligente con cámara de 48MP,299.99,50,2026-01-15\n";
        $csvContent .= "Electrónica,Tablet ABC,Tablet de 10 pulgadas con stylus,199.99,30,2026-01-10\n";
        $csvContent .= "Ropa,,,,,\n";
        $csvContent .= "Ropa,Camiseta Deportiva,Camiseta de alto rendimiento,49.99,100,2026-01-18\n";
        $csvContent .= "Ropa,Pantalón Jogger,Pantalón deportivo cómodo,79.99,75,2026-01-12\n";
        $csvContent .= "Hogar,,,,,\n";
        $csvContent .= "Hogar,Cafetera Automática,Cafetera programable con molinillo,129.99,30,\n";

        return response($csvContent, 200)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="products_template.csv"');
    }

    public function import(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt,tsv|max:10240', // Max 10MB
        ]);
        try {
            $file = $request->file('csv_file');
            $content = file_get_contents($file->getRealPath());

            $encoding = mb_detect_encoding($content, ['UTF-8', 'ISO-8859-1', 'Windows-1252'], true);
            if ($encoding !== 'UTF-8') {
                $content = mb_convert_encoding($content, 'UTF-8', $encoding);
            }

            $rows = array_map(function ($line) {
                return str_getcsv($line, ",");
            }, explode("\n", $content));
            if (count($rows) < 2) {
                return back()->withErrors(['csv_file' => 'El archivo CSV está vacío o no tiene el formato correcto.']);
            }
            $headers = array_map('trim', $rows[0]);
            $requiredHeaders = ['categoria', 'nombre', 'descripcion', 'precio', 'stock', 'fecha_ultima_venta'];
            $missingHeaders = array_diff($requiredHeaders, $headers);
            if (!empty($missingHeaders)) {
                return back()->withErrors(['csv_file' => 'Faltan las siguientes columnas obligatorias: ' . implode(', ', $missingHeaders)]);
            }
            $spanishLanguage = Language::where('code', 'es')->first();
            if (!$spanishLanguage) {
                return back()->withErrors(['csv_file' => 'El idioma español no está configurado en el sistema.']);
            }
            $currentCategory = Category::where('name', '')->first();
            $currentCategoryName = null;
            $importedCount = 0;
            $errors = [];
            for ($i = 1; $i < count($rows); $i++) {
                $row = $rows[$i];
                if (empty(array_filter($row))) {
                    continue;
                }
                $data = array_combine($headers, $row);
                $categoria = trim($data['categoria'] ?? '');
                $nombre = trim($data['nombre'] ?? '');
                if ($categoria && !$nombre) {
                    $currentCategory = Category::firstOrCreate(
                        ['name' => $categoria],
                        [
                            'uuid' => Str::uuid(),
                            'status_id' => 1,
                        ]
                    );
                    $currentCategoryName = $categoria;

                    continue;
                }
                if (!empty($nombre)) {
                    if (!$currentCategory) {
                        $errors[] = "Fila " . ($i + 1) . ": Producto '$nombre' no tiene categoría definida.";
                        continue;
                    }
                }
                if (!empty($categoria) && $categoria !== $currentCategoryName) {
                    $errors[] = "Fila " . ($i + 1) . ": Producto '$nombre' tiene categoría '$categoria' pero debería ser '$currentCategoryName'.";
                    continue;
                }
                $precio = trim($data['precio'] ?? '');
                $descripcion = trim($data['descripcion'] ?? '');
                $stock = trim($data['stock'] ?? '');
                if (empty($precio) || !is_numeric($precio)) {
                    $errors[] = "Fila " . ($i + 1) . ": Producto '$nombre' tiene precio inválido.";
                    continue;
                }
                if (empty($stock) || !is_numeric($stock) || intval($stock) < 0) {
                    $errors[] = "Fila " . ($i + 1) . ": Producto '$nombre' tiene stock inválido.";
                    continue;
                }
                try {
                    $fechaUltVenta = !empty(trim($data['fecha_ultima_venta'] ?? ''))
                        ? trim($data['fecha_ultima_venta'])
                        : null;
                    $product = Product::create([
                        'uuid' => Str::uuid(),
                        'price' => floatval($precio),
                        'stock' => intval($stock),
                        'category_id' => $currentCategory->id,
                        'status_id' => 1,
                        'last_sale' => $fechaUltVenta,
                    ]);
                    ProductDetail::create([
                        'uuid' => Str::uuid(),
                        'name' => $nombre,
                        'description' => $descripcion,
                        'product_id' => $product->id,
                        'language_id' => $spanishLanguage->id,
                        'status_id' => 1,
                    ]);
                    $importedCount++;
                } catch (\Exception $e) {
                    $errors[] = "Fila " . ($i + 1) . ": Error al crear producto '$nombre': " . $e->getMessage();
                }
            }

            if ($importedCount > 0 && empty($errors)) {
                return redirect()->route('products.index')
                    ->with('success', "Se importaron $importedCount productos exitosamente.");
            } elseif ($importedCount > 0 && !empty($errors)) {
                return redirect()->route('products.index')
                    ->with('warning', "Se importaron $importedCount productos. Errores encontrados: " . implode('; ', array_slice($errors, 0, 5)));
            } else {
                return back()->withErrors(['csv_file' => 'No se pudo importar ningún producto. ' . implode('; ', array_slice($errors, 0, 5))]);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['csv_file' => 'Error al procesar el archivo: ' . $e->getMessage()]);
        }
    }
}
