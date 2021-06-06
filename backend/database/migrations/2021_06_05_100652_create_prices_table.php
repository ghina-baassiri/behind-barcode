<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->float('price', 10, 2);
            $table->unsignedBigInteger('market_id');
            $table->foreign('market_id')
                ->references('id')
                ->on('markets')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->char('product_barcode', 13);
            $table->foreign('product_barcode')
                ->references('barcode')
                ->on('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');
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
        Schema::dropIfExists('prices');
    }
}
