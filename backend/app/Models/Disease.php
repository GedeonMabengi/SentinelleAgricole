<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'symptoms',
        'treatment_recommendations', 'prevention_tips',
        'affected_crops', 'severity', 'image', 'is_common',
    ];

    protected function casts(): array
    {
        return ['is_common' => 'boolean'];
    }
}
