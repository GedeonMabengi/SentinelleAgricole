<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiseaseDetection extends Model
{
    use HasFactory;

    protected $table = 'disease_detections';

    protected $fillable = [
        'user_id', 'plot_id', 'image_path', 'image_thumbnail',
        'detected_disease', 'confidence_percent', 'recommendations',
        'top_predictions', 'status', 'processed_at',
    ];

    protected function casts(): array
    {
        return [
            'top_predictions' => 'array',
            'processed_at' => 'datetime',
        ];
    }

    public function user() { return $this->belongsTo(User::class); }
    public function plot() { return $this->belongsTo(Plot::class); }
}
