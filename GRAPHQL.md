# 🎯 GraphQL API - Examples

## 🚀 Start the GraphQL API

```bash
npm run graphql
```

Open **http://localhost:4001** in your browser to access Apollo Studio (graphical interface).

---

## 📋 Basic Queries

### 1. Fetch all authors

**GraphQL Query:**
```graphql
query {
  authors {
    id
    name
    country
  }
}
```

**GraphQL Result:**

![GraphQL Example 1](./images/GraphQL-Example1.png)

✅ **GraphQL Advantage #1**: You choose exactly which fields you want!

**Compare with REST:**

```bash
curl http://localhost:4000/authors
```

![REST Example 1](./images/REST-Example1.png)

❌ **REST Problem**: You receive ALL fields (id, name, country, birthYear) even if you don't need them!

---

### 2. Fetch only author names

```graphql
query {
  authors {
    name
  }
}
```

✅ **No over-fetching**: You receive ONLY what you request!

---

### 3. Fetch all books

```graphql
query {
  books {
    id
    title
    year
  }
}
```

---

### 4. Fetch a specific book

```graphql
query {
  book(id: 1) {
    title
    pages
    year
  }
}
```

---

### 5. Fetch a specific author

```graphql
query {
  author(id: 1) {
    name
    country
    birthYear
  }
}
```

---

## 🔥 Queries with relations (THE REAL POWER)

### 6. Book with its author (ONE SINGLE REQUEST!)

```graphql
query {
  book(id: 1) {
    title
    year
    author {
      name
      country
    }
  }
}
```

**Result:**
```json
{
  "data": {
    "book": {
      "title": "Les Misérables",
      "year": 1862,
      "author": {
        "name": "Victor Hugo",
        "country": "France"
      }
    }
  }
}
```

✅ **ONE request** vs **2 REST requests**!

Compare with REST:
```bash
# REST: 2 requests needed
curl http://localhost:4000/books/1
curl http://localhost:4000/books/1/author
```

---

### 7. Author with all their books (ONE SINGLE REQUEST!)

```graphql
query {
  author(id: 1) {
    name
    country
    books {
      title
      year
      pages
    }
  }
}
```

**Result:**
```json
{
  "data": {
    "author": {
      "name": "Victor Hugo",
      "country": "France",
      "books": [
        {
          "title": "Les Misérables",
          "year": 1862,
          "pages": 1463
        },
        {
          "title": "Notre-Dame de Paris",
          "year": 1831,
          "pages": 512
        }
      ]
    }
  }
}
```

✅ **ONE request** vs **2 REST requests**!

---

### 8. Book with author AND borrowings (MULTIPLE RELATIONS!)

```graphql
query {
  book(id: 1) {
    title
    author {
      name
    }
    borrowings {
      userName
      borrowDate
      returned
    }
  }
}
```

✅ **ONE request** vs **3 REST requests**!

---

### 9. All books with their authors

```graphql
query {
  books {
    title
    author {
      name
      country
    }
  }
}
```

✅ GraphQL automatically resolves all relations!

---

### 10. Deep nested relations (MAGIC!)

```graphql
query {
  borrowings {
    userName
    returned
    book {
      title
      author {
        name
        country
      }
    }
  }
}
```

**Result**: Borrowings → Books → Authors in ONE SINGLE request!

✅ **1 GraphQL request** vs **minimum 3 REST requests**!

---

## 🎯 REST vs GraphQL Comparison

| Operation | REST | GraphQL |
|-----------|------|---------|
| Book + Author | 2 requests | ✅ 1 request |
| Author + Books | 2 requests | ✅ 1 request |
| Book + Author + Borrowings | 3 requests | ✅ 1 request |
| Choose fields | ❌ Impossible | ✅ Flexible |
| Over-fetching | ❌ Always | ✅ Never |
| Under-fetching | ❌ Often | ✅ Never |

---

## 💡 How does it work?

GraphQL uses **resolvers**:
- When you request `book.author`, GraphQL automatically calls the `Book.author` resolver
- Resolvers are called ONLY if you request those fields
- No requested fields = no unnecessary computations!

**Next step**: Mutations (create, update, delete) with GraphQL!