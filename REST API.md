# 📡 REST API Documentation

## 🚀 Start the REST API

```bash
npm run rest
```

Server runs at: **http://localhost:4000**

---

## 📋 Available Endpoints

### Authors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/authors` | Get all authors |
| GET | `/authors/:id` | Get one author |
| GET | `/authors/:id/books` | Get author's books |

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get one book |
| GET | `/books/:id/author` | Get book's author |

### Borrowings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/borrowings` | Get all borrowings |
| POST | `/borrowings` | Create a borrowing |

---

## 💡 Quick Examples

### Get all authors
```bash
curl http://localhost:4000/authors
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Victor Hugo",
    "country": "France",
    "birthYear": 1802
  },
  {
    "id": 2,
    "name": "Agatha Christie",
    "country": "UK",
    "birthYear": 1890
  }
]
```

---

### Get one book
```bash
curl http://localhost:4000/books/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Les Misérables",
  "authorId": 1,
  "pages": 1463,
  "year": 1862
}
```

---

### Get book's author
```bash
curl http://localhost:4000/books/1/author
```

**Response:**
```json
{
  "id": 1,
  "name": "Victor Hugo",
  "country": "France",
  "birthYear": 1802
}
```

---

### Create a borrowing
```bash
curl -X POST http://localhost:4000/borrowings \
  -H "Content-Type: application/json" \
  -d '{"bookId": 2, "userName": "Sarah"}'
```

**Response:**
```json
{
  "id": 3,
  "bookId": 2,
  "userName": "Sarah",
  "borrowDate": "2024-11-07",
  "returned": false
}
```

---

## ❌ REST API Limitations

### Problem 1: Multiple Requests
To get a book with its author, you need **2 requests**:
```bash
# Request 1
curl http://localhost:4000/books/1

# Request 2
curl http://localhost:4000/books/1/author
```

### Problem 2: Over-fetching
You receive ALL fields even if you only need the title:
```bash
curl http://localhost:4000/books
# Returns: id, title, authorId, pages, year
# But you only wanted: title
```

### Problem 3: Under-fetching
The `/books` endpoint doesn't include author info:
```bash
curl http://localhost:4000/books
# No author data included!
# Need another request to get authors
```

---

## 💡 Solution

See **[GRAPHQL-EXAMPLES.md](GRAPHQL-EXAMPLES.md)** to see how GraphQL solves these problems!

---

## 🔗 Related Documentation

- **[GRAPHQL-EXAMPLES.md](GRAPHQL-EXAMPLES.md)** - GraphQL queries
- **[COMPARISON.md](COMPARISON.md)** - Detailed REST vs GraphQL comparison