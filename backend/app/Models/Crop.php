<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'type', 'growth_cycle_days',
        'optimal_conditions', 'image', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'optimal_conditions' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function predictions() { return $this->hasMany(Prediction::class); }
}
