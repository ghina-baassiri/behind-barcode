<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'stars',
        'market_id',
        'user_id'
    ];

    public function market() {
        return this->belongsToMany(Market::class);
    }

    public function user() {
        return this->belongsToMany(User::class);
    }
}
