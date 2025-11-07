# ⚖️ Final Comparison: REST vs GraphQL

## 🎯 Concrete Use Cases

### Scenario 1: Display a book with its author

**REST**:
```bash
# Request 1
GET /books/1

# Request 2
GET /books/1/author
```
❌ **2 HTTP requests**  
❌ Over-fetching (all fields)  
⏱️ 2 network round-trips

**GraphQL**:
```graphql
query {
  book(id: 1) {
    title
    year
    author {
      name
    }
  }
}
```
✅ **1 HTTP request**  
✅ Exactly the requested fields  
⏱️ 1 network round-trip

---

### Scenario 2: Book list for a mobile interface

**Need**: Display only `title` and `author name`

**REST**:
```bash
# Request 1: All books (with ALL fields)
GET /books
# Receives: id, title, authorId, pages, year

# Request 2, 3, 4...: For each book, fetch the author
GET /books/1/author
GET /books/2/author
GET /books/3/author
```
❌ **N+1 requests** (1 + number of books)  
❌ Massive over-fetching  
❌ Wasted bandwidth (mobile)

**GraphQL**:
```graphql
query {
  books {
    title
    author {
      name
    }
  }
}
```
✅ **1 request**  
✅ Only 2 fields retrieved  
✅ Optimized for mobile

---

### Scenario 3: Dashboard with complex stats

**Need**: Unreturned borrowings with book and author

**REST**:
```bash
# Request 1: Borrowings
GET /borrowings?returned=false

# For each borrowing (e.g. 5):
GET /books/1
GET /books/2
GET /books/3
GET /books/4
GET /books/5

# For each book:
GET /authors/1
GET /authors/2
GET /authors/1  # Duplicate!
GET /authors/3
GET /authors/2  # Duplicate!
```
❌ **11 requests** for 5 borrowings  
❌ Duplicate requests  
❌ Complex client-side code

**GraphQL**:
```graphql
query {
  borrowings(returned: false) {
    userName
    borrowDate
    book {
      title
      author {
        name
      }
    }
  }
}
```
✅ **1 request**  
✅ GraphQL deduplicates automatically  
✅ Simple client code

---

## 📊 Summary Table

| Criteria | REST | GraphQL |
|---------|------|---------|
| **Number of requests** | Multiple (N+1 problem) | 1 request |
| **Over-fetching** | ❌ Always present | ✅ Impossible |
| **Under-fetching** | ❌ Frequent | ✅ Impossible |
| **Flexibility** | ❌ Fixed endpoints | ✅ Client defines needs |
| **Versioning** | Necessary (v1, v2...) | Not necessary |
| **Documentation** | Manual | Auto-generated |
| **Learning curve** | Easy | Medium |
| **HTTP Caching** | ✅ Native (GET) | ❌ Complex |
| **Monitoring** | ✅ Simple (HTTP codes) | ⚠️ More complex |

---

## 🎯 When to use REST?

✅ **REST is better if**:
- Simple public API
- Basic CRUD without complex relations
- HTTP caching is important
- Less experienced team
- Need for standard HTTP codes

**Examples**: Weather API, currency conversion API, simple CRUD

---

## 🎯 When to use GraphQL?

✅ **GraphQL is better if**:
- Complex relations between data
- Multiple clients (web, mobile, IoT) with different needs
- Rapid development of new features
- Bandwidth optimization (mobile)
- Need for client-side flexibility

**Examples**: Social networks, e-commerce, complex dashboards, mobile apps

---

## 💡 Key Takeaways

### GraphQL Advantages
1. **One request is enough** - No need for multiple calls
2. **No over-fetching** - You request exactly what you need
3. **No under-fetching** - You can request all relations
4. **Auto-documentation** - The schema documents the API
5. **No versioning** - Adding fields doesn't break anything
6. **Strongly typed** - Automatic validation

### GraphQL Disadvantages
1. **More complex** - Learning curve
2. **Difficult caching** - No native HTTP cache
3. **Complex queries** - Can overload the server
4. **Over-engineering** - Can be too much for simple APIs

---

## 🚀 Conclusion

**GraphQL is not a REST replacement** - they are different tools for different needs.

- **REST**: Simple, efficient for basic CRUD
- **GraphQL**: Powerful, perfect for complex relational data

**My learning**: By building both APIs, I concretely understood:
- Why GraphQL exists
- What problems it solves
- When to use it (and when NOT to use it)

---

**Next steps**: 
- [ ] Add DataLoader (avoid N+1 in database)
- [ ] Implement subscriptions (real-time)
- [ ] Add authentication
- [ ] Unit tests