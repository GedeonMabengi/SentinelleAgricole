<?php

namespace App\Http\Controllers;

use App\Models\Prediction;
use App\Models\Plot;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $stats = [
            'total_predictions' => $user->predictions()->count(),
            'total_detections' => $user->diseaseDetections()->count(),
            'avg_yield' => $user->predictions()->avg('predicted_yield_tons'),
            'avg_confidence' => $user->predictions()->avg('confidence_percent'),
            'total_area' => $user->plots()->sum('area_hectares'),
            'unique_crops_count' => $user->predictions()->distinct('crop_name')->count('crop_name'),
            'predictions_by_crop' => $user->predictions()
                ->selectRaw('crop_name, COUNT(*) as count, AVG(predicted_yield_tons) as avg_yield')
                ->groupBy('crop_name')
                ->get(),
            'recent_trends' => $user->predictions()
                ->latest()
                ->take(10)
                ->get(['crop_name', 'predicted_yield_tons', 'confidence_percent', 'created_at']),
        ];

        $recentPredictions = $user->predictions()
            ->with('plot')
            ->latest()
            ->take(5)
            ->get();

        $recentDetections = $user->diseaseDetections()
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'plots' => $user->plots()->withCount(['predictions', 'diseaseDetections'])->get(),
            'recent_predictions' => $recentPredictions,
            'recent_detections' => $recentDetections,
        ]);
    }
}
