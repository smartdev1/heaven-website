# Spécification API Backend pour Heaven

Ce document détaille les besoins techniques et les points de terminaison (endpoints) nécessaires pour alimenter le site **Heaven** via un backend Laravel.

## 1. Vue d'ensemble
Le site **Heaven** est une plateforme publique permettant de consulter les programmes (messes, événements, annonces) des paroisses. Le backend doit fournir une API RESTful retournant du JSON.

## 2. Modèles de Données

### A. Paroisse (Parish)
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID/Integer | Identifiant unique. |
| `name` | String | Nom de la paroisse (ex: Notre-Dame des Champs). |
| `slug` | String | Identifiant URL unique (ex: notre-dame-des-champs). |
| `city` | String | Ville. |
| `district` | String (op) | Quartier ou arrondissement (ex: 6è). |
| `image` | String (URL) | URL de l'image de couverture. |
| `lat` | Float | Latitude pour la géolocalisation. |
| `lng` | Float | Longitude pour la géolocalisation. |

### B. Programme
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID/Integer | Identifiant unique. |
| `title` | String | Titre de l'activité (ex: Messe du Dimanche). |
| `type` | Enum | Valeurs : `messe`, `evenement`, `annonce`. |
| `date` | Date | Date au format `YYYY-MM-DD`. |
| `time` | Time | Heure au format `HH:MM`. |
| `description` | Text | Description détaillée. |
| `paroisse_id` | Foreign Key | Lien vers la paroisse parente. |

---

## 3. Endpoints API (Publics)

### 3.1 Liste des Paroisses
`GET /api/paroisses`

**Paramètres de filtrage (Query params) :**
- `lat` (op) : Latitude de l'utilisateur.
- `lng` (op) : Longitude de l'utilisateur.
- `search` (op) : Recherche par nom ou ville.

**Réponse attendue :**
Une liste d'objets Paroisse, triée par distance si les coordonnées sont fournies.

### 3.2 Détails d'une Paroisse
`GET /api/paroisses/{slug}`

**Réponse attendue :**
L'objet Paroisse complet incluant ses métadonnées.

### 3.3 Liste des Programmes
`GET /api/programmes`

**Paramètres de filtrage (Query params) :**
- `date` (op) : Filtrer par date précise (`YYYY-MM-DD`).
- `type` (op) : Filtrer par type (`messe`, `evenement`, etc.).
- `paroisse_id` (op) : Filtrer les programmes d'une église spécifique.
- `lat` / `lng` (op) : Pour filtrer les programmes à proximité.
- `radius` (op) : Rayon en km (par défaut 20km).

### 3.4 Programmes Hebdomadaires par Paroisse
`GET /api/paroisses/{id}/programmes`

**Description :** Utilisé pour la page de détail d'une paroisse pour afficher l'agenda de la semaine.

---

## 4. Recommandations Laravel

### Ressources (API Resources)
Utilisez les `JsonResource` de Laravel pour transformer vos modèles Eloquent et garantir que les noms de champs correspondent à ceux attendus par le frontend (ex: `paroisse_id` en `paroisseId`).

### Géolocalisation
Pour le calcul de distance en SQL, vous pouvez utiliser la formule de Haversine directement dans votre requête Eloquent ou utiliser une extension spatiale (MySQL/PostgreSQL SPATIAL).

Exemple de calcul brut (km) :
```sql
(6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance
```

### CORS
Assurez-vous que le middleware CORS de Laravel autorise l'URL du site Heaven à consommer l'API.

---

## 5. Exemple de Réponse JSON (Programme)
```json
{
  "id": "101",
  "title": "Messe de Pâques",
  "type": "messe",
  "paroisseId": "1",
  "paroisseName": "Notre-Dame",
  "date": "2026-04-16",
  "time": "10:30",
  "description": "Célébration solennelle."
}
```
