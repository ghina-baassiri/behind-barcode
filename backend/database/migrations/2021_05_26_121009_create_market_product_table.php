<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMarketProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('market_product', function (Blueprint $table) {
            $table->id();
            $table->char('product_barcode', 13)->nullable();
            $table->foreign('product_barcode')
                ->references('barcode')
                ->on('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreignId( column: 'market_id')->constrained()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('market_product');
    }
}
