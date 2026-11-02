# Trouve ton artisan !

Projet réalisé dans le cadre d'une formation de développement web.

## Présentation

« Trouve ton artisan ! » est un site permettant de rechercher et découvrir des artisans de la région Auvergne-Rhône-Alpes.

Le site permet notamment de :
- consulter les artisans ;
- filtrer les artisans par catégorie ;
- rechercher un artisan ;
- consulter la fiche détaillée d'un artisan ;
- consulter sa spécialité, sa ville et sa note ;
- accéder à son site internet lorsqu'il est renseigné ;
- contacter un artisan grâce à un formulaire.

## Technologies utilisées

### Frontend
- React.js
- Vite
- React Router
- Bootstrap
- Sass

### Backend
- Node.js
- Express.js
- Sequelize
- Nodemailer

### Base de données
- MySQL / MariaDB
- phpMyAdmin

## Installation

### Prérequis

Installer Node.js, npm et MySQL ou MariaDB. XAMPP peut être utilisé pour lancer MySQL et phpMyAdmin.

### Base de données

Créer une base de données nommée `trouve_ton_artisan`, puis exécuter :
- `database/schema.sql`
- `database/seed.sql`

### Backend

Depuis `backend` :

```bash
npm install
npm run dev
```

API : `http://localhost:3000`

Créer un fichier `.env` :

```env
DB_HOST=localhost
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=
PORT=3000
```

Les paramètres SMTP peuvent être ajoutés pour activer l'envoi réel des messages de contact.

### Frontend

Depuis `frontend` :

```bash
npm install
npm run dev
```

Site : `http://localhost:5173`

## Principales routes API

- `GET /api/artisans` : liste des artisans
- `GET /api/artisans/:id` : détail d'un artisan
- `GET /api/artisans/top` : artisans mis en avant
- `GET /api/artisans/recherche?nom=...` : recherche
- `GET /api/artisans?categorie=...` : filtre par catégorie
- `GET /api/categories` : catégories et spécialités
- `POST /api/contact` : formulaire de contact

## Structure

```text
Trouve_ton_artisan/
├── backend/
├── database/
├── frontend/
└── maquettes/
```

## Sécurité

- Les variables sensibles sont stockées dans `.env`.
- `.env` est exclu du dépôt Git.
- Les données du formulaire sont validées.
- La taille du JSON reçu par l'API est limitée.
- Sequelize est utilisé pour les échanges avec MySQL.
- CORS est configuré pour le frontend pendant le développement.
- Les liens externes utilisent `noopener noreferrer`.

## Accessibilité et responsive

Le frontend utilise Bootstrap et Sass pour une interface responsive mobile, tablette et desktop.

Les formulaires utilisent des labels associés aux champs et des attributs d'accessibilité lorsque nécessaire.

## GitHub

https://github.com/orana26/Trouve_ton_artisan

## Figma

**Lien Figma : à compléter avant la remise finale.**

## Site hébergé

Le projet fonctionne actuellement en environnement local.

**Lien du site hébergé : à compléter avant la remise finale.**

## Tests réalisés

Les principales fonctionnalités API ont été testées :
- récupération des 17 artisans ;
- filtrage par catégorie ;
- recherche par nom ;
- récupération des artisans mis en avant ;
- récupération d'un artisan par identifiant ;
- gestion d'un artisan inexistant ;
- récupération des catégories et spécialités.

La navigation frontend et les fiches artisans fonctionnent également.

## Auteur

Projet réalisé dans le cadre d'une formation de développement web.
