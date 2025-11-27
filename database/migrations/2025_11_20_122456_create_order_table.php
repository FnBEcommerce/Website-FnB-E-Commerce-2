<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order', function (Blueprint $table) {
            $table->integer('order_id')->autoIncrement();
            $table->integer('shop_id');
            $table->integer('courier_id');
            $table->integer('user_id');
            $table->string('payment_method', 50);
            $table->string('order_status', 50)->nullable();
            $table->decimal('order_total', 10, 2);
            $table->dateTime('order_confirmed_time')->nullable();
            $table->dateTime('order_processed_time')->nullable();
            $table->dateTime('delivered_time_estimation')->nullable();
            $table->dateTime('delivered_time')->nullable();
            $table->timestamp('date_created')->useCurrent();
            $table->dateTime('last_updated')->nullable();

            $table->foreign('shop_id')->references('shop_id')->on('shop_branch')->onDelete('restrict');
            $table->foreign('courier_id')->references('courier_id')->on('courier')->onDelete('restrict');
            $table->foreign('user_id')->references('user_id')->on('user')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};
