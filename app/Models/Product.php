<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasUuids, SoftDeletes, HasFactory;

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

    public function details()
    {
        return $this->hasMany(ProductDetail::class);
    }

    public function detail()
    {
        return $this->hasOne(ProductDetail::class)
                    ->defaultLanguage()
                    ->active();
    }

    public function detailByLanguage($languageCode = null)
    {
        if (!$languageCode) {
            $languageCode = app()->getLocale();
        }

        return $this->details()
                    ->byLanguage($languageCode)
                    ->active()
                    ->first();
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

    public function scopeWithDetails($query, $languageCode = null)
    {
        return $query->with(['details' => function($q) use ($languageCode) {
            if ($languageCode) {
                $q->byLanguage($languageCode);
            }
            $q->active();
        }]);
    }
}
