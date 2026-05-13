<?php

namespace Database\Seeders;

use App\Models\Disease;
use Illuminate\Database\Seeder;

class DiseaseSeeder extends Seeder
{
    public function run(): void
    {
        $diseases = [
            ['name' => 'Rouille du blé', 'slug' => 'rouille-ble', 'description' => 'Maladie fongique causée par Puccinia graminis.', 'symptoms' => 'Pustules rouges sur les feuilles.', 'treatment_recommendations' => 'Fongicide propiconazole.', 'prevention_tips' => 'Rotation des cultures.', 'affected_crops' => 'Blé, Orge', 'severity' => 'high', 'is_common' => true],
            ['name' => 'Mildiou de la tomate', 'slug' => 'mildiou-tomate', 'description' => 'Phytophthora infestans.', 'symptoms' => 'Taches brunes, pourriture des fruits.', 'treatment_recommendations' => 'Cuivre ou mancozèbe.', 'prevention_tips' => 'Espacement des plants.', 'affected_crops' => 'Tomate, Pomme de terre', 'severity' => 'high', 'is_common' => true],
            ['name' => 'Mosaïque du manioc', 'slug' => 'mosaique-manioc', 'description' => 'Virus transmis par boutures.', 'symptoms' => 'Déformation des feuilles.', 'treatment_recommendations' => 'Boutures saines.', 'prevention_tips' => 'Boutures certifiées.', 'affected_crops' => 'Manioc', 'severity' => 'high', 'is_common' => true],
            ['name' => 'Rouille du café', 'slug' => 'rouille-cafe', 'description' => 'Hemileia vastatrix.', 'symptoms' => 'Pustules orange sous les feuilles.', 'treatment_recommendations' => 'Fongicide triazole.', 'prevention_tips' => 'Ombre adéquate.', 'affected_crops' => 'Café', 'severity' => 'high', 'is_common' => true],
            ['name' => 'Cercosporiose du maïs', 'slug' => 'cercosporiose-mais', 'description' => 'Cercospora zeae-maydis.', 'symptoms' => 'Taches grises avec bordures brunes.', 'treatment_recommendations' => 'Azoxystrobine.', 'prevention_tips' => 'Rotation 2-3 ans.', 'affected_crops' => 'Maïs', 'severity' => 'medium', 'is_common' => true],
        ];
        foreach ($diseases as $d) Disease::create($d);
    }
}
