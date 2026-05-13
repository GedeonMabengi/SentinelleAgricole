<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('predictions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('plot_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('crop_id')->nullable()->constrained()->onDelete('set null');
            $table->string('crop_name');
            $table->decimal('area_hectares', 10, 2);
            $table->string('region');
            $table->decimal('rainfall_mm', 8, 2)->nullable();
            $table->enum('soil_type', ['argileux', 'sableux', 'limoneux', 'argilo_limoneux', 'sableux_limoneux'])->nullable();
            $table->boolean('fertilizer_used')->default(false);
            $table->string('fertilizer_type')->nullable();
            $table->decimal('avg_temperature', 5, 2)->nullable();
            $table->decimal('humidity_percent', 5, 2)->nullable();
            $table->decimal('predicted_yield_tons', 10, 2);
            $table->decimal('confidence_percent', 5, 2);
            $table->json('input_parameters');
            $table->json('feature_importance')->nullable();
            $table->enum('status', ['pending', 'completed', 'failed'])->default('completed');
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('predictions'); }
};
