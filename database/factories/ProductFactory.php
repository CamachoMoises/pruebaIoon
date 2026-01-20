<?php
// database/factories/ProductFactory.php
namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $productNames = [
            'Smartphone',
            'Laptop',
            'Tablet',
            'Smart TV',
            'Auriculares',
            'Teclado',
            'Mouse',
            'Monitor',
            'Impresora',
            'Router',
            'Camiseta',
            'Pantalón',
            'Vestido',
            'Chaqueta',
            'Zapatos'
        ];

        return [
            'uuid' => Str::uuid(),
            'price' => $this->faker->randomFloat(2, 10, 5000),
            'category_id' => $this->faker->optional(0.7)->passthrough( // 70% con categoría
                Category::inRandomOrder()->first()->id ?? Category::factory()
            ),
            'status_id' => Status::where('value', 'activo')->first()->id ??
                Status::factory()->create(['value' => 'activo'])->id,
            'last_sale' => $this->faker->optional(0.7)->dateTimeBetween('-1 year', 'now'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    // Nuevos estados para la factory
    public function withCategory()
    {
        return $this->state(function (array $attributes) {
            return [
                'category_id' => Category::inRandomOrder()->first()->id ??
                    Category::factory()->create()->id,
            ];
        });
    }

    public function withoutCategory()
    {
        return $this->state([
            'category_id' => null,
        ]);
    }

    public function withSpecificCategory($categoryId)
    {
        return $this->state([
            'category_id' => $categoryId,
        ]);
    }
}
