<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MlService
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.ml.base_url', 'http://localhost:8002');
    }

    public function predictYield(array $data): array
    {
        try {
            $response = Http::timeout(30)->post("{$this->baseUrl}/api/predict/yield", $data);
            if ($response->successful()) {
                return [
                    'success' => true,
                    'predicted_yield_tons' => $response->json('predicted_yield_tons'),
                    'confidence_percent' => $response->json('confidence_percent'),
                    'feature_importance' => $response->json('feature_importance'),
                ];
            }
            Log::error('ML Service error', ['status' => $response->status()]);
            return ['success' => false, 'error' => 'ML service returned error'];
        } catch (\Exception $e) {
            Log::error('ML Service exception', ['message' => $e->getMessage()]);
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function detectDisease(string $imageUrl): array
    {
        try {
            $response = Http::timeout(60)->post("{$this->baseUrl}/api/detect/disease", ['image_url' => $imageUrl]);
            if ($response->successful()) {
                return [
                    'success' => true,
                    'detected_disease' => $response->json('detected_disease'),
                    'confidence_percent' => $response->json('confidence_percent'),
                    'recommendations' => $response->json('recommendations'),
                    'top_predictions' => $response->json('top_predictions'),
                ];
            }
            return ['success' => false, 'error' => 'ML service returned error'];
        } catch (\Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
