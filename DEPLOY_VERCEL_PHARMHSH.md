# Guide de Déploiement PharmHsh sur Vercel

## 🚀 Déploiement Rapide

### Option 1: Via le site Vercel (Recommandé)

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Connectez-vous avec votre compte GitHub**
3. **Cliquez sur "New Project"**
4. **Importez votre repository `PharmHsh`**
5. **Configurez les variables d'environnement** (voir ci-dessous)
6. **Cliquez sur "Deploy"**

### Option 2: Via la ligne de commande

```bash
# Dans le dossier PharmHsh
vercel

# Suivez les instructions:
# - Connectez-vous à votre compte
# - Sélectionnez le scope
# - Confirmez le déploiement
```

## 🔐 Variables d'Environnement à Configurer sur Vercel

Copiez et collez ces variables dans la section "Environment Variables" de Vercel :

```
MONGODB_URI=mongodb+srv://pharmhsh:zjOtmFQcdBbi7AXO@pharm.7fyijxn.mongodb.net/?retryWrites=true&w=majority&appName=pharm
CLOUDINARY_CLOUD_NAME=df70ymn9g
CLOUDINARY_API_KEY=528819611777938
CLOUDINARY_API_SECRET=vIS_LAJ7u4SYpk0l4GgRS4TxdBQ
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changez_ce_mot_de_passe
NEXT_PUBLIC_BASE_URL=https://pharmhsh.vercel.app
```

⚠️ **IMPORTANT**: Changez `ADMIN_PASSWORD` par un mot de passe sécurisé !

## 📝 Étapes Détaillées pour Configurer les Variables

1. Dans le dashboard Vercel, allez dans votre projet PharmHsh
2. Cliquez sur "Settings" → "Environment Variables"
3. Pour chaque variable ci-dessus :
   - Cliquez sur "Add"
   - Collez le nom de la variable (ex: MONGODB_URI)
   - Collez la valeur
   - Sélectionnez "Production", "Preview", et "Development"
   - Cliquez sur "Save"

## 🔄 Après le Déploiement

1. **Vérifiez votre site**: https://pharmhsh.vercel.app
2. **Testez la connexion admin**: https://pharmhsh.vercel.app/admin
3. **Vérifiez que les images s'uploadent** (test Cloudinary)
4. **Créez votre premier produit**

## 🛠️ En cas de Problème

Si le déploiement échoue :
1. Vérifiez les logs dans Vercel Dashboard
2. Assurez-vous que toutes les variables d'environnement sont configurées
3. Vérifiez que MongoDB accepte les connexions depuis Vercel

## 🎉 C'est fait !

Votre boutique PharmHsh est maintenant en ligne !