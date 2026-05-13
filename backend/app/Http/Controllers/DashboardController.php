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
            'avg_yield' => $user->predictions()->avg('predicted_yield_tons'),
            'total_area' => $user->plots()->sum('area_hectares'),
            'predictions_by_crop' => $user->predictions()
                ->selectRaw('crop_name, COUNT(*) as count, AVG(predicted_yield_tons) as avg_yield')
                ->groupBy('crop_name')
                ->get(),
            'recent_trends' => $user->predictions()
                ->latest()
                ->take(10)
                ->get(['crop_name', 'predicted_yield_tons', 'confidence_percent', 'created_at']),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'plots' => $user->plots()->withCount(['predictions', 'diseaseDetections'])->get(),
        ]);
    }
}
