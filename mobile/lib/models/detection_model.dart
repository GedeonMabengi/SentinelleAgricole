class DiseaseDetection {
  final int id;
  final String imagePath;
  final String? detectedDisease;
  final double? confidencePercent;
  final String? recommendations;
  final String status;
  final DateTime createdAt;

  DiseaseDetection({
    required this.id,
    required this.imagePath,
    this.detectedDisease,
    this.confidencePercent,
    this.recommendations,
    required this.status,
    required this.createdAt,
  });

  factory DiseaseDetection.fromJson(Map<String, dynamic> json) {
    return DiseaseDetection(
      id: json['id'],
      imagePath: json['image_path'],
      detectedDisease: json['detected_disease'],
      confidencePercent: json['confidence_percent'] != null
          ? double.parse(json['confidence_percent'].toString())
          : null,
      recommendations: json['recommendations'],
      status: json['status'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}
