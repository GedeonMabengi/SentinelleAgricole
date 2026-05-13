import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/chat_model.dart';
import '../services/api_service.dart';

class ChatProvider with ChangeNotifier {
  List<Conversation> _conversations = [];
  List<ChatMessage> _messages = [];
  bool _isLoading = false;
  bool _isSending = false;
  int? _activeConversationId;

  List<Conversation> get conversations => _conversations;
  List<ChatMessage> get messages => _messages;
  bool get isLoading => _isLoading;
  bool get isSending => _isSending;
  int? get activeConversationId => _activeConversationId;

  Future<void> fetchConversations() async {
    try {
      final response = await ApiService.get('/conversations');
      if (response.statusCode == 200) {
        _conversations = (jsonDecode(response.body) as List)
            .map((e) => Conversation.fromJson(e))
            .toList();
        notifyListeners();
      }
    } catch (_) {}
  }

  Future<void> loadConversation(int id) async {
    _activeConversationId = id;
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiService.get('/conversations/$id');
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _messages = (data['messages'] as List)
            .map((e) => ChatMessage.fromJson(e))
            .toList();
      }
    } catch (_) {}

    _isLoading = false;
    notifyListeners();
  }

  Future<void> createConversation() async {
    final response = await ApiService.post('/conversations', {});
    if (response.statusCode == 201) {
      final conv = Conversation.fromJson(jsonDecode(response.body));
      _conversations.insert(0, conv);
      _activeConversationId = conv.id;
      _messages = [];
      notifyListeners();
    }
  }

  Future<void> sendMessage(String message) async {
    if (_activeConversationId == null) return;

    _isSending = true;
    _messages.add(ChatMessage(
      id: 0,
      role: 'user',
      content: message,
      createdAt: DateTime.now(),
    ));
    notifyListeners();

    try {
      final response = await ApiService.post(
        '/conversations/$_activeConversationId/messages',
        {'message': message},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _messages.add(ChatMessage.fromJson(data['message']));
        await fetchConversations();
      }
    } catch (_) {}

    _isSending = false;
    notifyListeners();
  }
}
