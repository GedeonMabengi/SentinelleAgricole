import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, usePage } from '@inertiajs/react';
import { Sprout, MapPin, TrendingUp, ScanLine } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Plot {
    id: number;
    name: string;
    area_hectares: number;
    region: string;
    predictions_count: number;
    disease_detections_count: number;
}

interface Stats {
    total_predictions: number;
    avg_yield: number;
    total_area: number;
    predictions_by_crop: Array<{ crop_name: string; count: number; avg_yield: number }>;
    recent_trends: Array<{ crop_name: string; predicted_yield_tons: number; confidence_percent: number; created_at: string }>;
}

interface DashboardProps {
    stats: Stats;
    plots: Plot[];
}

export default function Dashboard() {
    const { stats, plots } = usePage<DashboardProps>().props;

    const statsCards = [
        { name: 'Prédictions', value: stats.total_predictions, icon: Sprout },
        { name: 'Parcelles', value: plots.length, icon: MapPin },
        { name: 'Superficie totale', value: `${Number(stats.total_area).toFixed(1)} ha`, icon: TrendingUp },
        { name: 'Rendement moyen', value: `${Number(stats.avg_yield).toFixed(1)} t/ha`, icon: ScanLine },
    ];

    const yieldData = stats.predictions_by_crop.map((item) => ({
        name: item.crop_name,
        yield: Math.round(item.avg_yield * 100) / 100,
    }));

    const trendData = stats.recent_trends.map((item) => ({
        date: new Date(item.created_at).toLocaleDateString('fr-FR'),
        yield: item.predicted_yield_tons,
    }));

    return (
        <>
            <Head title="Tableau de bord" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
                    <p className="text-muted-foreground">Vue d&apos;ensemble de votre exploitation</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsCards.map((card) => (
                        <Card key={card.name}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{card.name}</CardTitle>
                                <card.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rendement par culture</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={yieldData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="yield" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tendances récentes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="yield" stroke="hsl(var(--primary))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
