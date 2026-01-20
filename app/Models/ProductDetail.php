<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductDetail extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'uuid', 'name', 'description', 'status_id', 'product_id', 'language_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function scopeByLanguage($query, $languageCode)
    {
        return $query->whereHas('language', function($q) use ($languageCode) {
            $q->where('code', $languageCode)->active();
        });
    }

    public function scopeDefaultLanguage($query)
    {
        return $query->whereHas('language', function($q) {
            $q->default()->active();
        });
    }

    public function scopeActive($query)
    {
        return $query->whereHas('status', function($q) {
            $q->where('value', Status::ACTIVO);
        });
    }
}
