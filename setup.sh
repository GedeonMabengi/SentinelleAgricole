#!/bin/bash
set -e

echo "🌾 Sentinelle Agricole - Setup"
echo "=============================="

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé"
    exit 1
fi

# Configurer l'environnement
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Fichier .env créé"
fi

# Générer la clé APP_KEY si elle n'existe pas
if ! grep -q "APP_KEY=" .env || grep -q "APP_KEY=$" .env; then
    echo "APP_KEY=$(openssl rand -base64 32)" >> .env
    echo "✅ APP_KEY générée"
fi

# Lancer les conteneurs
echo "🐳 Démarrage des conteneurs..."
docker compose up -d

# Attendre que la base de données soit prête
echo "⏳ Attente de PostgreSQL..."
sleep 5

# Installer les dépendances Laravel
echo "📦 Installation Laravel..."
docker compose exec backend composer install --no-interaction

# Générer la clé et exécuter les migrations
echo "🔧 Configuration de la base de données..."
docker compose exec backend php artisan key:generate
docker compose exec backend php artisan migrate --seed --force
docker compose exec backend php artisan storage:link

# Télécharger le modèle LLM
echo "🤖 Téléchargement du modèle LLaMA 3.2..."
docker compose exec ollama ollama pull llama3.2 || echo "⚠️ Ollama non disponible, à faire manuellement"

echo ""
echo "✅ Installation terminée !"
echo ""
echo "🌐 URLs disponibles :"
echo "   API Laravel    : http://localhost:8001"
echo "   ML Service     : http://localhost:8002"
echo "   Frontend (dev) : http://localhost:5173"
echo "   Ollama         : http://localhost:11434"
echo ""
echo "📱 Mobile : cd mobile && flutter pub get && flutter run"
