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
            $table->integer('user_id'); // Kolom untuk FK
            
            $table->string('payment_method', 50);
            $table->string('order_status', 50)->nullable();
            $table->decimal('order_total', 10, 2);
            $table->timestamp('delivered_time')->nullable();
            
            $table->timestamp('date_created')->useCurrent();
            $table->dateTime('last_updated')->nullable();

            // Foreign Key
            $table->foreign('user_id')
                ->references('user_id')->on('user')
                ->onDelete('restrict')->onUpdate('restrict');
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
