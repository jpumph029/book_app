'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', getBook);
app.get('/new-search', renderSearchForm);
app.post('/search-results', getSearchResults);

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));


// function saveBook(book) {
//   const SQL = `INSERT INTO books (author,title,isbn,image_url,description,bookshelf) VALUES ($1, $2, $3, $4, $5, $6);`;
//   const values = Object.values(this);
//   values.push(book);
//   client.query(SQL, values);
// }

function Book(data) {
  this.author = data.volumeInfo.authors || 'N/A';
  this.title = data.volumeInfo.title || 'N/A';
  this.isbn = data.isbn || 'N/A';
  this.thumbnail = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x200.png';
  this.description = data.volumeInfo.description || 'N/A';
  this.bookshelf = data.bookshelf || 'N/A';
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

function getBook(req, res){
  let sql = 'SELECT * FROM books ';
  let values=(req.params.books_id);
  var counter = 0;
  return client.query(sql,values).then(result =>{
    result.rows.forEach( () => counter++);
    res.render('pages/index', {books: result.rows, numBooks: counter});
  }).catch((err) =>console.log(err.message));
}

function renderSearchForm(req, res){
  res.render('./pages/searches/new');
}

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

function handleError(err, res) {
  console.error(err);
  if (err) res.status(500).render('./pages/error');
}
