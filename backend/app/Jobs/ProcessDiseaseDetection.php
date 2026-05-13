<?php

namespace App\Jobs;

use App\Models\DiseaseDetection;
use App\Services\MlService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessDiseaseDetection implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;

    public function __construct(private DiseaseDetection $detection) {}

    public function handle(MlService $mlService): void
    {
        $this->detection->update(['status' => 'processing']);
        $result = $mlService->detectDisease($this->detection->image_path);

        if ($result['success']) {
            $this->detection->update([
                'detected_disease' => $result['detected_disease'],
                'confidence_percent' => $result['confidence_percent'],
                'recommendations' => $result['recommendations'],
                'top_predictions' => $result['top_predictions'],
                'status' => 'completed',
                'processed_at' => now(),
            ]);
        } else {
            $this->detection->update(['status' => 'failed']);
            $this->fail('ML detection failed: ' . ($result['error'] ?? 'Unknown'));
        }
    }
}
