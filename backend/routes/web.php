<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\DiseaseDetectionController;
use App\Http\Controllers\PlotController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/predictions', [PredictionController::class, 'index'])->name('predictions.index');
    Route::post('/predictions', [PredictionController::class, 'store'])->name('predictions.store');
    Route::delete('/predictions/{prediction}', [PredictionController::class, 'destroy'])->name('predictions.destroy');

    Route::get('/detection', [DiseaseDetectionController::class, 'index'])->name('detection.index');
    Route::post('/detection', [DiseaseDetectionController::class, 'store'])->name('detection.store');

    Route::get('/plots', [PlotController::class, 'index'])->name('plots.index');
    Route::post('/plots', [PlotController::class, 'store'])->name('plots.store');
    Route::delete('/plots/{plot}', [PlotController::class, 'destroy'])->name('plots.destroy');

    Route::get('/assistant', [ChatController::class, 'index'])->name('chat.index');
    Route::post('/assistant/conversations', [ChatController::class, 'createConversation'])->name('chat.create');
    Route::get('/assistant/{conversation}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/assistant/{conversation}/messages', [ChatController::class, 'sendMessage'])->name('chat.message');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
