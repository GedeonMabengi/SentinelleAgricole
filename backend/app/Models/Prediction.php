<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prediction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'plot_id', 'crop_id', 'crop_name', 'area_hectares',
        'region', 'rainfall_mm', 'soil_type', 'fertilizer_used',
        'fertilizer_type', 'avg_temperature', 'humidity_percent',
        'predicted_yield_tons', 'confidence_percent', 'input_parameters',
        'feature_importance', 'status',
    ];

    protected function casts(): array
    {
        return [
            'fertilizer_used' => 'boolean',
            'input_parameters' => 'array',
            'feature_importance' => 'array',
        ];
    }

    public function user() { return $this->belongsTo(User::class); }
    public function plot() { return $this->belongsTo(Plot::class); }
    public function crop() { return $this->belongsTo(Crop::class); }
}
