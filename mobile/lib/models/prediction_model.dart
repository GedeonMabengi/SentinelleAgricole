class Prediction {
  final int id;
  final String cropName;
  final double areaHectares;
  final String region;
  final double? rainfallMm;
  final String? soilType;
  final bool fertilizerUsed;
  final double predictedYieldTons;
  final double confidencePercent;
  final String status;
  final DateTime createdAt;

  Prediction({
    required this.id,
    required this.cropName,
    required this.areaHectares,
    required this.region,
    this.rainfallMm,
    this.soilType,
    required this.fertilizerUsed,
    required this.predictedYieldTons,
    required this.confidencePercent,
    required this.status,
    required this.createdAt,
  });

  factory Prediction.fromJson(Map<String, dynamic> json) {
    return Prediction(
      id: json['id'],
      cropName: json['crop_name'],
      areaHectares: double.parse(json['area_hectares'].toString()),
      region: json['region'],
      rainfallMm: json['rainfall_mm'] != null ? double.parse(json['rainfall_mm'].toString()) : null,
      soilType: json['soil_type'],
      fertilizerUsed: json['fertilizer_used'] ?? false,
      predictedYieldTons: double.parse(json['predicted_yield_tons'].toString()),
      confidencePercent: double.parse(json['confidence_percent'].toString()),
      status: json['status'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}
