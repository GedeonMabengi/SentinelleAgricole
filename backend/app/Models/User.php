<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'avatar',
        'region',
        'language',
        'notifications_enabled',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'notifications_enabled' => 'boolean',
        ];
    }

    public function plots() { return $this->hasMany(Plot::class); }
    public function predictions() { return $this->hasMany(Prediction::class); }
    public function diseaseDetections() { return $this->hasMany(DiseaseDetection::class); }
    public function conversations() { return $this->hasMany(Conversation::class); }
    public function isAdmin(): bool { return $this->role === 'admin'; }
    public function isAgronomist(): bool { return $this->role === 'agronomist'; }
    public function isFarmer(): bool { return $this->role === 'farmer'; }
}
