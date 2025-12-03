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
        Schema::create('shopbranch_product', function (Blueprint $table) {
            $table->integer('shop_id');
            $table->integer('product_id');
            
            $table->primary(['shop_id', 'product_id']);

            $table->foreign('shop_id')->references('shop_id')->on('shop_branch')->onDelete('restrict');
            $table->foreign('product_id')->references('product_id')->on('product')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopbranch_product');
    }
};
