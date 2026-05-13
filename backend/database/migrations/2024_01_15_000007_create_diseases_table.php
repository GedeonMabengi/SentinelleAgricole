<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('diseases', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('symptoms');
            $table->text('treatment_recommendations');
            $table->text('prevention_tips');
            $table->string('affected_crops');
            $table->string('severity', 20)->default('medium');
            $table->string('image')->nullable();
            $table->boolean('is_common')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('diseases'); }
};
