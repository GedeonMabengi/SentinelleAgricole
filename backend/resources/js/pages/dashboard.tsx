import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Activity,
    ArrowRight,
    Bug,
    Calendar,
    Leaf,
    MapPin,
    MessageSquare,
    Plus,
    ScanLine,
    Sprout,
    TrendingUp,
} from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface Plot {
    id: number;
    name: string;
    area_hectares: number;
    region: string;
    predictions_count: number;
    disease_detections_count: number;
}

interface PredictionItem {
    id: number;
    crop_name: string;
    predicted_yield_tons: number;
    confidence_percent: number;
    created_at: string;
    plot?: { name: string } | null;
}

interface DetectionItem {
    id: number;
    detected_disease: string | null;
    confidence_percent: number | null;
    status: string;
    created_at: string;
}

interface Stats {
    total_predictions: number;
    total_detections: number;
    avg_yield: number | null;
    avg_confidence: number | null;
    total_area: number | null;
    unique_crops_count: number;
    predictions_by_crop: Array<{ crop_name: string; count: number; avg_yield: number }>;
    recent_trends: Array<{ crop_name: string; predicted_yield_tons: number; confidence_percent: number; created_at: string }>;
}

interface DashboardProps {
    auth: { user: { name: string } };
    stats: Stats;
    plots: Plot[];
    recent_predictions: PredictionItem[];
    recent_detections: DetectionItem[];
}

const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

export default function Dashboard() {
    const { auth, stats, plots, recent_predictions, recent_detections } = usePage<DashboardProps>().props;

    const statCards = [
        {
            label: 'Prédictions',
            value: stats.total_predictions,
            icon: Sprout,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
        {
            label: 'Détections',
            value: stats.total_detections,
            icon: Bug,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
        },
        {
            label: 'Parcelles',
            value: plots.length,
            icon: MapPin,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
        {
            label: 'Cultures',
            value: stats.unique_crops_count,
            icon: Leaf,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
        },
        {
            label: 'Superficie totale',
            value: `${Number(stats.total_area ?? 0).toFixed(1)} ha`,
            icon: TrendingUp,
            color: 'text-cyan-600',
            bg: 'bg-cyan-50',
        },
        {
            label: 'Confiance moyenne',
            value: `${Number(stats.avg_confidence ?? 0).toFixed(0)}%`,
            icon: Activity,
            color: 'text-violet-600',
            bg: 'bg-violet-50',
        },
    ];

    const yieldData = stats.predictions_by_crop.map((item) => ({
        name: item.crop_name,
        yield: Math.round(item.avg_yield * 100) / 100,
        count: item.count,
    }));

    const trendData = stats.recent_trends
        .slice()
        .reverse()
        .map((item) => ({
            date: new Date(item.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
            yield: item.predicted_yield_tons,
            confidence: item.confidence_percent,
        }));

    const quickActions = [
        { label: 'Nouvelle prédiction', icon: Sprout, href: '/predictions', color: 'bg-emerald-600 hover:bg-emerald-700' },
        { label: 'Détecter une maladie', icon: ScanLine, href: '/detection', color: 'bg-rose-600 hover:bg-rose-700' },
        { label: 'Ajouter une parcelle', icon: MapPin, href: '/plots', color: 'bg-blue-600 hover:bg-blue-700' },
        { label: 'Assistant IA', icon: MessageSquare, href: '/assistant', color: 'bg-violet-600 hover:bg-violet-700' },
    ];

    const allActivity = [
        ...recent_predictions.map((p) => ({
            type: 'prediction' as const,
            id: p.id,
            title: `Prédiction : ${p.crop_name}`,
            subtitle: p.plot?.name ?? 'Parcelle inconnue',
            value: `${p.predicted_yield_tons.toFixed(1)} t/ha`,
            date: p.created_at,
            icon: Sprout,
            color: 'text-emerald-600 bg-emerald-50',
        })),
        ...recent_detections.map((d) => ({
            type: 'detection' as const,
            id: d.id,
            title: d.detected_disease ?? 'Analyse en cours',
            subtitle: d.status === 'completed' ? 'Analyse terminée' : 'En cours de traitement',
            value: d.confidence_percent ? `${d.confidence_percent.toFixed(0)}%` : '-',
            date: d.created_at,
            icon: Bug,
            color: d.status === 'completed' ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50',
        })),
    ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

    return (
        <AppLayout>
            <Head title="Tableau de bord" />
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
                        <p className="text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {today}
                        </p>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground sm:mt-0">
                        Bonjour, <span className="font-medium text-foreground">{auth.user.name}</span>
                    </div>
                </div>

                {/* Actions rapides */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {quickActions.map((action) => (
                        <Link key={action.label} href={action.href} className="group">
                            <Card className="transition-colors hover:border-primary/50">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <div className={`rounded-lg p-2.5 text-white ${action.color}`}>
                                        <action.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-medium">
                                        {action.label}
                                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {statCards.map((s) => (
                        <Card key={s.label}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
                                <div className={`rounded-md p-1.5 ${s.bg}`}>
                                    <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{s.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Graphiques */}
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Rendement moyen par culture</CardTitle>
                            <CardDescription>Nombre de prédictions et rendement moyen (t/ha)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={yieldData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="yield" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Rendement (t/ha)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Tendances de rendement</CardTitle>
                            <CardDescription>Dernières prédictions et niveau de confiance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="yield"
                                        stroke="hsl(var(--chart-2))"
                                        fillOpacity={1}
                                        fill="url(#colorYield)"
                                        strokeWidth={2}
                                        name="Rendement (t/ha)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="confidence"
                                        stroke="hsl(var(--chart-3))"
                                        fill="none"
                                        strokeWidth={2}
                                        strokeDasharray="4 4"
                                        name="Confiance (%)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Parcelles */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Mes parcelles</CardTitle>
                                <CardDescription>Vue d&apos;ensemble de vos parcelles enregistrées</CardDescription>
                            </div>
                            <Link href="/plots">
                                <Button variant="outline" size="sm">
                                    <Plus className="mr-1 h-3.5 w-3.5" />
                                    Ajouter
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {plots.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                                    <MapPin className="mb-2 h-8 w-8 opacity-50" />
                                    <p className="text-sm">Aucune parcelle enregistrée</p>
                                    <Link href="/plots" className="mt-2 text-sm text-primary hover:underline">
                                        Créer votre première parcelle
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-lg border">
                                    <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
                                        <div className="col-span-4">Nom</div>
                                        <div className="col-span-2 text-right">Superficie</div>
                                        <div className="col-span-3">Région</div>
                                        <div className="col-span-3 text-right">Activité</div>
                                    </div>
                                    <div className="divide-y">
                                        {plots.map((plot) => (
                                            <div
                                                key={plot.id}
                                                className="grid grid-cols-12 items-center gap-2 px-4 py-3 transition-colors hover:bg-muted/30"
                                            >
                                                <div className="col-span-4 font-medium">{plot.name}</div>
                                                <div className="col-span-2 text-right text-sm text-muted-foreground">
                                                    {Number(plot.area_hectares).toFixed(1)} ha
                                                </div>
                                                <div className="col-span-3 text-sm text-muted-foreground">{plot.region}</div>
                                                <div className="col-span-3 flex justify-end gap-2">
                                                    {plot.predictions_count > 0 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            {plot.predictions_count} préd.
                                                        </Badge>
                                                    )}
                                                    {plot.disease_detections_count > 0 && (
                                                        <Badge variant="destructive" className="text-xs">
                                                            {plot.disease_detections_count} dét.
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Activité récente */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Activité récente</CardTitle>
                            <CardDescription>Dernières actions sur votre exploitation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {allActivity.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                                    <Activity className="mb-2 h-8 w-8 opacity-50" />
                                    <p className="text-sm">Aucune activité récente</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {allActivity.map((item) => (
                                        <div key={`${item.type}-${item.id}`} className="flex items-start gap-3">
                                            <div className={`mt-0.5 rounded-full p-1.5 ${item.color}`}>
                                                <item.icon className="h-3.5 w-3.5" />
                                            </div>
                                            <div className="flex-1 space-y-0.5">
                                                <p className="text-sm font-medium">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(item.date).toLocaleDateString('fr-FR', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </span>
                                                    <span className="text-xs font-medium">{item.value}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
