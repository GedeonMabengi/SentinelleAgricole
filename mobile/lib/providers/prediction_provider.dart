import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/prediction_model.dart';
import '../services/api_service.dart';

class PredictionProvider with ChangeNotifier {
  List<Prediction> _predictions = [];
  bool _isLoading = false;
  String? _error;
  Map<String, dynamic>? _stats;

  List<Prediction> get predictions => _predictions;
  bool get isLoading => _isLoading;
  String? get error => _error;
  Map<String, dynamic>? get stats => _stats;

  Future<void> fetchPredictions() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await ApiService.get('/predictions');
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _predictions = (data['data'] as List)
            .map((e) => Prediction.fromJson(e))
            .toList();
      } else {
        _error = 'Erreur lors du chargement';
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<Map<String, dynamic>> createPrediction(Map<String, dynamic> data) async {
    final response = await ApiService.post('/predictions', data);
    if (response.statusCode == 201) {
      final result = jsonDecode(response.body);
      await fetchPredictions();
      return result;
    }
    throw Exception(jsonDecode(response.body)['message'] ?? 'Erreur de prédiction');
  }

  Future<void> fetchStats() async {
    try {
      final response = await ApiService.get('/predictions/stats');
      if (response.statusCode == 200) {
        _stats = jsonDecode(response.body);
        notifyListeners();
      }
    } catch (_) {}
  }
}
