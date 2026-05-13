import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  bool _isLoading = true;

  User? get user => _user;
  String? get token => _token;
  bool get isAuthenticated => _token != null;
  bool get isLoading => _isLoading;
  bool get isAdmin => _user?.role == 'admin';
  bool get isFarmer => _user?.role == 'farmer';

  AuthProvider() {
    _loadAuth();
  }

  Future<void> _loadAuth() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
    final userJson = prefs.getString('user');
    if (userJson != null) {
      _user = User.fromJson(jsonDecode(userJson));
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<void> login(String email, String password) async {
    final response = await ApiService.post('/login', {
      'email': email,
      'password': password,
      'device_name': 'mobile_app',
    });

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      _user = User.fromJson(data['user']);
      _token = data['token'];

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', _token!);
      await prefs.setString('user', jsonEncode(_user!.toJson()));
      notifyListeners();
    } else {
      throw Exception(jsonDecode(response.body)['message'] ?? 'Erreur de connexion');
    }
  }

  Future<void> register(Map<String, dynamic> data) async {
    final response = await ApiService.post('/register', data);

    if (response.statusCode == 201) {
      final body = jsonDecode(response.body);
      _user = User.fromJson(body['user']);
      _token = body['token'];

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', _token!);
      await prefs.setString('user', jsonEncode(_user!.toJson()));
      notifyListeners();
    } else {
      throw Exception(jsonDecode(response.body)['message'] ?? 'Erreur d\'inscription');
    }
  }

  Future<void> logout() async {
    try {
      await ApiService.post('/logout', {});
    } catch (_) {}

    _user = null;
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('user');
    notifyListeners();
  }
}
