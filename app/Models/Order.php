<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Order extends Model
{
    use HasFactory;
    // 1. Definisi nama tabel (jika singular)
    protected $table = 'order'; 

    // 2. Definisi Primary Key custom
    protected $primaryKey = 'order_id';

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

    public function user() {
        return $this->belongsTo(User::class, "user_id", "user_id");
    }

    public function courier() {
        return $this->belongsTo(Courier::class, "courier_id", "courier_id");
    }
    
    public function orderDetails() {
        return $this->hasMany(OrderDetail::class, "order_id", "order_id");
    }

    public function shopBranch() {
        return $this->belongsTo(ShopBranch::class, "shop_id", "shop_id");
    }
}
