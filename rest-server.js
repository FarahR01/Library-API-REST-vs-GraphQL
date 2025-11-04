import express from "express";
import { authors, books, borrowings } from "./data.js";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger.js";
const app = express();
app.use(express.json());
dotenv.config();
// GET / authors - Récupérer tous les auteurs
/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Récupère tous les auteurs
 *     responses:
 *       200:
 *         description: Liste des auteurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Victor Hugo"
 *                   country:
 *                     type: string
 *                     example: "France"
 *                   birthYear:
 *                     type: integer
 *                     example: 1802
 */
app.get("/authors", (req, res) => {
  res.json(authors);
});

//swagger

setupSwagger(app);

// GET /authors/:id - Récupérer un auteur par ID
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Récupère un auteur par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de l'auteur
 *     responses:
 *       200:
 *         description: Détails de l'auteur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 country:
 *                   type: string
 *                 birthYear:
 *                   type: integer
 *       404:
 *         description: Auteur non trouvé
 */
app.get("/authors/:id", (req, res) => {
  const author = authors.find((a) => a.id == parseInt(req.params.id));
  if (!author) return res.status(404).json({ error: "Author not found!" });
  res.json(author);
});

// GET /books - Récupérer tous les livres
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Récupère tous les livres
 *     responses:
 *       200:
 *         description: Liste des livres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   authorId:
 *                     type: integer
 *                   pages:
 *                     type: integer
 *                   year:
 *                     type: integer
 */
app.get("/books", (req, res) => {
  res.json(books);
});

//GET /books/:id - Récupérer un livre par son ID
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Récupère un livre par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID du livre
 *     responses:
 *       200:
 *         description: Détails du livre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 authorId:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 year:
 *                   type: integer
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Livre non trouvé
 */
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found!" });
  res.json(book);
});

// GET /books/:id/author - Auteur d'un livre (Filtrage)
/**
 * @swagger
 * /books/{id}/author:
 *   get:
 *     summary: Récupère l'auteur d'un livre
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID du livre
 *     responses:
 *       200:
 *         description: Détails de l'auteur du livre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 country:
 *                   type: string
 *                 birthYear:
 *                   type: integer
 *       404:
 *         description: Livre non trouvé
 */
app.get("/books/:id/author", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found!" });
  const author = authors.find((a) => a.id === book.authorId);
  res.json(author);
});

//GET /borrowings - Récupérer tous les emprunts
/**
 * @swagger
 * /borrowings:
 *   get:
 *     summary: Récupère tous les emprunts
 *     responses:
 *       200:
 *         description: Liste des emprunts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   bookId:
 *                     type: integer
 *                   userName:
 *                     type: string
 *                   borrowDate:
 *                     type: string
 *                   returned:
 *                     type: boolean
 *   post:
 *     summary: Crée un nouvel emprunt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - userName
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               userName:
 *                 type: string
 *                 example: "Ahmed"
 *     responses:
 *       201:
 *         description: Emprunt créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 bookId:
 *                   type: integer
 *                 userName:
 *                   type: string
 *                 borrowDate:
 *                   type: string
 *                 returned:
 *                   type: boolean
 */
app.get("/borrowings", (req, res) => {
  res.json(borrowings);
});

//POST /borrowings - Créeer un emprunt
/**
 * @swagger
 * /borrowings:
 *   post:
 *     summary: Crée un nouvel emprunt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - userName
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               userName:
 *                 type: string
 *                 example: "Ahmed"
 *     responses:
 *       201:
 *         description: Emprunt créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 bookId:
 *                   type: integer
 *                 userName:
 *                   type: string
 *                 borrowDate:
 *                   type: string
 *                 returned:
 *                   type: boolean
 */
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
  console.log(`Swagger UI available on http://localhost:${PORT}/api-docs`);
});
export default app;
