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
        Schema::create('transaction', function (Blueprint $table) {
            $table->integer('transaction_id')->autoIncrement();
            $table->integer('order_id');
            
            $table->timestamp('date_created')->useCurrent();
            $table->dateTime('last_updated')->nullable();

            // Foreign Key
            $table->foreign('order_id')
                ->references('order_id')->on('order')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
