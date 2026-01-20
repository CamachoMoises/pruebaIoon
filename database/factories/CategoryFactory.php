<?php
// database/factories/CategoryFactory.php
namespace Database\Factories;

use App\Models\Category;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $categories = [
            'Electrónica',
            'Ropa',
            'Hogar',
            'Deportes',
            'Libros',
            'Juguetes',
            'Belleza',
            'Salud',
            'Automotriz',
            'Herramientas',
            'Muebles',
            'Jardín',
            'Tecnología',
            'Alimentos',
            'Bebidas',
            'Moda',
            'Calzado',
            'Accesorios',
            'Oficina',
            'Escolar'
        ];

        return [
            'uuid' => Str::uuid(),
            'name' => $this->faker->unique()->randomElement($categories),
            'status_id' => Status::inRandomOrder()->first() ?? Status::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function active()
    {
        return $this->state(function (array $attributes) {
            return [
                'status_id' => Status::where('value', 'activo')->first()->id ??
                    Status::factory()->create(['value' => 'activo'])->id,
            ];
        });
    }
}
