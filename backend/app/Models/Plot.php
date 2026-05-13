<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plot extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'area_hectares', 'soil_type',
        'gps_coordinates', 'region', 'notes',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function predictions() { return $this->hasMany(Prediction::class); }
    public function diseaseDetections() { return $this->hasMany(DiseaseDetection::class); }
}
