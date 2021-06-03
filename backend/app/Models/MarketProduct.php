<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarketProduct extends Model
{
    use HasFactory;

    protected $table = 'market_product';

    protected $fillable = [
        'market_id',
        'product_barcode'
    ];
}
