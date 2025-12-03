<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    // 1. Definisi nama tabel (jika singular)
    protected $table = 'order_detail'; 

    // 2. Definisi Primary Key custom
    protected $primaryKey = 'order_detail_id';

    // 3. Matikan timestamp default Laravel (created_at, updated_at)
    public $timestamps = false;

    // 4. Handle timestamp manual
    // Opsional: gunakan boot function atau observer untuk mengisi last_updated otomatis
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->date_created = now();
        });

        static::updating(function ($model) {
            $model->last_updated = now();
        });
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }
}
