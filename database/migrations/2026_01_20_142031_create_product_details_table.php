<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_details', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name', 200);
            $table->text('description')->nullable();
            $table->foreignId('status_id')->constrained('statuses')->default(1);
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();

            $table->index('uuid');
            $table->index('name');
            $table->index('status_id');
            $table->index('product_id');
            $table->fulltext(['name', 'description']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_details');
    }
};
