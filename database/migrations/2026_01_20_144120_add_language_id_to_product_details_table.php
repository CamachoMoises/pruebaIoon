<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_details', function (Blueprint $table) {
            $table->foreignId('language_id')
                  ->nullable()
                  ->after('product_id')
                  ->constrained('languages')
                  ->onDelete('set null');

            $table->unique(['product_id', 'language_id']);

            $table->index('language_id');
        });
    }

    public function down(): void
    {
        Schema::table('product_details', function (Blueprint $table) {
            $table->dropForeign(['language_id']);
            $table->dropUnique(['product_id', 'language_id']);
            $table->dropIndex(['language_id']);
            $table->dropColumn('language_id');
        });
    }
};