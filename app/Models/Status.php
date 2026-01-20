<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ['name', 'value'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    const ACTIVO = 'activo';
    const INACTIVO = 'inactivo';
    const EN_PROCESO = 'en proceso';

    // Relaciones
    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class);
    }
}