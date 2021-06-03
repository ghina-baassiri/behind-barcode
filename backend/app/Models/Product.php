<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'barcode',
        'brand',
        'size',
        'image',
        'unit_id',
        'category_id'
    ];

    public function markets($product_barcode) {
        return $this->belongsToMany( related: Market::class, table: 'market_product', 
            foreignPivotKey: 'product_barcode', relatedPivotKey: 'market_id')
            ->withTimeStamps()
            ->wherePivot('product_barcode', $product_barcode);
    }

    public function unit() {
        return this->belongsTo(Unit::class);
    }

    public function category() {
        return this->belongsTo(Category::class);
    }
}
