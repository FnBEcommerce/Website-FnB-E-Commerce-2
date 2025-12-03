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
        Schema::create('review', function (Blueprint $table) {
            $table->integer('review_id')->autoIncrement();
            $table->integer('product_id');
            $table->integer('user_id');
            $table->integer('rating');
            $table->text('review_comment');
            $table->timestamp('date_created')->useCurrent();
            $table->dateTime('last_updated')->nullable();

            $table->foreign('product_id')->references('product_id')->on('product')->onDelete('restrict');
            $table->foreign('user_id')->references('user_id')->on('user')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review');
    }
};
