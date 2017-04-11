var mysql = require('mysql');

var book = {
  findRecord: function(id) {
    return new Promise(function(resolve, reject) {
      var connection = mysql.createConnection({
        host     : 'itp460.usc.edu',
        user     : 'student',
        password : 'ttrojan',
        database : 'itp405-midterm'
      });

      var bookID = id;

      connection.connect();
      connection.query('SELECT books.id, books.author_id, books.publisher_id, books.title, publishers.id, publishers.name, authors.id, authors.first_name, authors.last_name FROM books, authors, publishers WHERE books.author_id = authors.id and books.publisher_id = publishers.id AND books.id = ?', [ bookID ], function(error, books) {
        if (error) {
          reject();
        } else {
          if (books.length === 0) {
            reject({
              error: {
                message: 'Book not found'
              }
            });
          } else {
            var formattedBooks = books.map(function(book) {
              return {
                book: {
                  id: bookID,
                  title: book.title,
                  publisher: {
                    id: book.publisher_id,
                    name: book.name
                  },
                  author: {
                    id: book.author_id,
                    first_name: book.first_name,
                    last_name: book.last_name
                  }
                }
              };
            });
            resolve(formattedBooks[0]);
          }
        }
      });
    });
  }
};

module.exports = book;
