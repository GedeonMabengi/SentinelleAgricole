<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('disease_detections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('plot_id')->nullable()->constrained()->onDelete('set null');
            $table->string('image_path');
            $table->string('image_thumbnail')->nullable();
            $table->string('detected_disease')->nullable();
            $table->decimal('confidence_percent', 5, 2)->nullable();
            $table->text('recommendations')->nullable();
            $table->json('top_predictions')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('disease_detections'); }
};
