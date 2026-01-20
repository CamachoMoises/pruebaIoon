<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = ['name', 'uuid', 'status_id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];


    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }


    public function scopeActive($query)
    {
        return $query->whereHas('status', function($q) {
            $q->where('value', Status::ACTIVO);
        });
    }
}