<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePredictionRequest;
use App\Models\Prediction;
use App\Services\MlService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class PredictionController extends Controller
{
    public function __construct(private MlService $mlService) {}

    public function index()
    {
        $predictions = Auth::user()->predictions()
            ->with(['plot', 'crop'])
            ->latest()
            ->paginate(15)
            ->through(fn ($p) => [
                'id' => $p->id,
                'crop_name' => $p->crop_name,
                'area_hectares' => $p->area_hectares,
                'predicted_yield_tons' => $p->predicted_yield_tons,
                'confidence_percent' => $p->confidence_percent,
                'created_at' => $p->created_at,
            ]);

        return Inertia::render('predictions', [
            'predictions' => $predictions,
        ]);
    }

    public function store(StorePredictionRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();

        $cacheKey = 'prediction:' . md5(json_encode($data));
        $cached = Redis::get($cacheKey);

        if ($cached) {
            $result = json_decode($cached, true);
        } else {
            $result = $this->mlService->predictYield($data);
            if ($result['success']) {
                Redis::setex($cacheKey, 3600, json_encode($result));
            } else {
                return back()->with('error', 'Service ML indisponible');
            }
        }

        $prediction = $user->predictions()->create([
            'plot_id' => $data['plot_id'] ?? null,
            'crop_id' => $data['crop_id'] ?? null,
            'crop_name' => $data['crop_name'],
            'area_hectares' => $data['area_hectares'],
            'region' => $data['region'],
            'rainfall_mm' => $data['rainfall_mm'] ?? null,
            'soil_type' => $data['soil_type'] ?? null,
            'fertilizer_used' => $data['fertilizer_used'] ?? false,
            'fertilizer_type' => $data['fertilizer_type'] ?? null,
            'avg_temperature' => $data['avg_temperature'] ?? null,
            'humidity_percent' => $data['humidity_percent'] ?? null,
            'predicted_yield_tons' => $result['predicted_yield_tons'],
            'confidence_percent' => $result['confidence_percent'],
            'input_parameters' => $data,
            'feature_importance' => $result['feature_importance'] ?? null,
            'status' => 'completed',
        ]);

        return back()->with('success', 'Prédiction effectuée avec succès !');
    }

    public function destroy(Prediction $prediction)
    {
        $this->authorize('delete', $prediction);
        $prediction->delete();
        return back()->with('success', 'Prédiction supprimée.');
    }
}
