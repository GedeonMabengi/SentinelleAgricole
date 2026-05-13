<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id', 'role', 'content', 'metadata', 'tokens_used',
    ];

    protected function casts(): array
    {
        return ['metadata' => 'array'];
    }

    public function conversation() { return $this->belongsTo(Conversation::class); }
}
