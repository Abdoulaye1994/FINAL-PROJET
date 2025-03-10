const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.status(200).json(books[isbn]);
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.status(200).json(books[isbn]);
});

  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(book => book.author === author);
  res.status(200).json(booksByAuthor);
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(book => book.title === title);
  res.status(200).json(booksByTitle);
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.status(200).json(books[isbn]?.reviews || []);
});


module.exports.general = public_users;
