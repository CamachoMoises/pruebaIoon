<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->integer('stock');
            $table->decimal('price', 10, 2);
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->onDelete('set null');
            $table->foreignId('status_id')->constrained('statuses')->default(1);
            $table->timestamp('last_sale')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('uuid');
            $table->index('category_id');
            $table->index('status_id');
            $table->index('last_sale');
            $table->index(['category_id', 'status_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
