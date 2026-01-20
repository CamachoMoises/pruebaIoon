<?php
// database/factories/StatusFactory.php
namespace Database\Factories;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

class StatusFactory extends Factory
{
    protected $model = Status::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Activo', 'Inactivo', 'En Proceso',
                'Pendiente', 'Completado', 'Cancelado'
            ]),
            'value' => $this->faker->unique()->randomElement([
                'activo', 'inactivo', 'en_proceso',
                'pendiente', 'completado', 'cancelado'
            ]),
        ];
    }

    // Estados predefinidos
    public function activo()
    {
        return $this->state([
            'name' => 'Activo',
            'value' => 'activo',
        ]);
    }

    public function inactivo()
    {
        return $this->state([
            'name' => 'Inactivo',
            'value' => 'inactivo',
        ]);
    }

    public function enProceso()
    {
        return $this->state([
            'name' => 'En Proceso',
            'value' => 'en_proceso',
        ]);
    }
}
