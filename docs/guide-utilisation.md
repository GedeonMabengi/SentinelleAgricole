# 📘 Guide d'utilisation — Sentinelle Agricole

> Document destiné aux agriculteurs et utilisateurs finaux de l'application.

---

## 🎯 Qu'est-ce que Sentinelle Agricole ?

**Sentinelle Agricole** est une application web de **Smart Agriculture** qui vous accompagne au quotidien dans la gestion de vos cultures grâce à l'Intelligence Artificielle.

Elle combine trois outils puissants :
1. **Prédiction de rendement** — Estimez vos récoltes avant de semer
2. **Détection de maladies** — Identifiez les maladies de vos plantes par photo
3. **Assistant IA agricole** — Posez vos questions et obtenez des conseils d'experts 24h/24

---

## 🔐 1. Créer un compte et se connecter

### Inscription
1. Rendez-vous sur la page d'accueil : `http://localhost:8000/`
2. Cliquez sur **"Essai gratuit"** ou **"Commencer gratuitement"**
3. Remplissez le formulaire :
   - Nom complet
   - Adresse email
   - Mot de passe (minimum 8 caractères)
   - Confirmation du mot de passe
4. Cliquez sur **"S'inscrire"**
5. Vérifiez votre boîte email et cliquez sur le lien de confirmation (si activé)

### Connexion
1. Cliquez sur **"Connexion"** depuis la page d'accueil
2. Saisissez votre email et mot de passe
3. Cliquez sur **"Se connecter"**

> 💡 **Astuce** : Si vous êtes déjà connecté, le bouton "Connexion" est remplacé par **"Tableau de bord"** sur la page d'accueil.

---

## 📊 2. Tableau de bord — Votre vue d'ensemble

Une fois connecté, vous accédez à votre **Tableau de bord**. C'est votre cockpit personnel qui résume toute votre activité.

### Ce que vous voyez :
| Section | Description |
|---------|-------------|
| **Date du jour** | Affichée en haut avec votre prénom |
| **Actions rapides** | 4 raccourcis vers les fonctionnalités clés |
| **Statistiques** | 6 cartes : Prédictions, Détections, Parcelles, Cultures, Superficie, Confiance moyenne |
| **Rendement par culture** | Graphique en barres comparant vos cultures |
| **Tendances** | Graphique de l'évolution de vos rendements sur 30 jours |
| **Mes parcelles** | Tableau récapitulatif de toutes vos parcelles |
| **Activité récente** | Timeline de vos dernières actions (prédictions + détections) |

### Menu profil (en haut à droite)
Cliquez sur votre **nom ou votre avatar** pour dévoiler un menu avec :
- 👤 **Mon profil** — Modifier vos informations personnelles
- ⚙️ **Paramètres** — Changer votre mot de passe, thème sombre/clair
- 🔴 **Déconnexion** — Quitter votre session en toute sécurité

---

## 🌱 3. Gérer vos parcelles

Les parcelles sont la base de votre exploitation. Enregistrez-les une fois, utilisez-les pour toutes vos analyses.

### Ajouter une parcelle
1. Cliquez sur **"Parcelles"** dans la sidebar ou sur le raccourci du dashboard
2. Cliquez sur le bouton **"Nouvelle"**
3. Remplissez le formulaire :
   - **Nom** : ex. "Parcelle Nord", "Champ Principal"
   - **Superficie** : en hectares (ex. 12.5)
   - **Type de sol** : Argileux, Limoneux, Sableux, etc.
   - **Région** : ex. "Korhogo", "Bouaké", "Yamoussoukro"
   - **Coordonnées GPS** (optionnel) : pour localisation précise
   - **Notes** (optionnel) : toute information utile
4. Cliquez sur **"Créer la parcelle"**

### Consulter vos parcelles
- Toutes vos parcelles apparaissent sous forme de cartes
- Chaque carte affiche : superficie, région, type de sol, nombre de prédictions et de détections
- Vous pouvez supprimer une parcelle via le bouton poubelle (⚠️ cela supprime aussi les données associées)

---

## 📈 4. Prédire le rendement de vos récoltes

C'est le cœur de Sentinelle Agricole. Obtenez une estimation de rendement en quelques secondes.

### Faire une prédiction
1. Allez dans **"Prédictions"** depuis le menu
2. Remplissez le formulaire :
   - **Culture** : sélectionnez dans la liste (Maïs, Riz, Coton, Cacao, Café, etc.)
   - **Superficie** : en hectares
   - **Région** : où se trouve la culture
   - **Parcelle associée** (optionnel) : liez la prédiction à une parcelle existante
   - **Paramètres avancés** (optionnels mais recommandés) :
     - Pluviométrie (mm)
     - Type de sol
     - Utilisation d'engrais (oui/non)
     - Type d'engrais
     - Température moyenne (°C)
     - Humidité (%)
3. Cliquez sur **"Prédire le rendement"**

### Résultat
Après quelques secondes, vous obtenez :
- **Rendement estimé** : en tonnes par hectare (t/ha)
- **Niveau de confiance** : pourcentage indiquant la fiabilité de la prédiction
- **Importance des facteurs** : quels paramètres ont le plus influencé le résultat

> 💡 **Conseil** : Plus vous renseignez de paramètres (météo, sol, engrais), plus la prédiction est précise et le pourcentage de confiance élevé.

### Historique
- Toutes vos prédictions sont sauvegardées automatiquement
- Vous pouvez consulter l'historique complet avec la date, la culture, le rendement et la confiance
- Supprimez une prédiction si besoin via le bouton poubelle

---

## 🔬 5. Détecter les maladies par photo

Prenez une photo d'une feuille malade et l'IA identifie la maladie avec des recommandations de traitement.

### Envoyer une photo
1. Allez dans **"Détection maladies"**
2. Cliquez dans la zone de dépôt ou glissez-déposez une image
3. L'image doit être :
   - Format : JPG, JPEG ou PNG
   - Taille maximale : 10 Mo
   - Qualité : photo nette de la feuille (face supérieure de préférence)
4. Sélectionnez éventuellement une parcelle associée
5. Cliquez sur **"Analyser l'image"**

### Résultat
L'analyse peut prendre quelques instants. Vous obtenez ensuite :
- **Maladie détectée** : nom de la maladie
- **Niveau de confiance** : fiabilité de la détection (%)
- **Recommandations** : traitements suggérés et mesures préventives
- **Autres possibilités** : les 2 ou 3 maladies les plus probables avec leurs scores

### Suivi des analyses
- Les statuts possibles sont :
  - 🟡 **En attente** : l'image est en file d'attente
  - 🔵 **En cours** : l'IA analyse l'image
  - 🟢 **Terminée** : résultat disponible
  - 🔴 **Échouée** : problème technique (réessayez)
- Votre historique de détections est consultable à tout moment

> 📸 **Conseil photo** : Photographiez en plein jour, évitez les ombres, cadrez la feuille de près, évitez le flou.

---

## 🤖 6. Assistant IA agricole — Votre expert virtuel

Posez toutes vos questions agronomiques et obtenez des réponses instantanées.

### Démarrer une conversation
1. Allez dans **"Assistant IA"**
2. Cliquez sur **"Nouvelle conversation"** ou sélectionnez une conversation existante dans la liste de gauche
3. Tapez votre question dans le champ en bas
4. Appuyez sur **Entrée** ou cliquez sur le bouton envoyer

### Exemples de questions
- "Quelle est la meilleure période pour semer le maïs à Korhogo ?"
- "Comment traiter le mildiou sur mes plants de tomate ?"
- "Quelle quantité d'eau faut-il pour 1 hectare de riz ?"
- "Quels engrais recommandez-vous pour le cacao ?"
- "Comment lutter contre les ravageurs du coton sans pesticides ?"

### Fonctionnalités
- **Conversations multiples** : gardez plusieurs fils de discussion organisés par thème
- **Historique complet** : retrouvez toutes vos échanges
- **Titres automatiques** : les conversations sont nommées automatiquement selon le sujet
- **Réponses détaillées** : l'IA fournit des conseils concrets, chiffrés et actionnables

---

## ⚙️ 7. Paramètres et profil

### Modifier votre profil
1. Cliquez sur votre **nom/avatar** en haut à droite → **"Mon profil"**
2. Vous pouvez modifier :
   - Votre nom
   - Votre email
   - Votre région par défaut
   - Votre numéro de téléphone
3. Cliquez sur **"Enregistrer"**

### Changer votre mot de passe
1. Depuis le menu profil, allez dans **"Paramètres"**
2. Section **"Mot de passe"**
3. Saisissez votre mot de passe actuel
4. Définissez un nouveau mot de passe (et confirmation)
5. Cliquez sur **"Mettre à jour le mot de passe"**

### Apparence (thème)
1. Dans **"Paramètres"** → **"Apparence"**
2. Choisissez entre :
   - ☀️ **Clair** (par défaut)
   - 🌙 **Sombre**
   - 💻 **Système** (suivant les préférences de votre appareil)

---

## 📱 8. Navigation rapide

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Page publique de présentation |
| Dashboard | `/dashboard` | Vue d'ensemble de l'exploitation |
| Prédictions | `/predictions` | Estimer les rendements |
| Détection | `/detection` | Analyser les maladies par photo |
| Parcelles | `/plots` | Gérer vos parcelles |
| Assistant IA | `/assistant` | Chatbot agricole |
| Profil | `/settings/profile` | Modifier vos informations |

---

## ❓ FAQ — Questions fréquentes

**Q : L'application est-elle gratuite ?**
> R : Oui, l'inscription et l'utilisation de base sont gratuites.

**Q : Mes données sont-elles sécurisées ?**
> R : Absolument. Vos données sont stockées de manière sécurisée, chaque utilisateur ne voit que ses propres données. L'authentification utilise des tokens JWT.

**Q : Puis-je utiliser Sentinelle Agricole sans connexion Internet ?**
> R : Non, l'application nécessite une connexion Internet car les calculs IA s'effectuent sur nos serveurs.

**Q : Les prédictions sont-elles fiables ?**
> R : Les prédictions sont basées sur des modèles de Machine Learning entraînés. Le pourcentage de confiance vous indique la fiabilité. Plus vous renseignez de paramètres, plus le résultat est précis.

**Q : Que faire si la détection de maladie échoue ?**
> R : Assurez-vous que la photo est nette, bien éclairée et que la feuille est bien visible. Réessayez avec une autre photo si nécessaire.

**Q : Puis-je exporter mes données ?**
> R : Cette fonctionnalité est prévue dans une prochaine version.

**Q : Quelles cultures sont supportées ?**
> R : Maïs, Blé, Riz, Soja, Manioc, Patate douce, Arachide, Coton, Café, Cacao, et bien d'autres à venir.

**Q : L'application fonctionne-t-elle sur mobile ?**
> R : L'interface web est responsive (s'adapte aux écrans mobiles). Une application mobile dédiée est en cours de développement.

---

## 🆘 Besoin d'aide ?

Si vous rencontrez un problème :
1. Rafraîchissez la page (F5 ou Cmd+R)
2. Videz le cache de votre navigateur
3. Vérifiez votre connexion Internet
4. Contactez l'administrateur de votre plateforme

---

*Guide mis à jour le 14 mai 2026 — Version 1.0 de Sentinelle Agricole*
