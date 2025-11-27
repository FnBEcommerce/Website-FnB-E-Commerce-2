<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    // 1. Definisi nama tabel (jika singular)
    protected $table = 'review'; 

    // 2. Definisi Primary Key custom
    protected $primaryKey = 'review_id';

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
}
