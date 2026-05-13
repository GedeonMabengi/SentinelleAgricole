import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Upload, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState, useCallback } from 'react';

interface Detection {
    id: number;
    image_path: string;
    detected_disease: string | null;
    confidence_percent: number | null;
    status: string;
    created_at: string;
}

interface PaginatedData<T> {
    data: T[];
}

interface DetectionProps {
    detections: PaginatedData<Detection>;
}

export default function DiseaseDetection() {
    const { detections } = usePage<DetectionProps>().props;
    const { data, setData, post, processing, reset } = useForm({ image: null as File | null });
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setData('image', file);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if (data.image) formData.append('image', data.image);
        post('/detection', { forceFormData: true, onSuccess: () => { reset(); setPreview(null); } });
    };

    return (
        <>
            <Head title="Détection maladies" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Détection des maladies</h1>
                    <p className="text-muted-foreground">Identifiez les maladies par analyse d&apos;image</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardContent className="pt-6">
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-muted'}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {preview ? (
                                    <div className="space-y-4">
                                        <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                                        <Button variant="ghost" onClick={() => { setPreview(null); setData('image', null); }}>Supprimer</Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                                        <p className="font-medium">Glissez-déposez une image de feuille</p>
                                        <label className="text-primary cursor-pointer hover:underline">
                                            Parcourir
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                                        </label>
                                    </div>
                                )}
                            </div>
                            {preview && (
                                <Button onClick={submit} disabled={processing} className="w-full mt-4">
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Analyser
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-500" /> Conseils</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>• Photographiez la feuille en plein jour, sans ombres</p>
                                <p>• Rapprochez-vous pour que la feuille occupe 80% de l&apos;image</p>
                                <p>• Évitez les images floues ou surexposées</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card>
                    <CardHeader><CardTitle>Historique</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {detections.data.map((d) => (
                                <div key={d.id} className="border rounded-lg overflow-hidden">
                                    <img src={d.image_path} alt="Detection" className="w-full h-40 object-cover" />
                                    <div className="p-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${d.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{d.status}</span>
                                        {d.detected_disease && <p className="mt-2 text-sm font-medium">{d.detected_disease}</p>}
                                        {d.confidence_percent && <p className="text-xs text-muted-foreground">{d.confidence_percent}%</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
