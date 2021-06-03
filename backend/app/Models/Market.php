<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'delivery', 
        'logo',
        'phone',          
        'address_id',
        'market_admin_id'
    ];

    public function products($market_id) {
        return $this->belongsToMany( related: Product::class, table: 'market_product', 
            foreignPivotKey: 'market_id', relatedPivotKey: 'product_barcode')
            ->withTimeStamps()
            ->wherePivot('market_id', $market_id);
    }
    
    public function address() {
        return this->belongsTo(Address::class);
    }

    public function rating() {
        return this->belongsToMany(Rating::class);
    }
}
