import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Bot, User, Send, Plus, Loader2 } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface Message {
    id: number;
    role: string;
    content: string;
    created_at: string;
}

interface Conversation {
    id: number;
    title: string;
    messages_count: number;
}

interface AssistantProps {
    conversations: Conversation[];
    activeConversation?: { id: number; title: string } | null;
    messages: Message[];
}

export default function ChatAssistant() {
    const { conversations, activeConversation, messages } = usePage<AssistantProps>().props;
    const { data, setData, post, processing, reset } = useForm({ message: '' });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeConversation) return;
        post(`/assistant/${activeConversation.id}/messages`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Assistant IA" />
            <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
                {/* Sidebar */}
                <Card className="w-64 hidden md:flex flex-col">
                    <div className="p-4 border-b">
                        <Button className="w-full" onClick={() => router.post('/assistant/conversations')}>
                            <Plus className="mr-2 h-4 w-4" /> Nouvelle
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {conversations.map((c) => (
                            <Button
                                key={c.id}
                                variant={activeConversation?.id === c.id ? 'secondary' : 'ghost'}
                                className="w-full justify-start text-left h-auto py-2"
                                onClick={() => router.get(`/assistant/${c.id}`)}
                            >
                                <div>
                                    <p className="text-sm font-medium truncate">{c.title}</p>
                                    <p className="text-xs text-muted-foreground">{c.messages_count} messages</p>
                                </div>
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Chat */}
                <Card className="flex-1 flex flex-col">
                    {!activeConversation ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <Bot className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-lg font-semibold">Assistant IA Agricole</h3>
                            <p className="text-muted-foreground max-w-md mt-2">Posez vos questions sur les cultures, maladies, fertilisation et pratiques agronomiques.</p>
                            <Button className="mt-6" onClick={() => router.post('/assistant/conversations')}>
                                <Plus className="mr-2 h-4 w-4" /> Démarrer
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="p-4 border-b flex items-center gap-3">
                                <Bot className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">{activeConversation.title}</p>
                                    <p className="text-xs text-muted-foreground">En ligne</p>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.role === 'assistant' && (
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Bot className="h-4 w-4 text-primary" />
                                            </div>
                                        )}
                                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                        {msg.role === 'user' && (
                                            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {processing && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Bot className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="bg-muted rounded-2xl px-4 py-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={submit} className="p-4 border-t flex gap-2">
                                <Input
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Posez votre question agricole..."
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={processing || !data.message.trim()} size="icon">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
