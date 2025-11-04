// Données simulées - utilisées par REST et GraphQL
const authors = [
  { id: 1, name: "Victor Hugo", country: "France", birthYear: 1802 },
  { id: 2, name: "Agatha Christie", country: "UK", birthYear: 1890 },
  { id: 3, name: "Naguib Mahfouz", country: "Egypt", birthYear: 1911 }
];

const books = [
  { id: 1, title: "Les Misérables", authorId: 1, pages: 1463, year: 1862 },
  { id: 2, title: "Notre-Dame de Paris", authorId: 1, pages: 512, year: 1831 },
  { id: 3, title: "Murder on the Orient Express", authorId: 2, pages: 256, year: 1934 },
  { id: 4, title: "Cairo Trilogy", authorId: 3, pages: 1344, year: 1956 }
];

const borrowings = [
  { id: 1, bookId: 1, userName: "Ahmed", borrowDate: "2024-10-15", returned: false },
  { id: 2, bookId: 3, userName: "Sarah", borrowDate: "2024-10-20", returned: true }
];

module.exports = { authors, books, borrowings };