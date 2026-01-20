<?php
// database/factories/LanguageFactory.php
namespace Database\Factories;

use App\Models\Language;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LanguageFactory extends Factory
{
    protected $model = Language::class;

    public function definition(): array
    {
        $languages = [
            ['name' => 'Deutsch', 'code' => 'de'],
            ['name' => 'Italiano', 'code' => 'it'],
            ['name' => 'Português', 'code' => 'pt'],
            ['name' => '中文', 'code' => 'zh'],
        ];

        $language = $this->faker->randomElement($languages);

        return [
            'uuid' => Str::uuid(),
            'name' => $language['name'],
            'code' => $language['code'],
            'status_id' => Status::inRandomOrder()->first()->id ?? Status::factory(),
            'is_default' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}