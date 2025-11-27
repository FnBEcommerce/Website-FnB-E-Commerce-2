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
        Schema::create('courier', function (Blueprint $table) {
            $table->integer('courier_id')->autoIncrement();
            $table->string('courier_name', 100);
            $table->string('courier_license_plate', 50);
            $table->string('courier_phone_number', 50);
            $table->timestamp('date_created')->useCurrent();
            $table->dateTime('last_updated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courier');
    }
};
