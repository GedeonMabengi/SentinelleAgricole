<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDiseaseDetectionRequest;
use App\Jobs\ProcessDiseaseDetection;
use App\Models\DiseaseDetection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DiseaseDetectionController extends Controller
{
    public function index()
    {
        $detections = Auth::user()->diseaseDetections()
            ->latest()
            ->paginate(15)
            ->through(fn ($d) => [
                'id' => $d->id,
                'image_path' => $d->image_path,
                'detected_disease' => $d->detected_disease,
                'confidence_percent' => $d->confidence_percent,
                'status' => $d->status,
                'created_at' => $d->created_at,
            ]);

        return Inertia::render('detection', [
            'detections' => $detections,
        ]);
    }

    public function store(StoreDiseaseDetectionRequest $request)
    {
        $user = Auth::user();
        $file = $request->file('image');

        $path = $file->store('disease-images/' . $user->id, 'public');
        $url = Storage::disk('public')->url($path);

        $detection = $user->diseaseDetections()->create([
            'plot_id' => $request->plot_id,
            'image_path' => $url,
            'status' => 'pending',
        ]);

        ProcessDiseaseDetection::dispatch($detection);

        return back()->with('success', 'Image envoyée pour analyse.');
    }
}
