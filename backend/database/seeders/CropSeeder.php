<?php

namespace Database\Seeders;

use App\Models\Crop;
use Illuminate\Database\Seeder;

class CropSeeder extends Seeder
{
    public function run(): void
    {
        $crops = [
            ['name' => 'Maïs', 'slug' => 'mais', 'type' => 'cereal', 'growth_cycle_days' => 120, 'optimal_conditions' => ['temp_min' => 18, 'temp_max' => 32, 'rainfall' => 500]],
            ['name' => 'Blé', 'slug' => 'ble', 'type' => 'cereal', 'growth_cycle_days' => 150, 'optimal_conditions' => ['temp_min' => 12, 'temp_max' => 25, 'rainfall' => 400]],
            ['name' => 'Riz', 'slug' => 'riz', 'type' => 'cereal', 'growth_cycle_days' => 150, 'optimal_conditions' => ['temp_min' => 20, 'temp_max' => 35, 'rainfall' => 1200]],
            ['name' => 'Soja', 'slug' => 'soja', 'type' => 'legume', 'growth_cycle_days' => 100, 'optimal_conditions' => ['temp_min' => 20, 'temp_max' => 30, 'rainfall' => 600]],
            ['name' => 'Manioc', 'slug' => 'manioc', 'type' => 'tubercule', 'growth_cycle_days' => 300, 'optimal_conditions' => ['temp_min' => 25, 'temp_max' => 29, 'rainfall' => 1000]],
            ['name' => 'Patate douce', 'slug' => 'patate-douce', 'type' => 'tubercule', 'growth_cycle_days' => 120, 'optimal_conditions' => ['temp_min' => 20, 'temp_max' => 28, 'rainfall' => 750]],
            ['name' => 'Arachide', 'slug' => 'arachide', 'type' => 'oleagineux', 'growth_cycle_days' => 130, 'optimal_conditions' => ['temp_min' => 20, 'temp_max' => 30, 'rainfall' => 550]],
            ['name' => 'Coton', 'slug' => 'coton', 'type' => 'oleagineux', 'growth_cycle_days' => 180, 'optimal_conditions' => ['temp_min' => 25, 'temp_max' => 35, 'rainfall' => 700]],
            ['name' => 'Café', 'slug' => 'cafe', 'type' => 'legume', 'growth_cycle_days' => 365, 'optimal_conditions' => ['temp_min' => 15, 'temp_max' => 24, 'rainfall' => 1400]],
            ['name' => 'Cacao', 'slug' => 'cacao', 'type' => 'legume', 'growth_cycle_days' => 365, 'optimal_conditions' => ['temp_min' => 21, 'temp_max' => 32, 'rainfall' => 1500]],
        ];
        foreach ($crops as $crop) Crop::create($crop);
    }
}
