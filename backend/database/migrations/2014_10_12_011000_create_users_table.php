<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('display_name')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone');
            $table->binary('profile_image')->nullable();
            $table->string('fcm_token');
            $table->unsignedBigInteger('address_id');
            $table->foreign('address_id')
                ->references('id')
                ->on('addresses')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
