# Architecture Sentinelle Agricole

## Vue d'ensemble

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[React Web App]
        MOB[Flutter Mobile App]
    end

    subgraph "API Gateway"
        LAR[Laravel API<br/>Sanctum Auth]
    end

    subgraph "ML Services"
        ML[FastAPI ML Service]
        MODEL1[Yield Prediction<br/>Random Forest/XGBoost]
        MODEL2[Disease Detection<br/>MobileNetV3 CNN]
        MODEL3[LLM Assistant<br/>Llama 3.2 / API]
    end

    subgraph "Data Layer"
        PG[(PostgreSQL)]
        REDIS[(Redis Cache)]
        S3[AWS S3 / Cloudinary]
    end

    subgraph "External Services"
        WEATHER[OpenWeatherMap API]
        FIREBASE[Firebase FCM]
    end

    WEB -->|HTTPS/JSON| LAR
    MOB -->|HTTPS/JSON| LAR
    LAR -->|REST| ML
    LAR --> PG
    LAR --> REDIS
    LAR --> S3
    ML --> S3
    LAR --> WEATHER
    MOB --> FIREBASE
```

## Flux de données

### 1. Prédiction des Récoltes
```mermaid
sequenceDiagram
    participant F as Fermier (Web/Mobile)
    participant L as Laravel API
    participant R as Redis
    participant ML as FastAPI ML
    participant DB as PostgreSQL
    participant W as OpenWeatherMap

    F->>L: POST /api/predict/yield
    L->>R: Vérifier cache
    alt Cache hit
        R-->>L: Résultat caché
    else Cache miss
        L->>W: Récupérer météo (si non fourni)
        W-->>L: Données météo
        L->>ML: POST /api/predict/yield
        ML-->>L: Prédiction + confiance
        L->>R: Mettre en cache
    end
    L->>DB: Sauvegarder prédiction
    L-->>F: Résultat + ID prédiction
```

### 2. Détection Maladies
```mermaid
sequenceDiagram
    participant F as Fermier
    participant L as Laravel API
    participant S3 as Stockage S3
    participant Q as File d'attente
    participant ML as FastAPI ML
    participant DB as PostgreSQL

    F->>L: POST /api/detect/disease (image)
    L->>S3: Upload image
    S3-->>L: URL image
    L->>DB: Créer détection (pending)
    L->>Q: Dispatcher job
    L-->>F: 202 Accepted + ID
    
    Q->>ML: Traitement asynchrone
    ML->>S3: Télécharger image
    ML->>ML: Prétraitement + CNN
    ML-->>Q: Résultat maladie
    Q->>DB: Mettre à jour détection
    Q->>F: Notification push
```

## Stack Technique

| Couche | Technologie |
|--------|-------------|
| Frontend Web | React 19 + Vite + Tailwind CSS + Recharts + Leaflet |
| Mobile | Flutter 3 + Material You + Firebase |
| Backend API | Laravel 12 + Sanctum + PostgreSQL + Redis |
| ML Service | Python 3.12 + FastAPI + scikit-learn + TensorFlow |
| DevOps | Docker + Docker Compose |
| Stockage | AWS S3 / Cloudinary |
| Météo | OpenWeatherMap API |
| Notifications | Firebase Cloud Messaging |

## Sécurité

- Authentification JWT via Laravel Sanctum
- Rate limiting sur toutes les routes API
- Validation stricte des entrées (Form Requests)
- CORS configuré par environnement
- Upload d'images limité (10MB, types vérifiés)
- Chiffrement des données sensibles
