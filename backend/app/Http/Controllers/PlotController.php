<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlotRequest;
use App\Models\Plot;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlotController extends Controller
{
    public function index()
    {
        $plots = Auth::user()->plots()->withCount(['predictions', 'diseaseDetections'])->get();

        return Inertia::render('plots', [
            'plots' => $plots,
        ]);
    }

    public function store(StorePlotRequest $request)
    {
        Auth::user()->plots()->create($request->validated());
        return back()->with('success', 'Parcelle créée avec succès.');
    }

    public function destroy(Plot $plot)
    {
        $this->authorize('delete', $plot);
        $plot->delete();
        return back()->with('success', 'Parcelle supprimée.');
    }
}
