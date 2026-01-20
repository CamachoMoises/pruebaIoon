<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->string('value', 20)->unique()->comment('activo, inactivo, en proceso');
            $table->timestamps();
        });

        // Insertar datos iniciales
        DB::table('statuses')->insert([
            ['name' => 'Activo', 'value' => 'activo', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Inactivo', 'value' => 'inactivo', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'En Proceso', 'value' => 'en proceso', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('statuses');
    }
};
