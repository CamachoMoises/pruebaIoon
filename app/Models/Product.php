<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'uuid',
        'stock',
        'price',
        'category_id',
        'status_id',
        'last_sale'
    ];

    protected $casts = [
        'stock' => 'integer',
        'price' => 'decimal:2',
        'last_sale' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function details()
    {
        return $this->hasMany(ProductDetail::class);
    }

    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->whereHas('status', function ($q) {
            $q->where('value', 'activo');
        });
    }

    public function scopeWithCategory($query)
    {
        return $query->whereNotNull('category_id');
    }

    public function scopeWithoutCategory($query)
    {
        return $query->whereNull('category_id');
    }

    public function scopeWithLastSale($query)
    {
        return $query->whereNotNull('last_sale');
    }


    public function hasCategory(): bool
    {
        return !is_null($this->category_id);
    }

    public function getCategoryNameAttribute(): string
    {
        return $this->category ? $this->category->name : 'Sin categoría';
    }

    public function detailByLanguage($languageCode = 'es')
    {
        return $this->details()
            ->whereHas('language', function ($query) use ($languageCode) {
                $query->where('code', $languageCode);
            })
            ->first();
    }

    public function getDefaultDetailAttribute()
    {
        return $this->detailByLanguage('es');
    }
}
