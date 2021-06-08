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

    public function market() {
        return $this->hasOne(Market::class, 'id', 'market_id');
    }

    public function client() {
        return $this->hasOne(Client::class, 'id', 'client_id');
    }

}
