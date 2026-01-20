<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'uuid', 'stock', 'price', 'category_id', 'status_id', 'last_sale'
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

    public function detail()
    {
        return $this->hasOne(ProductDetail::class);
    }

    public function scopeActive($query)
    {
        return $query->whereHas('status', function($q) {
            $q->where('value', Status::ACTIVO);
        });
    }

    public function scopeWithLastSale($query)
    {
        return $query->whereNotNull('last_sale');
    }
}
