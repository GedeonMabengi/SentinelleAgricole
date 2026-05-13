<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->decimal('area_hectares', 10, 2);
            $table->enum('soil_type', ['argileux', 'sableux', 'limoneux', 'argilo_limoneux', 'sableux_limoneux'])->nullable();
            $table->string('gps_coordinates')->nullable();
            $table->string('region');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('plots'); }
};
