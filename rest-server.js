import express from "express";
import { authors, books, borrowings } from "./data.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();
// GET / authors - Récupérer tous les auteurs
app.get("/authors", (req, res) => {
  res.json(authors);
});

// GET /authors/:id - Récupérer un auteur par ID
app.get("/authors/:id", (req, res) => {
  const author = authors.find((a) => a.id == parseInt(req.params.id));
  if (!author) return res.status(404).json({ error: "Author not found!" });
  res.json(author);
});

// GET /books - Récupérer tous les livres
app.get("/books", (req, res) => {
  res.json(books);
});

//GET /books/:id - Récupérer un livre par son ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found!" });
  res.json(book);
});

// GET /books/:id/author - Auteur d'un livre (Filtrage)
app.get("/books/:id/author", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found!" });
  const author = authors.find((a) => a.id === book.authorId);
  res.json(author);
});

//GET /borrowings - Récupérer tous les emprunts
app.get("/borrowings", (req, res) => {
  res.json(borrowings);
});

//POST /borrowings - Créeer un emprunt
app.post("/borrowings", (req, res) => {
  const { bookId, userName } = req.body;

  const newBorrowing = {
    id: borrowings.length + 1,
    bookId,
    userName,
    borrowDate: new Date().toISOString().split("T")[0],
    returned: false,
  };
  borrowings.push(newBorrowing);
  res.status(201).json(newBorrowing);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`REST API server running on http://localhost:${PORT}`);
})
module.exports = app;