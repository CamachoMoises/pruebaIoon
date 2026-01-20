<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Language extends Model
{
    use HasUuids, SoftDeletes,HasFactory;

    protected $fillable = [
        'uuid', 'name', 'code', 'status_id', 'is_default'
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    // Relaciones
    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->whereHas('status', function($q) {
            $q->where('value', Status::ACTIVO);
        });
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }

    public function scopeByCode($query, $code)
    {
        return $query->where('code', $code);
    }

    // Métodos estáticos útiles
    public static function getDefault()
    {
        return self::default()->active()->first();
    }

    public static function findByCode($code)
    {
        return self::byCode($code)->active()->first();
    }
}