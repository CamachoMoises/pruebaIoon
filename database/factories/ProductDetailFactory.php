<?php
// database/factories/ProductDetailFactory.php
namespace Database\Factories;

use App\Models\Language;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductDetailFactory extends Factory
{
    protected $model = ProductDetail::class;

    public function definition(): array
    {
        return [
            'uuid' => Str::uuid(),
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraphs(3, true),
            'product_id' => Product::factory(),
            'language_id' => Language::factory(),
            'status_id' => Status::factory(),
            'features' => $this->faker->optional()->paragraphs(2, true),
            'specifications' => $this->faker->optional()->sentence(10),
            'meta_title' => $this->faker->optional()->words(5, true),
            'meta_description' => $this->faker->optional()->sentence(),
            'meta_keywords' => $this->faker->optional()->words(5, true),
        ];
    }

    // Estados/Scopes
    public function active()
    {
        return $this->state(function (array $attributes) {
            return [
                'status_id' => Status::where('value', 'activo')->first()->id ??
                    Status::factory()->create(['value' => 'activo'])->id,
            ];
        });
    }

    public function inSpanish()
    {
        return $this->state(function (array $attributes) {
            $spanish = Language::where('code', 'es')->first();

            if (!$spanish) {
                $spanish = Language::factory()->spanish()->create();
            }

            return [
                'language_id' => $spanish->id,
                'name' => $this->faker->words(3, true) . ' (ES)',
                'description' => $this->faker->paragraphs(3, true) . "\n\n[Descripción en español]",
            ];
        });
    }

    public function inEnglish()
    {
        return $this->state(function (array $attributes) {
            $english = Language::where('code', 'en')->first();

            if (!$english) {
                $english = Language::factory()->english()->create();
            }

            return [
                'language_id' => $english->id,
                'name' => $this->faker->words(3, true) . ' (EN)',
                'description' => $this->faker->paragraphs(3, true) . "\n\n[English description]",
            ];
        });
    }

    public function forProduct($product)
    {
        return $this->state(function (array $attributes) use ($product) {
            return [
                'product_id' => is_int($product) ? $product : $product->id,
            ];
        });
    }

    public function forLanguage($language)
    {
        return $this->state(function (array $attributes) use ($language) {
            return [
                'language_id' => is_int($language) ? $language : $language->id,
            ];
        });
    }

    public function withFeatures()
    {
        return $this->state([
            'features' => implode("\n", [
                "- " . $this->faker->sentence(),
                "- " . $this->faker->sentence(),
                "- " . $this->faker->sentence(),
                "- " . $this->faker->sentence(),
            ]),
        ]);
    }

    public function withSpecifications()
    {
        return $this->state([
            'specifications' => implode("\n", [
                "Material: " . $this->faker->word(),
                "Color: " . $this->faker->colorName(),
                "Peso: " . $this->faker->randomFloat(2, 0.1, 10) . " kg",
                "Dimensiones: " . $this->faker->randomNumber(2) . "x" .
                    $this->faker->randomNumber(2) . "x" .
                    $this->faker->randomNumber(2) . " cm",
            ]),
        ]);
    }
}
