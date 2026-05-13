<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weather_data', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->date('date');
            $table->decimal('rainfall_mm', 8, 2)->nullable();
            $table->decimal('avg_temperature', 5, 2)->nullable();
            $table->decimal('min_temperature', 5, 2)->nullable();
            $table->decimal('max_temperature', 5, 2)->nullable();
            $table->decimal('humidity_percent', 5, 2)->nullable();
            $table->decimal('wind_speed', 5, 2)->nullable();
            $table->string('weather_description')->nullable();
            $table->string('source')->default('openweathermap');
            $table->timestamps();
            $table->unique(['region', 'date']);
        });
    }

    public function down(): void { Schema::dropIfExists('weather_data'); }
};
