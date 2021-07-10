<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Market;
use App\Models\Product;

class Price extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'price'
    ];

    /**
    * Get market details using market_id of Price.
    *
    * @return Market
    *
    */
    public function market() {
        return $this->hasOne(Market::class, 'id', 'market_id');
    }

    /**
    * Get product details using product_barcode of Price.
    *
    * @return Product
    *
    */
    public function product() {
        return $this->hasOne(Product::class, 'barcode', 'product_barcode');
    }
}
