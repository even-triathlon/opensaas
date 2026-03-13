# Club de Triathlon de Rueil-Malmaison — GitHub Pages

Site statique complet reproduisant fidèlement l'interface du site OpenSaaS, déployable sur GitHub Pages sans serveur ni base de données.

## 📁 Structure des fichiers

```
github-pages/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions - déploiement automatique
├── index.html               # Page d'accueil (Landing Page)
├── inscription.html         # Page Inscriptions + Formulaire de contact
├── apropos.html             # Page À Propos
├── merci.html               # Page de remerciement (après envoi formulaire)
├── styles.css               # CSS complet (reproduction fidèle du design)
├── main.js                  # JavaScript (dark mode, menu mobile, cookies)
├── form.js                  # Gestion formulaire Web3Forms
├── logo.webp                # Logo du club
├── banner.webp              # Image hero
└── favicon.ico              # Favicon
```

## 🚀 Déploiement sur GitHub Pages

### Étape 1 : Configuration du dépôt GitHub

1. Allez dans **Settings** → **Pages** de votre dépôt GitHub
2. Sous **Source**, sélectionnez **GitHub Actions**
3. C'est tout ! Le workflow `.github/workflows/deploy.yml` s'occupe de tout.

> **Note :** Le workflow déploie uniquement le contenu du dossier `github-pages/`. Il se déclenche automatiquement lors d'un push sur `main` qui modifie des fichiers dans ce dossier.

### Étape 2 : Configurer Web3Forms (formulaire de contact)

Le formulaire d'inscription utilise [Web3Forms](https://web3forms.com/) pour envoyer les emails sans serveur.

1. Allez sur [https://web3forms.com/](https://web3forms.com/)
2. Entrez votre adresse email (ex: `contact@rueil-malmaison-triathlon.fr`)
3. Récupérez votre **Access Key** (clé API gratuite)
4. Dans `inscription.html`, remplacez la valeur suivante :
   ```html
   <input type="hidden" name="access_key" value="VOTRE_CLE_WEB3FORMS_ICI" />
   ```
   Par votre vraie clé :
   ```html
   <input type="hidden" name="access_key" value="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
   ```
5. Commitez et pushez — le déploiement est automatique !

### Étape 3 : (Optionnel) Personnaliser l'URL

Si votre site est hébergé sous `https://VOTRE_ORG.github.io/VOTRE_REPO/`, vous devrez peut-être préfixer vos liens (logo, banner, styles). Par défaut les liens sont relatifs et fonctionnent correctement si le site est à la racine du domaine GitHub Pages.

Si GitHub Pages est configuré sur un sous-chemin (ex: `/opensaas`), modifiez les `href` et `src` en conséquence ou utilisez un domaine personnalisé.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🌗 **Dark Mode** | Basculement clair/sombre avec persistance localStorage |
| 📱 **Responsive** | Menu hamburger mobile avec overlay |
| 🗓️ **Horaires** | Tableau complet des entraînements |
| 💳 **Tarifs** | 3 formules d'inscription avec gradient sur la formule recommandée |
| 📝 **Formulaire** | Inscription complète via Web3Forms (sans serveur) |
| 🍪 **Cookie Banner** | Bandeau de consentement cookies |
| ⚡ **Performance** | HTML/CSS/JS pur, zéro framework, chargement instantané |

## 🎨 Design

Le design reproduit fidèlement l'UI de l'application OpenSaaS/Wasp :
- Palette de couleurs identique (jaune `#EAB308`, violet `#747bcb`, rouge `#ff0454`)
- Gradients hero (amber → purple)
- Navbar transparente sur landing, sticky avec blur sur les autres pages
- Tableau des horaires avec bordures `#ff0454`
- Cards de tarification avec effet glow sur la formule recommandée
- Footer identique avec colonnes
- Même typographie (Inter)

## 🔧 Développement local

Aucune installation requise. Ouvrez simplement `index.html` dans votre navigateur :

```bash
cd github-pages
open index.html
# ou
python3 -m http.server 8080
# puis ouvrez http://localhost:8080
```
