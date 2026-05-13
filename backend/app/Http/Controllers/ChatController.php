<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatMessageRequest;
use App\Models\Conversation;
use App\Services\LlamaService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function __construct(private LlamaService $llamaService) {}

    public function index()
    {
        $conversations = Auth::user()->conversations()
            ->active()
            ->withCount('messages')
            ->latest()
            ->get();

        return Inertia::render('assistant', [
            'conversations' => $conversations,
        ]);
    }

    public function createConversation()
    {
        $conversation = Auth::user()->conversations()->create([
            'title' => 'Nouvelle conversation',
        ]);
        return redirect()->route('chat.show', $conversation);
    }

    public function show(Conversation $conversation)
    {
        $this->authorize('view', $conversation);
        $conversation->load('messages');

        return Inertia::render('assistant', [
            'activeConversation' => $conversation,
            'messages' => $conversation->messages,
            'conversations' => Auth::user()->conversations()->active()->withCount('messages')->latest()->get(),
        ]);
    }

    public function sendMessage(ChatMessageRequest $request, Conversation $conversation)
    {
        $this->authorize('view', $conversation);

        $conversation->messages()->create([
            'role' => 'user',
            'content' => $request->message,
        ]);

        $history = $conversation->messages()
            ->latest()
            ->take(10)
            ->get()
            ->sortBy('id')
            ->map(fn ($msg) => [
                'role' => $msg->role,
                'content' => $msg->content,
            ])
            ->values()
            ->toArray();

        $response = $this->llamaService->chat($history);

        $conversation->messages()->create([
            'role' => 'assistant',
            'content' => $response['content'],
            'metadata' => $response['metadata'] ?? null,
            'tokens_used' => $response['tokens_used'] ?? null,
        ]);

        if ($conversation->messages()->count() === 2) {
            $conversation->update(['title' => substr($request->message, 0, 50) . '...']);
        }

        return back();
    }
}
