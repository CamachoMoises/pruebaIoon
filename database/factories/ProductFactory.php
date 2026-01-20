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
            // 'id' NO se incluye aquí - es auto-increment
            'uuid' => Str::uuid(),
            'stock'=> $this->faker->numberBetween(0, 20),
            'price' => $this->faker->randomFloat(2, 10, 5000),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            'status_id' => Status::inRandomOrder()->first()->id ?? Status::factory(),
            'last_sale' => $this->faker->optional(0.7)->dateTimeBetween('-1 year', 'now'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
