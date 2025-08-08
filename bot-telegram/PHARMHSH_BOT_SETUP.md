# 🤖 Configuration du Bot Telegram PharmHsh

## 📋 Prérequis

1. **Créer un nouveau bot Telegram**
   - Ouvrez Telegram et cherchez `@BotFather`
   - Envoyez `/newbot`
   - Choisissez un nom : `PharmHsh Bot`
   - Choisissez un username : `pharmhsh_bot` (ou autre disponible)
   - Gardez le **TOKEN** donné par BotFather

2. **Obtenir votre Admin ID**
   - Cherchez `@userinfobot` sur Telegram
   - Envoyez n'importe quel message
   - Notez votre **ID**

## 🚀 Configuration Rapide

### 1. Créer le fichier `.env`

```bash
cd bot-telegram
cp .env.example .env
```

### 2. Éditer `.env` avec vos informations

```env
# Token de votre nouveau bot
BOT_TOKEN=VOTRE_TOKEN_ICI

# Votre MongoDB (la même que PharmHsh ou une nouvelle)
MONGODB_URI=mongodb+srv://pharmhsh:password@cluster.mongodb.net/pharmhsh_bot?retryWrites=true&w=majority

# Votre ID Telegram
ADMIN_ID=VOTRE_ID_ICI

# Configuration
PORT=3001
BOT_MODE=polling
SHOP_URL=https://pharm-hsh.vercel.app
BOT_NAME=PharmHsh Bot
NODE_ENV=production
```

## 🔧 Installation et Lancement

### Installation des dépendances

```bash
cd bot-telegram
npm install
```

### Lancer le bot en local

```bash
npm start
```

## 📱 Commandes Admin

Une fois le bot lancé, envoyez ces commandes dans Telegram :

- `/admin` - Accéder au panel admin
- `/config` - Configurer le bot
- `/stats` - Voir les statistiques

## 🎨 Personnalisation via Telegram

1. **Message de bienvenue**
   - `/admin` → Configuration → Message de bienvenue
   - Personnalisez avec le nom de votre boutique

2. **Image de bienvenue**
   - `/admin` → Configuration → Image de bienvenue
   - Uploadez votre logo

3. **Réseaux sociaux**
   - `/admin` → Configuration → Réseaux sociaux
   - Ajoutez vos liens

4. **Mini App**
   - `/admin` → Configuration → Mini Application
   - URL : `https://pharm-hsh.vercel.app`

## 🌐 Déploiement

### Option 1 : Render (Gratuit)

1. Créez un compte sur [render.com](https://render.com)
2. New → Web Service
3. Connectez GitHub et sélectionnez PharmHsh
4. Configuration :
   - **Root Directory** : `bot-telegram`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
5. Ajoutez les variables d'environnement
6. Deploy !

### Option 2 : Railway

1. Créez un compte sur [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Sélectionnez PharmHsh
4. Ajoutez les variables d'environnement
5. Deploy !

### Option 3 : VPS/Local

```bash
# Avec PM2
npm install -g pm2
pm2 start bot.js --name pharmhsh-bot
pm2 save
pm2 startup
```

## ⚡ Variables d'Environnement pour le Déploiement

```env
BOT_TOKEN=votre_token
MONGODB_URI=votre_mongodb_uri
ADMIN_ID=votre_id
BOT_MODE=webhook
WEBHOOK_URL=https://votre-app.onrender.com
PORT=3000
SHOP_URL=https://pharm-hsh.vercel.app
BOT_NAME=PharmHsh Bot
NODE_ENV=production
```

## 🔍 Vérification

1. Ouvrez Telegram
2. Cherchez votre bot : `@pharmhsh_bot`
3. Envoyez `/start`
4. Vous devriez voir le message de bienvenue

## 🛠️ Dépannage

- **Bot ne répond pas** : Vérifiez le token
- **Erreur MongoDB** : Vérifiez l'URI et les IP autorisées
- **Commandes admin ne marchent pas** : Vérifiez votre ADMIN_ID

## 📞 Support

En cas de problème, vérifiez les logs :
```bash
# Local
npm run dev

# Sur Render/Railway
Voir les logs dans le dashboard
```