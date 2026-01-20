<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name', 100)->unique();
            $table->string('code', 10)->unique()->comment('Código ISO: es, en, fr, etc.');
            $table->foreignId('status_id')->constrained('statuses')->default(1);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index('uuid');
            $table->index('name');
            $table->index('code');
            $table->index('status_id');
            $table->index('is_default');
        });

        // Insertar idiomas por defecto
        DB::table('languages')->insert([
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Español',
                'code' => 'es',
                'status_id' => DB::table('statuses')->where('value', 'activo')->value('id'),
                'is_default' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'English',
                'code' => 'en',
                'status_id' => DB::table('statuses')->where('value', 'activo')->value('id'),
                'is_default' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Frances',
                'code' => 'fr',
                'status_id' => DB::table('statuses')->where('value', 'activo')->value('id'),
                'is_default' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('languages');
    }
};