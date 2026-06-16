import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { MapPin, Plus, Trash2 } from 'lucide-react';

interface Plot {
    id: number;
    name: string;
    area_hectares: number;
    soil_type: string | null;
    region: string;
    predictions_count: number;
    disease_detections_count: number;
}

interface PlotsProps {
    plots: Plot[];
}

const SOILS = [
    { value: 'argileux', label: 'Argileux' },
    { value: 'sableux', label: 'Sableux' },
    { value: 'limoneux', label: 'Limoneux' },
    { value: 'argilo_limoneux', label: 'Argilo-limoneux' },
    { value: 'sableux_limoneux', label: 'Sableux-limoneux' },
];

export default function Plots() {
    const { plots } = usePage<PlotsProps>().props;
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        area_hectares: '',
        soil_type: '',
        region: '',
        notes: '',
    });
    const [showForm, setShowForm] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/plots', { onSuccess: () => { reset(); setShowForm(false); } });
    };

    return (
        <AppLayout>
            <Head title="Parcelles" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Mes parcelles</h1>
                        <p className="text-muted-foreground">Gérez vos parcelles agricoles</p>
                    </div>
                    <Button onClick={() => setShowForm(!showForm)}>
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle
                    </Button>
                </div>

                {showForm && (
                    <Card>
                        <CardHeader><CardTitle>Nouvelle parcelle</CardTitle></CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Nom *</Label>
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Superficie (ha) *</Label>
                                    <Input type="number" step="0.01" value={data.area_hectares} onChange={(e) => setData('area_hectares', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Région *</Label>
                                    <Input value={data.region} onChange={(e) => setData('region', e.target.value)} required />
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
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Notes</Label>
                                    <Input value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                                </div>
                                <div className="flex gap-2 md:col-span-2">
                                    <Button type="submit" disabled={processing}>Enregistrer</Button>
                                    <Button variant="secondary" onClick={() => setShowForm(false)}>Annuler</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {plots.map((plot) => (
                        <Card key={plot.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-base font-medium flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    {plot.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">{plot.area_hectares} ha · {plot.region}</p>
                                {plot.soil_type && <p className="text-sm">Sol: {SOILS.find((s) => s.value === plot.soil_type)?.label}</p>}
                                <div className="flex gap-4 text-xs text-muted-foreground">
                                    <span>{plot.predictions_count} prédictions</span>
                                    <span>{plot.disease_detections_count} détections</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

import { useState } from 'react';
