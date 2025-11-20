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
        Schema::create('order_detail', function (Blueprint $table) {
            $table->integer('orderdetail_id')->autoIncrement();
            $table->integer('order_id');
            $table->integer('product_id');
            
            $table->integer('orderdetail_quantity');
            $table->decimal('orderdetail_subtotal', 10, 2);
            
            $table->timestamp('date_created')->useCurrent();
            $table->dateTime('last_updated')->nullable();

            // Foreign Keys
            $table->foreign('order_id')
                ->references('order_id')->on('order')
                ->onDelete('restrict')->onUpdate('restrict');

            $table->foreign('product_id')
                ->references('product_id')->on('product')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_detail');
    }
};
