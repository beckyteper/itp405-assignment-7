var express = require('express');
var mysql = require('mysql');
var app = express();
var review = require('./src/review');
var book = require('./src/book');

//TODO: need to use findAll()
app.get('/api/v1/reviews', function(request, response) {
  review.findAll().then(function(reviews) {
    response.json(reviews);
  }, function(error) {
    response.json(error);
  });
});

app.get('/api/v1/books/:id', function(request, response) {
  book.findRecord(request.params.id).then(function(formattedBooks) {
    response.json(formattedBooks);
  }, function(error) {
    response.json(error);
  });
});

app.listen(3000);
