<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Market;
use App\Models\Client;

class Rating extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'stars'
    ];

    /**
    * Get market details using market_id of Rating.
    *
    * @return Market
    *
    */
    public function market() {
        return $this->hasOne(Market::class, 'id', 'market_id');
    }

    /**
    * Get user details using user_id of Rating.
    *
    * @return User
    *
    */
    public function user() {
        return $this->hasOne(User::class, 'id', 'client_id');
    }

}
