# 📡 REST API - Exemples et Problèmes

## 🚀 Démarrer l'API REST

```bash
npm run rest
```

## 📋 Endpoints disponibles

### Auteurs

```bash
# Récupérer tous les auteurs
curl http://localhost:4000/authors

# Récupérer un auteur
curl http://localhost:4000/authors/1

# Récupérer les livres d'un auteur
curl http://localhost:4000/authors/1/books
```

### Livres

```bash
# Récupérer tous les livres
curl http://localhost:4000/books

# Récupérer un livre
curl http://localhost:4000/books/1

# Récupérer l'auteur d'un livre
curl http://localhost:4000/books/1/author
```

### Emprunts

```bash
# Récupérer tous les emprunts
curl http://localhost:4000/borrowings

# Créer un emprunt
curl -X POST http://localhost:4000/borrowings \
  -H "Content-Type: application/json" \
  -d '{"bookId": 2, "userName": "Mohamed"}'
```

---

## ❌ Problèmes identifiés avec REST

### 1. **Multiple requêtes (N+1 Problem)**

**Scénario** : Je veux afficher un livre avec son auteur

```bash
# Requête 1 : Récupérer le livre
curl http://localhost:4000/books/1

# Requête 2 : Récupérer l'auteur
curl http://localhost:4000/books/1/author
```

❌ **2 requêtes HTTP** pour une seule information logique !

### 2. **Over-fetching**

**Scénario** : Je veux juste le titre et l'année des livres

```bash
curl http://localhost:4000/books
```

❌ Je reçois **TOUTES** les données (pages, authorId, etc.) même si je ne les utilise pas !

```json
[
  {
    "id": 1,
    "title": "Les Misérables",
    "authorId": 1,
    "pages": 1463, // ❌ Je n'en ai pas besoin
    "year": 1862
  }
]
```

### 3. **Under-fetching**

**Scénario** : Je veux un auteur avec ses livres

```bash
# Requête 1
curl http://localhost:4000/authors/1

# Requête 2
curl http://localhost:4000/authors/1/books
```

❌ Encore **2 requêtes** ! L'endpoint `/authors/1` ne contient pas les livres.

### 4. **Endpoints fixes et nombreux**

Pour chaque relation, je dois créer un endpoint spécifique :

- `/authors/:id/books`
- `/books/:id/author`
- `/books/:id/borrowings` (si on voulait l'ajouter)

❌ L'API grandit vite et devient difficile à maintenir.

---

## 🎯 Ce que GraphQL va résoudre

GraphQL permettra de :

- ✅ **Une seule requête** pour livre + auteur
- ✅ **Demander exactement les champs** dont on a besoin
- ✅ **Relations imbriquées** dans une seule query
- ✅ **Un seul endpoint** pour toutes les opérations

**Prochaine étape** : Implémenter la même API en GraphQL et comparer !
