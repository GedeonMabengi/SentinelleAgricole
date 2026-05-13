class Conversation {
  final int id;
  final String title;
  final int messagesCount;
  final String status;

  Conversation({
    required this.id,
    required this.title,
    required this.messagesCount,
    required this.status,
  });

  factory Conversation.fromJson(Map<String, dynamic> json) {
    return Conversation(
      id: json['id'],
      title: json['title'],
      messagesCount: json['messages_count'] ?? 0,
      status: json['status'],
    );
  }
}

class ChatMessage {
  final int id;
  final String role;
  final String content;
  final DateTime createdAt;

  ChatMessage({
    required this.id,
    required this.role,
    required this.content,
    required this.createdAt,
  });

  factory ChatMessage.fromJson(Map<String, dynamic> json) {
    return ChatMessage(
      id: json['id'],
      role: json['role'],
      content: json['content'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }

  bool get isUser => role == 'user';
  bool get isAssistant => role == 'assistant';
}
