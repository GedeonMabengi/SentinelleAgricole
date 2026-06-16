# 🌾 Sentinelle Agricole — Fiche Projet

> Document de présentation destiné aux clients, décideurs, partenaires et investisseurs.

---

## 🎯 Vision

**Sentinelle Agricole** est une plateforme de **Smart Agriculture** propulsée par l'Intelligence Artificielle, conçue pour accompagner les agriculteurs africains dans la gestion intelligente de leurs cultures. Notre mission : transformer chaque agriculteur en agronome digital en lui donnant accès à des outils de prédiction, de diagnostic et de conseil jusqu'alors réservés aux grandes exploitations.

---

## 🌍 Le problème que nous résolvons

Les agriculteurs font face à des défis critiques :
- **Incertitude des rendements** : impossible d'anticiper les récoltes pour planifier la vente et le stockage
- **Maladies végétales** : identification tardive entraînant des pertes de 30 à 50% de la production
- **Accès limité aux conseils agronomiques** : les experts sont rares et chers, surtout en zone rurale
- **Gestion dispersée** : données des parcelles, historiques et analyses éparpillés sur papier ou mémoire

**Sentinelle Agricole répond à ces 4 défis dans une seule application.**

---

## 🚀 Les 3 piliers de Sentinelle Agricole

### 1️⃣ Prédiction de rendement (Machine Learning)
Estimez votre récolte avant même de semer. Notre modèle analyse :
- La culture et la superficie
- Les conditions météorologiques (pluviométrie, température, humidité)
- Le type de sol et la fertilisation
- La région et les données historiques

**Résultat** : un rendement estimé en tonnes/hectare avec un pourcentage de confiance.

### 2️⃣ Détection des maladies (Deep Learning)
Prenez une photo d'une feuille malade avec votre téléphone. Notre réseau de neurones CNN (MobileNetV3) identifie instantanément :
- La maladie parmi 15+ pathologies courantes
- Le niveau de confiance de la détection
- Des recommandations de traitement personnalisées
- Des mesures préventives pour éviter la récidive

### 3️⃣ Assistant IA agricole (LLM — Grand Modèle de Langage)
Votre expert agronomique virtuel disponible 24h/24. Posez vos questions en français naturel :
- "Quand semer le maïs à Korhogo ?"
- "Comment traiter le mildiou sur mes tomates ?"
- "Quelle irrigation pour 1 hectare de riz ?"

L'IA répond avec des conseils précis, contextualisés à votre région et à vos cultures.

---

## 🏗️ Architecture technique

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  React Web   │  │ Flutter App  │  │  API Externe │      │
│  │  (Dashboard) │  │  (Mobile)    │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼─────────────────┼─────────────────┼──────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                    ┌───────┴───────┐
                    │  Laravel API  │
                    │   (Sanctum)   │
                    │   Gateway     │
                    └───────┬───────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
    ┌─────┴─────┐    ┌──────┴──────┐   ┌─────┴─────┐
    │PostgreSQL │    │Redis (Cache)│   │ FastAPI   │
    │  (Data)   │    │   & Queue   │   │   (ML)    │
    └───────────┘    └─────────────┘   └─────┬─────┘
                                             │
                                       ┌─────┴─────┐
                                       │  Ollama   │
                                       │  (LLM)    │
                                       └───────────┘
```

### Stack technologique

| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Frontend Web** | React 19 + Vite + Tailwind CSS + Inertia.js | Interface utilisateur riche et réactive |
| **Mobile** | Flutter 3 + Material You | Application iOS/Android *(en développement)* |
| **Backend API** | Laravel 12 + Sanctum | Authentification, logique métier, orchestration |
| **Base de données** | PostgreSQL 16 | Stockage relationnel des données |
| **Cache & Queue** | Redis | Cache des prédictions + file d'attente des analyses |
| **ML Service** | Python 3.12 + FastAPI | API de prédiction et de détection |
| **ML / DL** | scikit-learn + TensorFlow | Modèles Random Forest et CNN |
| **LLM** | LLaMA 3.2 via Ollama | Assistant conversationnel agricole |
| **DevOps** | Docker + Docker Compose | Déploiement conteneurisé |
| **Météo** | OpenWeatherMap API | Données météorologiques en temps réel |

---

## 📋 Fonctionnalités détaillées

### Pour l'agriculteur
| Fonctionnalité | Description | Bénéfice |
|----------------|-------------|----------|
| **Tableau de bord** | Vue d'ensemble avec stats, graphiques et activité récente | Prendre des décisions éclairées en un coup d'œil |
| **Gestion des parcelles** | CRUD des parcelles avec sol, superficie, coordonnées GPS | Centraliser la gestion foncière |
| **Prédiction de rendement** | Formulaire intelligent + résultat chiffré | Anticiper les récoltes et planifier la commercialisation |
| **Détection maladies** | Upload photo + IA + recommandations | Soigner les cultures avant qu'il ne soit trop tard |
| **Assistant IA** | Chat multi-conversations avec historique | Accéder à un conseiller agricole 24h/24 |
| **Profil utilisateur** | Informations personnelles, mot de passe, thème | Personnaliser son expérience |

### Pour l'administrateur / exploitant
| Fonctionnalité | Description |
|----------------|-------------|
| **Authentification sécurisée** | JWT via Laravel Sanctum, vérification email, réinitialisation mot de passe |
| **Rate limiting** | Protection contre les abus sur l'API ML |
| **Cache intelligent** | Redis pour éviter les calculs redondants |
| **Traitement asynchrone** | File d'attente pour l'analyse des images maladies |
| **Seeders de démo** | Données réalistes pour les démonstrations clients |

---

## 👥 Public cible

### Primaire
- **Agriculteurs individuels** : petites et moyennes exploitations (1 à 50 ha)
- **Coopératives agricoles** : gestion centralisée de multiples parcelles et producteurs
- **Agronomes conseillers** : outil de diagnostic et de recommandation auprès de leurs clients

### Secondaire
- **Organismes de formation agricole** : support pédagogique pour l'apprentissage
- **Banques et microfinances** : évaluation du risque agricole basée sur les prédictions
- **Ministères de l'agriculture** : collecte de données agronomiques à grande échelle

---

## 💡 Avantages concurrentiels

| Avantage | Explication |
|----------|-------------|
| **Tout-en-un** | Seule plateforme à combiner prédiction + diagnostic + conseil IA |
| **Contextualisée Afrique** | Modèles entraînés et adaptés aux cultures et sols africains |
| **Français natif** | Interface et assistant IA 100% en français, adapté au vocabulaire local |
| **Accessible** | Fonctionne sur n'importe quel téléphone avec un navigateur web |
| **Temps réel** | Résultats en secondes grâce au cache et à l'architecture optimisée |
| **Souveraineté des données** | Possibilité d'hébergement local (on-premise) via Docker |

---

## 📈 KPIs et impact attendu

| Indicateur | Objectif |
|------------|----------|
| Précision des prédictions | > 85% de confiance moyenne |
| Précision diagnostic maladies | > 80% sur 15+ pathologies |
| Temps de réponse prédiction | < 2 secondes (cache hit) |
| Temps de réponse diagnostic | < 10 secondes |
| Réduction pertes cultures | -30% grâce au diagnostic précoce |
| Augmentation rendement | +15% grâce aux recommandations ciblées |

---

## 🔒 Sécurité et conformité

- **Authentification JWT** via Laravel Sanctum
- **Validation stricte** de toutes les entrées utilisateur (Form Requests)
- **Rate limiting** sur les routes API sensibles
- **Upload sécurisé** : images limitées à 10 Mo, types vérifiés
- **CORS** configuré par environnement
- **Policies** : chaque utilisateur ne voit que ses propres données
- **Chiffrement** des mots de passe (bcrypt) et des données sensibles

---

## 🛣️ Roadmap et évolutions

### Version 1.0 (actuelle) ✅
- [x] Prédictions de rendement
- [x] Détection de maladies par photo
- [x] Assistant IA conversationnel
- [x] Gestion des parcelles
- [x] Dashboard analytique
- [x] Authentification complète

### Version 1.1 (court terme)
- [ ] Application mobile Flutter (iOS/Android)
- [ ] Notifications push (alertes maladies, rappels cultures)
- [ ] Export PDF des rapports de prédiction
- [ ] Module météo intégré au dashboard

### Version 2.0 (moyen terme)
- [ ] Géolocalisation des parcelles sur carte interactive
- [ ] Prédictions météo à 7 jours pour l'irrigation
- [ ] Communauté d'agriculteurs (partage d'expériences)
- [ ] Système de badges et gamification
- [ ] Intégration paiement mobile (Orange Money, Wave, M-Pesa)

### Version 3.0 (long terme)
- [ ] Drone + imagerie satellite pour le diagnostic à grande échelle
- [ ] Marché agricole intégré (mise en relation acheteurs/vendeurs)
- [ ] Blockchain pour la traçabilité des productions
- [ ] API ouverte pour les partenaires institutionnels

---

## 🧪 Démonstration rapide

### Compte démo
| Identifiant | Valeur |
|-------------|--------|
| Email | `demo@sentinelle.com` |
| Mot de passe | `password` |

### Données de démo pré-chargées
- 5 parcelles réparties sur Korhogo et Bouaké
- 28 prédictions de rendement sur 30 jours
- 12 analyses de maladies (terminées et en cours)
- 3 conversations avec l'assistant IA
- 60 jours de données météorologiques

---

## 📞 Contact et support

Pour toute question, démonstration personnalisée ou partenariat :
- 📧 Email : contact@sentinelle-agricole.com
- 🌐 Site web : https://sentinelle-agricole.com
- 📱 Téléphone : +225 XX XX XX XX

---

## 📝 License

**MIT License** — Sentinelle Agricole Team, 2026.

Libre d'utilisation, de modification et de distribution sous réserve de mention de la source.

---

*Document de présentation — Version 1.0 — Mai 2026*
