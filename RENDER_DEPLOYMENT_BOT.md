# 🚀 Déploiement Bot PharmHsh sur Render

## 📋 Configuration Render

### 1. Créer un nouveau Web Service

1. Allez sur [render.com](https://render.com)
2. **New +** → **Web Service**
3. Connectez votre GitHub et sélectionnez **PharmHsh**

### 2. Configuration du Service

```yaml
Name: pharmhsh-bot
Region: Frankfurt (EU Central) ou Oregon (US West)
Branch: main
Root Directory: bot-telegram
Runtime: Node
```

### 3. Build & Start Commands

```yaml
Build Command: npm install
Start Command: npm start
```

### 4. Variables d'Environnement

Copiez et collez ces variables dans Render :

```env
BOT_TOKEN=8128299360:AAEaOrqgcEWm-tROXC95igPjY7PrhbxkgIs
MONGODB_URI=mongodb+srv://pharmhsh:zjOtmFQcdBbi7AXO@pharm.7fyijxn.mongodb.net/pharmhsh_bot?retryWrites=true&w=majority&appName=pharm
ADMIN_ID=7670522278
PORT=10000
BOT_MODE=webhook
WEBHOOK_URL=https://pharmhsh-bot.onrender.com
SHOP_URL=https://pharm-hsh.vercel.app
BOT_NAME=PharmHsh Bot
NODE_ENV=production
```

⚠️ **IMPORTANT** : Remplacez `pharmhsh-bot` dans `WEBHOOK_URL` par le nom exact de votre service Render.

### 5. Plan

- Sélectionnez **Free** (0$/mois)
- ⚠️ Note : Le plan gratuit s'endort après 15 min d'inactivité

### 6. Advanced Settings (Optionnel)

```yaml
Health Check Path: /health
Auto-Deploy: Yes (déploie automatiquement à chaque push)
```

## 🔧 Configuration Alternative (render.yaml)

Le fichier `render.yaml` est déjà configuré dans `bot-telegram/`. Il contient :

```yaml
services:
  - type: web
    name: pharmhsh-bot
    env: node
    region: oregon
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: BOT_MODE
        value: webhook
```

## 📝 Étapes de Déploiement

1. **Créez le service** sur Render
2. **Ajoutez les variables** d'environnement
3. **Cliquez sur "Create Web Service"**
4. **Attendez** le déploiement (5-10 minutes)
5. **Vérifiez les logs** pour voir "Bot started"

## 🔍 Vérification

1. Dans Render Dashboard, vérifiez que le service est **Live**
2. Ouvrez Telegram et parlez à `@jsjshsheejdbot`
3. Envoyez `/start` - le bot devrait répondre

## 🛠️ Dépannage

### Bot ne répond pas
- Vérifiez les logs dans Render
- Vérifiez que `WEBHOOK_URL` correspond à votre URL Render
- Vérifiez que MongoDB autorise les connexions (0.0.0.0/0)

### Erreur Webhook
- L'URL doit être HTTPS
- Format : `https://[votre-service].onrender.com`

### Bot s'endort (plan gratuit)
Solutions :
1. Utilisez un service comme [UptimeRobot](https://uptimerobot.com) pour ping toutes les 5 min
2. Ou passez au plan Starter (7$/mois) pour éviter le sleep

## 📊 Monitoring

- **Logs** : Dashboard Render → Logs
- **Metrics** : Dashboard Render → Metrics
- **Health** : `https://pharmhsh-bot.onrender.com/health`

## 🔄 Mise à jour

Le bot se met à jour automatiquement à chaque push sur GitHub grâce à Auto-Deploy.

## 💡 Tips

1. **Variables sensibles** : Ne commitez jamais le fichier `.env`
2. **Logs** : Utilisez `console.log` pour debug
3. **Webhook** : Plus fiable que polling pour production