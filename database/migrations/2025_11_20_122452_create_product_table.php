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
        Schema::create('product', function (Blueprint $table) {
            $table->integer('product_id')->autoIncrement();
            $table->text('product_name');
            $table->text('product_category');
            $table->decimal('product_price', 10, 2);
            $table->text('product_description');
            $table->integer('product_stock')->nullable();
            
            $table->timestamp('date_created')->useCurrent();
            $table->dateTime('last_updated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
