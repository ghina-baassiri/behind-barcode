<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMarketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('markets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('delivery')->default(0);
            $table->binary('logo')->nullable();
            $table->string('phone');
            $table->unsignedBigInteger('address_id');
            $table->foreign('address_id')
                ->references('id')
                ->on('addresses')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->unsignedBigInteger('market_admin_id');
            $table->foreign('market_admin_id')
                ->references('id')
                ->on('admins')
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
        Schema::dropIfExists('markets');
    }
}
