import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import '../models/detection_model.dart';
import '../services/api_service.dart';

class DetectionProvider with ChangeNotifier {
  List<DiseaseDetection> _detections = [];
  bool _isLoading = false;
  String? _error;

  List<DiseaseDetection> get detections => _detections;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchDetections() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await ApiService.get('/detections');
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _detections = (data['data'] as List)
            .map((e) => DiseaseDetection.fromJson(e))
            .toList();
      }
    } catch (e) {
      _error = e.toString();
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<Map<String, dynamic>> createDetection(File image, {int? plotId}) async {
    final fields = <String, String>{};
    if (plotId != null) fields['plot_id'] = plotId.toString();

    final response = await ApiService.postMultipart('/detections', image, fields);
    if (response.statusCode == 202) {
      final result = jsonDecode(response.body);
      await fetchDetections();
      return result;
    }
    throw Exception(jsonDecode(response.body)['message'] ?? 'Erreur d\'analyse');
  }
}
