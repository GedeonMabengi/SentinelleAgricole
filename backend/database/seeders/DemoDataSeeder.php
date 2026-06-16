<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Crop;
use App\Models\DiseaseDetection;
use App\Models\Message;
use App\Models\Plot;
use App\Models\Prediction;
use App\Models\User;
use App\Models\WeatherData;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        $oneMonthAgo = $now->copy()->subDays(30);

        // ─── 1. UTILISATEUR ───
        $user = User::create([
            'name' => 'Amadou Diallo',
            'email' => 'demo@sentinelle.com',
            'password' => Hash::make('password'),
            'role' => 'farmer',
            'phone' => '+225 07 12 34 56 78',
            'avatar' => null,
            'region' => 'Korhogo',
            'language' => 'fr',
            'notifications_enabled' => true,
            'email_verified_at' => $now,
        ]);

        // ─── 2. PARCELLES ───
        $plots = [
            ['name' => 'Parcelle Nord', 'area_hectares' => 12.5, 'soil_type' => 'argileux', 'region' => 'Korhogo', 'gps_coordinates' => '9.4580, -5.6297', 'notes' => 'Zone principale pour le maïs et le coton.'],
            ['name' => 'Champ Est', 'area_hectares' => 8.3, 'soil_type' => 'limoneux', 'region' => 'Korhogo', 'gps_coordinates' => '9.4612, -5.6245', 'notes' => 'Bonne exposition au soleil, sol fertile.'],
            ['name' => 'Petite zone Ouest', 'area_hectares' => 3.2, 'soil_type' => 'sableux', 'region' => 'Korhogo', 'gps_coordinates' => '9.4550, -5.6350', 'notes' => 'Zone en rotation pour légumes.'],
            ['name' => 'Grand champ Principal', 'area_hectares' => 25.0, 'soil_type' => 'argilo_limoneux', 'region' => 'Bouaké', 'gps_coordinates' => '7.6900, -5.0300', 'notes' => 'Plus grande parcelle, cultures de rente.'],
            ['name' => 'Zone expérimentale', 'area_hectares' => 1.5, 'soil_type' => 'limoneux', 'region' => 'Korhogo', 'gps_coordinates' => '9.4590, -5.6280', 'notes' => 'Tests de nouvelles variétés.'],
        ];

        $plotModels = [];
        foreach ($plots as $plot) {
            $plotModels[] = Plot::create(array_merge($plot, ['user_id' => $user->id]));
        }

        // ─── 3. CULTURES (récupérer IDs existants) ───
        $crops = Crop::all()->keyBy('name');
        $cropNames = ['Maïs', 'Blé', 'Riz', 'Soja', 'Manioc', 'Patate douce', 'Arachide', 'Coton', 'Café', 'Cacao'];

        // ─── 4. PRÉDICTIONS (28 prédictions sur 30 jours) ───
        $predictionConfigs = [
            ['crop' => 'Maïs', 'area' => 12.5, 'plot' => 0, 'yield' => 4.8, 'conf' => 92],
            ['crop' => 'Coton', 'area' => 8.0, 'plot' => 0, 'yield' => 2.1, 'conf' => 88],
            ['crop' => 'Riz', 'area' => 5.0, 'plot' => 1, 'yield' => 6.2, 'conf' => 94],
            ['crop' => 'Manioc', 'area' => 3.0, 'plot' => 2, 'yield' => 18.5, 'conf' => 85],
            ['crop' => 'Arachide', 'area' => 2.5, 'plot' => 2, 'yield' => 1.8, 'conf' => 90],
            ['crop' => 'Cacao', 'area' => 15.0, 'plot' => 3, 'yield' => 1.2, 'conf' => 87],
            ['crop' => 'Café', 'area' => 8.0, 'plot' => 3, 'yield' => 0.9, 'conf' => 89],
            ['crop' => 'Soja', 'area' => 4.0, 'plot' => 1, 'yield' => 2.4, 'conf' => 91],
            ['crop' => 'Patate douce', 'area' => 1.5, 'plot' => 4, 'yield' => 12.3, 'conf' => 86],
            ['crop' => 'Blé', 'area' => 6.0, 'plot' => 1, 'yield' => 3.5, 'conf' => 93],
        ];

        $predictionIndex = 0;
        for ($day = 0; $day < 30; $day++) {
            $numToday = rand(0, 2); // 0 à 2 prédictions par jour
            for ($i = 0; $i < $numToday; $i++) {
                $config = $predictionConfigs[$predictionIndex % count($predictionConfigs)];
                $cropName = $config['crop'];
                $crop = $crops->get($cropName);
                $date = $oneMonthAgo->copy()->addDays($day)->addHours(rand(8, 18));

                // Variation aléatoire du rendement (+/- 15%)
                $yield = $config['yield'] * (1 + (rand(-15, 15) / 100));
                $conf = min(99, max(75, $config['conf'] + rand(-5, 5)));

                Prediction::create([
                    'user_id' => $user->id,
                    'plot_id' => $plotModels[$config['plot']]->id,
                    'crop_id' => $crop?->id,
                    'crop_name' => $cropName,
                    'area_hectares' => $config['area'] * (1 + (rand(-5, 5) / 100)),
                    'region' => $plotModels[$config['plot']]->region,
                    'rainfall_mm' => rand(0, 120),
                    'soil_type' => $plotModels[$config['plot']]->soil_type,
                    'fertilizer_used' => rand(0, 10) > 2, // 80% de chances
                    'fertilizer_type' => ['NPK 15-15-15', 'Urée', 'Fumier composté', 'Engrais organique'][rand(0, 3)],
                    'avg_temperature' => rand(24, 36),
                    'humidity_percent' => rand(55, 92),
                    'predicted_yield_tons' => round($yield, 2),
                    'confidence_percent' => $conf,
                    'input_parameters' => json_encode([
                        'crop' => $cropName,
                        'area' => $config['area'],
                        'soil' => $plotModels[$config['plot']]->soil_type,
                        'region' => $plotModels[$config['plot']]->region,
                    ]),
                    'feature_importance' => json_encode([
                        'surface' => rand(20, 35),
                        'sol' => rand(15, 25),
                        'pluviométrie' => rand(10, 20),
                        'température' => rand(5, 15),
                    ]),
                    'status' => 'completed',
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);

                $predictionIndex++;
            }
        }

        // ─── 5. DÉTECTIONS DE MALADIES (12 détections sur 30 jours) ───
        $diseases = [
            ['name' => 'Rouille du blé', 'severity' => 'moyenne'],
            ['name' => 'Mildiou de la tomate', 'severity' => 'élevée'],
            ['name' => 'Mosaïque du manioc', 'severity' => 'moyenne'],
            ['name' => 'Rouille du café', 'severity' => 'faible'],
            ['name' => 'Cercosporiose du maïs', 'severity' => 'élevée'],
        ];

        $detectionDates = [];
        for ($i = 0; $i < 12; $i++) {
            $detectionDates[] = $oneMonthAgo->copy()->addDays(rand(0, 30))->addHours(rand(8, 18));
        }
        sort($detectionDates);

        foreach ($detectionDates as $idx => $date) {
            $disease = $diseases[$idx % count($diseases)];
            $plot = $plotModels[rand(0, count($plotModels) - 1)];
            $status = ['completed', 'completed', 'completed', 'completed', 'pending', 'processing'][rand(0, 5)];

            DiseaseDetection::create([
                'user_id' => $user->id,
                'plot_id' => $plot->id,
                'image_path' => "disease-images/demo/detection_" . ($idx + 1) . ".jpg",
                'image_thumbnail' => "disease-images/demo/thumb_" . ($idx + 1) . ".jpg",
                'detected_disease' => $status === 'completed' ? $disease['name'] : null,
                'confidence_percent' => $status === 'completed' ? rand(72, 96) : null,
                'recommendations' => $status === 'completed'
                    ? "Appliquer un fongicide adapté. Surveiller l'humidité. Éliminer les feuilles infectées."
                    : null,
                'top_predictions' => $status === 'completed'
                    ? json_encode([
                        ['disease' => $disease['name'], 'confidence' => rand(72, 96)],
                        ['disease' => $diseases[($idx + 1) % count($diseases)]['name'], 'confidence' => rand(10, 30)],
                        ['disease' => $diseases[($idx + 2) % count($diseases)]['name'], 'confidence' => rand(5, 15)],
                    ])
                    : null,
                'status' => $status,
                'processed_at' => $status === 'completed' ? $date->copy()->addMinutes(rand(30, 180)) : null,
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }

        // ─── 6. CONVERSATIONS + MESSAGES ───
        $conversationData = [
            [
                'title' => 'Conseils culture maïs',
                'messages' => [
                    ['role' => 'user', 'content' => 'Bonjour, quelle est la meilleure période pour semer le maïs dans la région de Korhogo ?'],
                    ['role' => 'assistant', 'content' => 'Bonjour Amadou ! Pour la région de Korhogo, la période optimale pour le semis du maïs est généralement entre mi-mai et mi-juin, au début de la saison des pluies. Assurez-vous que le sol a reçu au moins 20-30 mm de pluie avant le semis.'],
                    ['role' => 'user', 'content' => 'Merci ! Et quel espacement recommandez-vous entre les plants ?'],
                    ['role' => 'assistant', 'content' => 'Pour le maïs en zone savanière comme Korhogo, je recommande un espacement de 75 cm entre les lignes et 25-30 cm entre les plants sur la ligne. Cela donne environ 44 000 à 53 000 plants par hectare, idéal pour maximiser le rendement tout en assurant une bonne aération.'],
                    ['role' => 'user', 'content' => 'Parfait, merci pour ces conseils.'],
                ],
            ],
            [
                'title' => 'Maladie sur mes plants de tomate',
                'messages' => [
                    ['role' => 'user', 'content' => 'J\'ai remarqué des taches brunes sur les feuilles de mes tomates. Que faire ?'],
                    ['role' => 'assistant', 'content' => 'Les taches brunes sur les feuilles de tomate peuvent indiquer plusieurs maladies : mildiou, cercosporiose ou alternariose. Pour vous aider au mieux, pourriez-vous me préciser : 1) La couleur du dessous des taches (grisâtre ?) 2) Si elles sont entourées d\'un halo jaune 3) L\'humidité récente de votre zone ?'],
                    ['role' => 'user', 'content' => 'Le dessous est grisâtre et il a beaucoup plu ces derniers jours.'],
                    ['role' => 'assistant', 'content' => 'C\'est très probablement le mildiou (Phytophthora infestans), favorisé par les fortes humidités. Voici mes recommandations :\n1. Éliminez immédiatement les feuilles infectées\n2. Appliquez un fongicide à base de cuivre (Bordeaux mixte)\n3. Évitez d\'arroser par le dessus\n4. Assurez un bon espacement pour l\'aération\n5. Si l\'infection est avancée, envisagez un fongicide systémique.'],
                ],
            ],
            [
                'title' => 'Irrigation optimale',
                'messages' => [
                    ['role' => 'user', 'content' => 'Quelle quantité d\'eau faut-il pour irriguer 1 hectare de riz en période de tallage ?'],
                    ['role' => 'assistant', 'content' => 'En période de tallage, le riz nécessite environ 5 à 8 mm d\'eau par jour, soit 50 à 80 m³ par hectare et par jour. Maintenez une lame d\'eau de 3-5 cm dans la parcelle. Cette phase est critique car le tallage détermine le nombre d\'épis futurs.'],
                    ['role' => 'user', 'content' => 'Et pendant la floraison ?'],
                    ['role' => 'assistant', 'content' => 'Pendant la floraison, les besoins augmentent légèrement : 6 à 10 mm/jour (60-100 m³/ha/jour). Il est crucial de ne jamais laisser le sol se dessécher à cette phase car cela provoque le blanchiment des fleurs et une chute de rendement pouvant atteindre 30%.'],
                    ['role' => 'user', 'content' => 'Quelle méthode d\'irrigation est la plus économique ?'],
                    ['role' => 'assistant', 'content' => 'Pour le riz, l\'irrigation par submersion contrôlée ( Alternate Wetting and Drying - AWD) est la plus économique. Elle permet d\'économiser 15 à 30% d\'eau tout en maintenant le rendement. Le principe est simple : laisser l\'eau s\'évaporer jusqu\'à ce que le sol soit à 15 cm sous la surface humide, puis ré-irriguer.'],
                    ['role' => 'user', 'content' => 'Merci beaucoup pour toutes ces informations détaillées !'],
                ],
            ],
        ];

        foreach ($conversationData as $convIdx => $conv) {
            $convDate = $oneMonthAgo->copy()->addDays(rand(2, 25));
            $conversation = Conversation::create([
                'user_id' => $user->id,
                'title' => $conv['title'],
                'status' => 'active',
                'created_at' => $convDate,
                'updated_at' => $convDate,
            ]);

            foreach ($conv['messages'] as $msgIdx => $msg) {
                $msgDate = $convDate->copy()->addMinutes($msgIdx * rand(5, 30));
                Message::create([
                    'conversation_id' => $conversation->id,
                    'role' => $msg['role'],
                    'content' => $msg['content'],
                    'metadata' => $msg['role'] === 'assistant' ? json_encode(['model' => 'llama3.2', 'source' => 'ollama']) : null,
                    'tokens_used' => $msg['role'] === 'assistant' ? rand(80, 250) : null,
                    'created_at' => $msgDate,
                    'updated_at' => $msgDate,
                ]);
            }
        }

        // ─── 7. DONNÉES MÉTÉO (30 jours pour Korhogo et Bouaké) ───
        foreach (['Korhogo', 'Bouaké'] as $region) {
            for ($day = 0; $day < 30; $day++) {
                $date = $oneMonthAgo->copy()->addDays($day);

                // Variation saisonnière réaliste (saison des pluies commence)
                $baseTemp = $region === 'Korhogo' ? 30 : 28;
                $baseRain = $day > 20 ? rand(5, 45) : rand(0, 15); // Plus de pluie vers la fin

                WeatherData::create([
                    'region' => $region,
                    'date' => $date->toDateString(),
                    'rainfall_mm' => $baseRain,
                    'avg_temperature' => $baseTemp + rand(-4, 4),
                    'min_temperature' => $baseTemp - rand(6, 10),
                    'max_temperature' => $baseTemp + rand(4, 8),
                    'humidity_percent' => rand(55, 92),
                    'wind_speed' => rand(5, 20),
                    'weather_description' => ['Ensoleillé', 'Partiellement nuageux', 'Nuageux', 'Pluie légère', 'Orages'][rand(0, 4)],
                    'source' => 'openweathermap',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
