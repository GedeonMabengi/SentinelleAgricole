import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/prediction_provider.dart';

class PredictionScreen extends StatefulWidget {
  const PredictionScreen({super.key});

  @override
  State<PredictionScreen> createState() => _PredictionScreenState();
}

class _PredictionScreenState extends State<PredictionScreen> {
  final _formKey = GlobalKey<FormState>();
  String _cropName = '';
  double _area = 1.0;
  String _region = '';
  double? _rainfall;
  String? _soilType;
  bool _fertilizer = false;
  String? _fertilizerType;
  double? _temperature;
  double? _humidity;
  bool _isSubmitting = false;
  Map<String, dynamic>? _result;

  final _crops = ['Maïs', 'Blé', 'Riz', 'Soja', 'Manioc', 'Patate douce', 'Arachide', 'Coton', 'Café', 'Cacao'];
  final _soils = ['argileux', 'sableux', 'limoneux', 'argilo_limoneux', 'sableux_limoneux'];
  final _fertilizers = ['Organique', 'NPK', 'Urée', 'Phosphate', 'Engrais composé'];

  Future<void> _predict() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() { _isSubmitting = true; _result = null; });

    try {
      final result = await context.read<PredictionProvider>().createPrediction({
        'crop_name': _cropName,
        'area_hectares': _area,
        'region': _region,
        if (_rainfall != null) 'rainfall_mm': _rainfall,
        if (_soilType != null) 'soil_type': _soilType,
        'fertilizer_used': _fertilizer,
        if (_fertilizerType != null) 'fertilizer_type': _fertilizerType,
        if (_temperature != null) 'avg_temperature': _temperature,
        if (_humidity != null) 'humidity_percent': _humidity,
      });
      setState(() => _result = result);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur: $e')),
      );
    } finally {
      setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Prédiction des récoltes')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Form(
            key: _formKey,
            child: Column(
              children: [
                DropdownButtonFormField<String>(
                  value: _cropName.isEmpty ? null : _cropName,
                  decoration: const InputDecoration(labelText: 'Culture *', border: OutlineInputBorder()),
                  items: _crops.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                  onChanged: (v) => setState(() => _cropName = v ?? ''),
                  validator: (v) => v == null || v.isEmpty ? 'Requis' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Superficie (ha) *', border: OutlineInputBorder()),
                  keyboardType: TextInputType.number,
                  initialValue: '1.0',
                  onChanged: (v) => _area = double.tryParse(v) ?? 1.0,
                  validator: (v) => v == null || v.isEmpty ? 'Requis' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Région *', border: OutlineInputBorder()),
                  onChanged: (v) => _region = v,
                  validator: (v) => v == null || v.isEmpty ? 'Requis' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Pluviométrie (mm)', border: OutlineInputBorder()),
                  keyboardType: TextInputType.number,
                  onChanged: (v) => _rainfall = double.tryParse(v),
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  decoration: const InputDecoration(labelText: 'Type de sol', border: OutlineInputBorder()),
                  items: _soils.map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
                  onChanged: (v) => setState(() => _soilType = v),
                ),
                const SizedBox(height: 12),
                SwitchListTile(
                  title: const Text('Utilisation d\'engrais'),
                  value: _fertilizer,
                  onChanged: (v) => setState(() => _fertilizer = v),
                ),
                if (_fertilizer)
                  DropdownButtonFormField<String>(
                    decoration: const InputDecoration(labelText: 'Type d\'engrais', border: OutlineInputBorder()),
                    items: _fertilizers.map((f) => DropdownMenuItem(value: f, child: Text(f))).toList(),
                    onChanged: (v) => setState(() => _fertilizerType = v),
                  ),
                const SizedBox(height: 12),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Température moyenne (°C)', border: OutlineInputBorder()),
                  keyboardType: TextInputType.number,
                  onChanged: (v) => _temperature = double.tryParse(v),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Humidité (%)', border: OutlineInputBorder()),
                  keyboardType: TextInputType.number,
                  onChanged: (v) => _humidity = double.tryParse(v),
                ),
                const SizedBox(height: 24),
                FilledButton(
                  onPressed: _isSubmitting ? null : _predict,
                  child: _isSubmitting
                      ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2))
                      : const Text('Prédire le rendement'),
                ),
              ],
            ),
          ),
          if (_result != null) ...[
            const SizedBox(height: 24),
            Card(
              color: Colors.green.shade50,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    const Icon(Icons.check_circle, color: Colors.green, size: 48),
                    const SizedBox(height: 8),
                    Text(
                      '${_result!['prediction']['predicted_yield_tons']} tonnes',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold, color: Colors.green.shade800),
                    ),
                    Text('Rendement prédit pour $_area ha'),
                    const SizedBox(height: 8),
                    Text('Confiance: ${_result!['prediction']['confidence_percent']}%'),
                  ],
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
