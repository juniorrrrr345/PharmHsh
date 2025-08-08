# 🚀 Démarrage Rapide Bot PharmHsh

## ✅ Configuration déjà faite !

Votre bot `@jsjshsheejdbot` est configuré avec :
- **Token** : ✅ Configuré
- **MongoDB** : ✅ Même base que la boutique (collection séparée)
- **Admin ID** : ✅ 7670522278

## 📱 Lancer le bot

### 1. Installer les dépendances
```bash
cd bot-telegram
npm install
```

### 2. Démarrer le bot
```bash
npm start
```

## 🎮 Utilisation Admin

1. **Ouvrez Telegram**
2. **Cherchez votre bot** : `@jsjshsheejdbot`
3. **Envoyez** `/start`
4. **Commandes admin** :
   - `/admin` - Panel d'administration complet
   - `/config` - Configuration du bot
   - `/stats` - Statistiques

## ⚙️ Configuration via Telegram

Tout se configure directement dans Telegram via `/admin` :

- **📝 Message de bienvenue** : Personnalisez le message
- **🖼️ Image de bienvenue** : Uploadez votre logo
- **🌐 Réseaux sociaux** : Ajoutez vos liens
- **🎮 Mini App** : Configurez votre boutique web
- **📊 Statistiques** : Voir les utilisateurs

## 🌐 Déploiement (Optionnel)

### Sur Render (Gratuit)
```yaml
# Le fichier render.yaml est déjà configuré
# Juste pushez sur GitHub et connectez Render
```

### En local permanent
```bash
# Avec PM2
npm install -g pm2
cd bot-telegram
pm2 start bot.js --name pharmhsh-bot
pm2 save
```

## 📌 Notes

- Le bot utilise la même MongoDB que votre boutique mais dans une collection séparée
- Toute la configuration se fait via Telegram (pas besoin d'interface web)
- Le `SHOP_URL` est juste pour créer un bouton "Visiter la boutique"

## 🆘 Commandes utiles

```bash
# Logs en temps réel
npm run dev

# Arrêter le bot
npm run stop

# Test local
npm test
```