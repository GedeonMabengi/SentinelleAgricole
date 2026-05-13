<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherData extends Model
{
    use HasFactory;

    protected $table = 'weather_data';

    protected $fillable = [
        'region', 'date', 'rainfall_mm', 'avg_temperature',
        'min_temperature', 'max_temperature', 'humidity_percent',
        'wind_speed', 'weather_description', 'source',
    ];

    protected function casts(): array
    {
        return ['date' => 'date'];
    }
}
