# 🔥 GraphQL Mutations - Examples

Mutations are used to modify data (CREATE, UPDATE, DELETE).

---

## 1. Create a borrowing

```graphql
mutation {
  createBorrowing(bookId: 2, userName: "Mohamed") {
    id
    userName
    borrowDate
    returned
    book {
      title
      author {
        name
      }
    }
  }
}
```

**Result:**
```json
{
  "data": {
    "createBorrowing": {
      "id": 3,
      "userName": "Mohamed",
      "borrowDate": "2024-11-04",
      "returned": false,
      "book": {
        "title": "Notre-Dame de Paris",
        "author": {
          "name": "Victor Hugo"
        }
      }
    }
  }
}
```

✅ **In ONE request**: create the borrowing AND fetch all related information!

Compare with REST:
```bash
# Create the borrowing
curl -X POST http://localhost:4000/borrowings \
  -H "Content-Type: application/json" \
  -d '{"bookId": 2, "userName": "Mohamed"}'

# Then fetch the book
curl http://localhost:4000/books/2

# Then fetch the author
curl http://localhost:4000/books/2/author
```
❌ **3 REST requests** vs **1 GraphQL mutation**!

---

## 2. Return a book

```graphql
mutation {
  returnBook(borrowingId: 1) {
    id
    userName
    returned
    book {
      title
    }
  }
}
```

---

## 3. Add a book

```graphql
mutation {
  addBook(
    title: "Le Petit Prince"
    authorId: 1
    pages: 96
    year: 1943
  ) {
    id
    title
    year
    author {
      name
      country
    }
  }
}
```

✅ **Create AND fetch relations** in a single operation!

---

## 4. Mutation with immediate verification

```graphql
mutation {
  createBorrowing(bookId: 4, userName: "Fatma") {
    id
    userName
    book {
      title
      borrowings {
        userName
        returned
      }
    }
  }
}
```

**Result**: You create the borrowing AND immediately see all borrowings for that book!

---

## 🎯 Mutations Comparison

| Operation | REST | GraphQL |
|-----------|------|---------|
| Create + fetch relations | 3+ requests | ✅ 1 mutation |
| Modify + verify result | 2 requests | ✅ 1 mutation |
| Return flexibility | ❌ Fixed | ✅ Total control |

---

## 💡 Key Advantage of GraphQL Mutations

With GraphQL, you can:
1. **Create/Modify data**
2. **Request exactly what you want in return**
3. **Include relations** immediately

All of this in **ONE SINGLE request**!