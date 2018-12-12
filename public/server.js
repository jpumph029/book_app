'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('./pages/index');
});

app.post('/search', getSearchResults);

function Book(data) {
  // TODO: fix this so || works
  this.thumbnail = data.volumeInfo.imageLinks.thumbnail || 'https://via.placeholder.com/128x200.png';
  this.author = data.volumeInfo.authors || 'N/A';
  this.title = data.volumeInfo.title || 'N/A';
  this.description = data.volumeInfo.description || 'N/A';
}

function getSearchResults(req, res) {
  let input = req.body;
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${input.searchField}+${input.userInput}:${input.searchField}`;
  return superagent.get(URL).then(data => {
    const allBooks = data.body.items.map(data => {
      const newBook = new Book(data);
      return newBook;
    });
    return allBooks;
  }).then(allBooks => res.render('./pages/searches/show', { books: allBooks }))
    .catch(error => handleError(error));
}

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

function handleError(err, res) {
  console.error(err);
  if (res) res.satus(500).send('Sorry, something broke');
}