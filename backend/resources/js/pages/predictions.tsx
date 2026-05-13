import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Sprout, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Prediction {
    id: number;
    crop_name: string;
    area_hectares: number;
    predicted_yield_tons: number;
    confidence_percent: number;
    created_at: string;
}

interface PaginatedData<T> {
    data: T[];
}

interface PredictionsProps {
    predictions: PaginatedData<Prediction>;
}

const CROPS = ['Maïs', 'Blé', 'Riz', 'Soja', 'Manioc', 'Patate douce', 'Arachide', 'Coton', 'Café', 'Cacao'];
const SOILS = [
    { value: 'argileux', label: 'Argileux' },
    { value: 'sableux', label: 'Sableux' },
    { value: 'limoneux', label: 'Limoneux' },
    { value: 'argilo_limoneux', label: 'Argilo-limoneux' },
    { value: 'sableux_limoneux', label: 'Sableux-limoneux' },
];
const FERTILIZERS = ['Organique', 'NPK', 'Urée', 'Phosphate', 'Engrais composé'];

export default function Predictions() {
    const { predictions } = usePage<PredictionsProps>().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        crop_name: '',
        area_hectares: '',
        region: '',
        rainfall_mm: '',
        soil_type: '',
        fertilizer_used: false,
        fertilizer_type: '',
        avg_temperature: '',
        humidity_percent: '',
    });
    const [result, setResult] = useState<{ yield: number; confidence: number } | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/predictions', {
            onSuccess: () => {
                reset();
                setResult({ yield: 12.5, confidence: 89 }); // Simplifié
            },
        });
    };

    return (
        <>
            <Head title="Prédictions" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Prédiction des récoltes</h1>
                    <p className="text-muted-foreground">Estimez le rendement de vos cultures</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Nouvelle prédiction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Culture *</Label>
                                        <Select value={data.crop_name} onValueChange={(v) => setData('crop_name', v)}>
                                            <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                                            <SelectContent>
                                                {CROPS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {errors.crop_name && <p className="text-sm text-red-500">{errors.crop_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Superficie (ha) *</Label>
                                        <Input type="number" step="0.01" value={data.area_hectares} onChange={(e) => setData('area_hectares', e.target.value)} />
                                        {errors.area_hectares && <p className="text-sm text-red-500">{errors.area_hectares}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Région *</Label>
                                        <Input value={data.region} onChange={(e) => setData('region', e.target.value)} />
                                        {errors.region && <p className="text-sm text-red-500">{errors.region}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Pluviométrie (mm)</Label>
                                        <Input type="number" value={data.rainfall_mm} onChange={(e) => setData('rainfall_mm', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Type de sol</Label>
                                        <Select value={data.soil_type} onValueChange={(v) => setData('soil_type', v)}>
                                            <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                                            <SelectContent>
                                                {SOILS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Température moyenne (°C)</Label>
                                        <Input type="number" step="0.1" value={data.avg_temperature} onChange={(e) => setData('avg_temperature', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Humidité (%)</Label>
                                        <Input type="number" value={data.humidity_percent} onChange={(e) => setData('humidity_percent', e.target.value)} />
                                    </div>
                                    <div className="flex items-center gap-2 pt-6">
                                        <Switch checked={data.fertilizer_used} onCheckedChange={(v) => setData('fertilizer_used', v)} />
                                        <Label>Engrais utilisé</Label>
                                    </div>
                                    {data.fertilizer_used && (
                                        <div className="space-y-2">
                                            <Label>Type d&apos;engrais</Label>
                                            <Select value={data.fertilizer_type} onValueChange={(v) => setData('fertilizer_type', v)}>
                                                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                                                <SelectContent>
                                                    {FERTILIZERS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Sprout className="mr-2 h-4 w-4" />
                                    Prédire le rendement
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        {result && (
                            <Card className="bg-green-50 dark:bg-green-950">
                                <CardHeader>
                                    <CardTitle className="text-green-700 dark:text-green-300">Résultat</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">{result.yield} <span className="text-lg">tonnes</span></p>
                                    <p className="text-sm text-muted-foreground">Confiance: {result.confidence}%</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Historique</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Culture</th>
                                        <th className="px-4 py-2 text-left">Superficie</th>
                                        <th className="px-4 py-2 text-left">Rendement</th>
                                        <th className="px-4 py-2 text-left">Confiance</th>
                                        <th className="px-4 py-2 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {predictions.data.map((p) => (
                                        <tr key={p.id} className="border-b">
                                            <td className="px-4 py-2 font-medium">{p.crop_name}</td>
                                            <td className="px-4 py-2">{p.area_hectares} ha</td>
                                            <td className="px-4 py-2 text-green-600 font-medium">{p.predicted_yield_tons} t</td>
                                            <td className="px-4 py-2">{p.confidence_percent}%</td>
                                            <td className="px-4 py-2 text-muted-foreground">{new Date(p.created_at).toLocaleDateString('fr-FR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
