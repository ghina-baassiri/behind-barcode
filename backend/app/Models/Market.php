<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Address;

class Market extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'delivery', 
        'logo',
        'phone'
    ];

    public function address() {
        return $this->hasOne(Address::class, 'id', 'address_id');
    }
}
