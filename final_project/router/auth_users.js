const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];


regd_users.post('/register', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis" });
    if (users[username]) return res.status(400).json({ message: "Utilisateur déjà existant" });

    users[username] = { password };
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
});

function isValid(username) {
  return users.hasOwnProperty(username);
}

//only registered users can login
regd_users.post('/login', function (req, res) {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) return res.status(401).json({ message: "Identifiants incorrects" });

  const token = jwt.sign({ username }, "secret_key", { expiresIn: '1h' });
  req.session.token = token;
  res.status(200).json({ message: "Connexion réussie", token });
});

// Add a book review
regd_users.post('/review/:isbn', function (req, res) {
  const username = jwt.verify(req.session.token, "secret_key").username;
  const { review } = req.body;

  if (!books[req.params.isbn].reviews) books[req.params.isbn].reviews = {};
  books[req.params.isbn].reviews[username] = review;

  res.status(200).json({ message: "Critique ajoutée/modifiée avec succès" });
});

regd_users.delete('/review/:isbn', function (req, res) {
  const username = jwt.verify(req.session.token, "secret_key").username;
  delete books[req.params.isbn].reviews[username];

  res.status(200).json({ message: "Critique supprimée avec succès" });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
