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

app.post('/search', getUserInput);

function Book(data) {
  // this.thumbnail = data.imageLinks.thumbnail;  
  this.author = data.volumeInfo.authors;
  this.title = data.volumeInfo.title;
  this.description = data.volumeInfo.description;
}

function getUserInput(req, res) {
  console.log('my request body:', req.body);
  let input = req.body;
  retrieveAPIData(input)
    .then(result => res.send(result))
    .catch(error => handleError(error));
}
const retrieveAPIData = (input => {
  let query = input.searchField;
  let searchType = input.userInput;
  let title_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}:intitle=${query}`;
  let author_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}:inauthor=${query}`;
  let _URL = '';
  if (searchType === 'author') {
    _URL = author_URL;
  } else if (searchType === 'title') {
    _URL = title_URL;
  } else if (title_URL) {
    _URL = title_URL;
  }
  return superagent.get(_URL).then(result => {
    const bookResults = result.body.items.map(data => {
      const newBook = new Book(data);
      return newBook;
    });
    // console.log('allBooks', bookResults);
    return bookResults;
  });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

function handleError(err, res) {
  console.error(err);
  if (res) res.satus(500).send('Sorry, something broke');
}