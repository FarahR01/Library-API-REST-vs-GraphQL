# 📚 Library API: REST vs GraphQL

## 🎯 Project Goal

Learn GraphQL by building the same API in both REST and GraphQL to understand:

- Concrete differences
- Advantages and disadvantages of each approach
- When to use REST vs GraphQL

---

## 📖 Progress

- [x] **Step 1**: Initial project setup
- [x] **Step 2**: Basic REST API
- [x] **Step 3**: REST testing and documentation
- [x] **Step 4**: Identifying REST problems
- [x] **Step 5**: GraphQL setup
- [x] **Step 6**: Basic GraphQL queries
- [x] **Step 7**: Relations and resolution
- [x] **Step 8**: GraphQL mutations
- [x] **Step 9**: Final comparison and benchmarks

---

## 📂 Project Structure

```
library-rest-vs-graphql/
├── data.js                  # Shared data (authors, books, borrowings)
├── rest-server.js           # REST API
├── graphql-server.js        # GraphQL API
├── schema.graphql           # GraphQL schema
├── REST-EXAMPLES.md         # REST documentation and examples
├── GRAPHQL-EXAMPLES.md      # GraphQL documentation and examples
├── GRAPHQL-MUTATIONS.md     # Mutation examples
├── COMPARISON.md            # Detailed REST vs GraphQL comparison
└── README.md
```

---

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run REST API
```bash
npm run rest
```
API available at **http://localhost:4000**

### Run GraphQL API
```bash
npm run graphql
```
API available at **http://localhost:4001**  
Apollo Studio interface: open **http://localhost:4001** in your browser

---

## 📦 Tech Stack

- **Node.js** v18+
- **Express** - REST server
- **Apollo Server** - GraphQL server
- **GraphQL** - Query language
- In-memory data (no DB to simplify learning)

---

## 🔍 Quick Examples

### REST
```bash
# Book with author = 2 requests
curl http://localhost:4000/books/1
curl http://localhost:4000/books/1/author
```

### GraphQL
```graphql
# Book with author = 1 request
query {
  book(id: 1) {
    title
    author {
      name
    }
  }
}
```

---

## 📚 Complete Documentation

- **[REST-EXAMPLES.md](REST-EXAMPLES.md)** - All REST examples and identified problems
- **[GRAPHQL-EXAMPLES.md](GRAPHQL-EXAMPLES.md)** - GraphQL queries and comparisons
- **[GRAPHQL-MUTATIONS.md](GRAPHQL-MUTATIONS.md)** - Mutations (create, update, delete)
- **[COMPARISON.md](COMPARISON.md)** - Detailed comparison with use cases

---

## 🎓 What I Learned

### REST Problems Identified
1. ❌ **N+1 Problem** - Multiple requests to fetch relations
2. ❌ **Over-fetching** - Receiving too much data
3. ❌ **Under-fetching** - Not receiving enough data
4. ❌ **Multiple endpoints** - Complex maintenance

### GraphQL Solutions
1. ✅ **Single request** - For all relations
2. ✅ **On-demand fields** - Client chooses exactly what they want
3. ✅ **Nested relations** - Automatic resolution
4. ✅ **Single endpoint** - `/graphql` for everything
5. ✅ **Auto-documentation** - Via schema

### When to Use What?
- **REST**: Simple APIs, basic CRUD, important caching
- **GraphQL**: Complex relations, multiple clients, mobile optimization

---

## 🚀 Possible Next Steps

- [ ] Add DataLoader (N+1 query optimization)
- [ ] Implement Subscriptions (real-time)
- [ ] Add authentication (JWT)
- [ ] Connect to a real database
- [ ] Unit and integration tests
- [ ] Rate limiting and security
- [ ] Pagination

---

## 📈 Results

**To fetch 5 borrowings with books and authors:**

| Metric | REST | GraphQL |
|--------|------|---------|
| Number of requests | 11 | 1 |
| Unnecessary data | ~60% | 0% |
| Client complexity | High | Low |

---

## 👨‍💻 Author

**Farah Rihane**  
Learning project - November 2025

This repo demonstrates a practical and progressive approach to learning GraphQL by directly comparing it with REST.

---

## 📝 License

MIT - Feel free to use for learning purposes