<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LlamaService
{
    private string $baseUrl;
    private ?string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.llm.base_url', 'http://localhost:8002');
        $this->apiKey = config('services.llm.api_key');
    }

    public function chat(array $messages): array
    {
        try {
            $systemPrompt = [
                'role' => 'system',
                'content' => 'Tu es Sentinelle Agricole, un assistant expert en agriculture. Tu aides les agriculteurs avec des conseils pratiques sur les cultures, maladies des plantes, fertilisation, irrigation et pratiques agronomiques. Réponds en français de manière concise et actionnable.',
            ];

            $payload = [
                'model' => config('services.llm.model', 'llama3.2'),
                'messages' => array_merge([$systemPrompt], $messages),
                'temperature' => 0.7,
                'max_tokens' => 1024,
            ];

            $response = Http::timeout(60)
                ->withHeaders([
                    'Authorization' => $this->apiKey ? 'Bearer ' . $this->apiKey : null,
                    'Content-Type' => 'application/json',
                ])
                ->post("{$this->baseUrl}/api/chat", $payload);

            if ($response->successful()) {
                $data = $response->json();
                return [
                    'content' => $data['message']['content'] ?? $data['choices'][0]['message']['content'] ?? 'Pas de réponse',
                    'metadata' => ['model' => $data['model'] ?? 'unknown'],
                    'tokens_used' => $data['usage']['total_tokens'] ?? null,
                ];
            }

            Log::error('LLM Service error', ['status' => $response->status()]);
            return ['content' => 'Service temporairement indisponible.', 'metadata' => ['error' => true]];
        } catch (\Exception $e) {
            Log::error('LLM Service exception', ['message' => $e->getMessage()]);
            return ['content' => 'Erreur de service.', 'metadata' => ['error' => true]];
        }
    }
}
