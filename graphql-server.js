import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import { authors, books, borrowings } from "./data.js";

// Load schema from external file
const typeDefs = fs.readFileSync("./schema.graphql", "utf8");

// Define Resolvers: Functions that will fetch the data for each type in the schema
const resolvers = {
  Query: {
    // Fetch all authors, books, and borrowings
    authors: () => authors,
    books: () => books,
    borrowings: () => borrowings,

    // Fetch a single author by ID
    author: (parent, args) => {
      return authors.find((a) => a.id === args.id);
    },
    
    // Fetch a single book by ID
    book: (parent, args) => {
      return books.find((b) => b.id === args.id);
    },
  },

  // Resolvers for relationships between types
  Author: {
    books: (parent) => {
      return books.filter((b) => b.authorId === parent.id);
    },
  },
  
  // Resolver for Book type to fetch its author
  Book: {
    author: (parent) => {
      return authors.find((a) => a.id === parent.authorId);
    },
    borrowings: (parent) => {
      return borrowings.filter((bor) => bor.bookId === parent.id);
    },
  },
  
  // Resolver for Borrowing type to fetch its book
  Borrowing: {
    book: (parent) => {
      return books.find((b) => b.id === parent.bookId);
    },
  },

  // 🔥 Mutations (Create, Update, Delete operations)
  Mutation: {
    // Create a new borrowing
    createBorrowing: (parent, args) => {
      const newBorrowing = {
        id: borrowings.length + 1,
        bookId: args.bookId,
        userName: args.userName,  // ✅ userName (not borrowerName!)
        borrowDate: new Date().toISOString().split("T")[0],
        returned: false,
      };
      borrowings.push(newBorrowing);
      return newBorrowing;
    },

    // Mark a borrowing as returned
    returnBook: (parent, args) => {
      const borrowing = borrowings.find((b) => b.id === args.borrowingId);
      if (!borrowing) {
        throw new Error("Borrowing not found");
      }
      borrowing.returned = true;
      return borrowing;
    },

    // Add a Book
    addBook: (parent, args) => {
      const newBook = {
        id: books.length + 1,
        title: args.title,
        authorId: args.authorId,
        pages: args.pages,
        year: args.year,
      };
      books.push(newBook);
      return newBook;
    },
  },
};

// Create Apollo Server instance
/**
 * Apollo Server => Node.js Library that helps to build a GraphQL server
 * 1. Understand GraphQL queries
 * 2. Knows how to fetch the requested data (Via Resolvers)
 * 3. Sends back the results in the correct GraphQL format
 * GraphQL schema <---Connect IT to ---> Resolvers (How To GET data)
 */

// Build a Copy of Apollo Server Customized
const server = new ApolloServer({
  typeDefs,   // Schema Definition
  resolvers,  // Resolvers Definition
});

// Start the server
startStandaloneServer(server, {
  listen: { port: 4001 },
}).then(({ url }) => {
  console.log(`🚀  GraphQL API ready at: ${url}`);
  console.log(
    `Open ${url} in your browser to access the GraphQL Playground (Apollo Studio)`
  );
});