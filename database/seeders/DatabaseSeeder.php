<?php
// database/seeders/DatabaseSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('product_details')->truncate();
        DB::table('products')->truncate();
        DB::table('categories')->truncate();
        DB::table('languages')->truncate();
        DB::table('statuses')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $statuses = [
            ['id' => 1, 'name' => 'Activo', 'value' => 'activo'],
            ['id' => 2, 'name' => 'Inactivo', 'value' => 'inactivo'],
            ['id' => 3, 'name' => 'En Proceso', 'value' => 'en_proceso'],
        ];

        foreach ($statuses as $status) {
            DB::table('statuses')->updateOrInsert(
                ['id' => $status['id']],
                [
                    'name' => $status['name'],
                    'value' => $status['value'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        $languages = [
            ['id' => 1, 'name' => 'Español', 'code' => 'es', 'is_default' => true],
            ['id' => 2, 'name' => 'English', 'code' => 'en', 'is_default' => false],
            ['id' => 3, 'name' => 'Français', 'code' => 'fr', 'is_default' => false],
        ];

        foreach ($languages as $language) {
            DB::table('languages')->updateOrInsert(
                ['id' => $language['id']],
                [
                    'uuid' => Str::uuid(),
                    'name' => $language['name'],
                    'code' => $language['code'],
                    'status_id' => 1, // Activo
                    'is_default' => $language['is_default'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        // 4. Crear categorías
        $categories = [
            ['id' => 1, 'name' => 'Electrónica'],
            ['id' => 2, 'name' => 'Ropa'],
            ['id' => 3, 'name' => 'Hogar'],
            ['id' => 4, 'name' => 'Deportes'],
            ['id' => 5, 'name' => 'Libros'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->updateOrInsert(
                ['id' => $category['id']],
                [
                    'uuid' => Str::uuid(),
                    'name' => $category['name'],
                    'status_id' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }


        $products = [];
        $productCounter = 1;

        foreach ($categories as $category) {
            for ($i = 1; $i <= 5; $i++) {
                $products[] = [
                    'uuid' => Str::uuid(),
                    'stock' => rand(10, 100),
                    'price' => rand(1000, 50000) / 100,
                    'category_id' => $category['id'],
                    'status_id' => 1,
                    'last_sale' => rand(0, 1) ? now()->subDays(rand(1, 30)) : null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
                $productCounter++;
            }
        }
        // crear productos sin categoria
        for ($i = 1; $i <= 5; $i++) {
            $products[] = [
                'uuid' => Str::uuid(),
                'stock' => rand(10, 100),
                'price' => rand(1000, 50000) / 100,
                'category_id' => null,
                'status_id' => 1,
                'last_sale' => rand(0, 1) ? now()->subDays(rand(1, 30)) : null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $productCounter++;
        }

        DB::table('products')->insert($products);

        $productDetails = [];
        $productIds = DB::table('products')->pluck('id');

        foreach ($productIds as $productId) {
            $productDetails[] = [
                'uuid' => Str::uuid(),
                'name' => 'Producto ' . $productId,
                'description' => 'Descripción detallada del producto ' . $productId . ' en español.',
                'product_id' => $productId,
                'language_id' => 1,
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if (rand(1, 100) <= 70) {
                $productDetails[] = [
                    'uuid' => Str::uuid(),
                    'name' => 'Product ' . $productId,
                    'description' => 'Detailed description of product ' . $productId . ' in English.',
                    'product_id' => $productId,
                    'language_id' => 2,
                    'status_id' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            if (rand(1, 100) <= 30) {
                $productDetails[] = [
                    'uuid' => Str::uuid(),
                    'name' => 'Produit ' . $productId,
                    'description' => 'Description détaillée du produit ' . $productId . ' en français.',
                    'product_id' => $productId,
                    'language_id' => 3,
                    'status_id' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('product_details')->insert($productDetails);

        $this->command->info('Seeder ejecutado');
        $this->command->info('- Status:' . DB::table('statuses')->count());
        $this->command->info('- Idiomas:' . DB::table('languages')->count());
        $this->command->info('- Categorías:' . DB::table('categories')->count());
        $this->command->info('- Productos:' . DB::table('products')->count());
        $this->command->info('- Detalles:' . DB::table('product_details')->count());
    }
}