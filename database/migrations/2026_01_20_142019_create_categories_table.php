<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->uuid('uuid')->unique();
            $table->foreignId('status_id')->constrained('statuses')->default(1);
            $table->timestamps();
            $table->softDeletes();

            $table->index('name');
            $table->index('uuid');
            $table->index('status_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
