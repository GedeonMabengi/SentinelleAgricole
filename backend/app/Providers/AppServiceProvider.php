<?php

namespace App\Providers;

use App\Models\Conversation;
use App\Models\DiseaseDetection;
use App\Models\Plot;
use App\Models\Prediction;
use App\Policies\ConversationPolicy;
use App\Policies\DiseaseDetectionPolicy;
use App\Policies\PlotPolicy;
use App\Policies\PredictionPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Gate::policy(Plot::class, PlotPolicy::class);
        Gate::policy(Prediction::class, PredictionPolicy::class);
        Gate::policy(DiseaseDetection::class, DiseaseDetectionPolicy::class);
        Gate::policy(Conversation::class, ConversationPolicy::class);
    }
}
