var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
// var bodyParser = require('body-parser');
let ejs = require('ejs');

var connection = mysql.createConnection({
  host: "library.c1kbpa6z08tl.eu-west-1.rds.amazonaws.com",
  user: "TestUser",
  password: "TPO12345",
  database: "mydb",
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


//to insert record into mysql
/*connection.query('INSERT INTO books (title, authorFirstName,authorLastName, issueYear, isbn, publisher, noOfPages, cover, description ) VALUES ('W pustyni i w puszczy', 'Henryk', 'Sienkiewicz', 1990, '505-505-505', 'Greg', 312, 'Twarda', 'Opis')', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});*/

//to update record into mysql
/*connection.query('UPDATE books SET title='tytul testowy', authorFirstName='autor testowy',authorLastName='autor testowy', issueYear=2000, isbn='ISBN testowy', publisher='wydawnictwo test', noOfPages=123, cover='twarda', description='opis' where `id`=1', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});*/

//featch records from mysql database
//   connection.query('select * from books', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
//delete record from mysql database
/*connection.query('delete from books where id=1', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});*/

//end connection
// connection.end();












//Create node.js Server
var server = app.listen(3000, "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});


//rest api to get all results
app.get('/books', function (req, res) {
  console.log(req);
  connection.query('SELECT * from books INNER JOIN publishers ON (books.id_publishers=publishers.id)', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


//rest api to get a single book data
app.get('/books/:id', function (req, res) {
  connection.query('select * from books where id=?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to create a new record into mysql database
app.post('/books/new', function (req, res) {
  var postData = req.body;
  connection.query('INSERT INTO books SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


//rest api to update record into mysql database 
app.post('/books', function (req, res) {
  connection.query('UPDATE books INNER JOIN publishers ' +
    'ON books.id_publishers = publishers.id ' +
    'SET books.title=?, books.authorFirstName=?, books.authorLastName=?, ' +
    'books.issueYear=?, books.isbn=?, publishers.publisherName=?, ' +
    'books.noOfPages=?, books.cover=?, books.description=? ' +
    'where books.id=?',
    [req.body.title, req.body.authorFirstName, req.body.authorLastName,
    req.body.issueYear, req.body.isbn, req.body.publisherName, req.body.noOfPages,
    req.body.cover, req.body.description, req.body.id],
    function (error, results, fields) {
      if (error) throw error;
      res.redirect('/metryka/' + req.body.id)
    });
});

//rest api to delete record from mysql database
app.delete('/books', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `books` WHERE `id`=?', [req.body.id], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
  });
});



app.set('view engine', 'ejs');
app.use(express.static('gui'))


app.get('/listing', function (req, res) {
  // console.log(req);
  connection.query('select * from books', function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.render('listing', { books: results });
    // res.end(JSON.stringify(results));
  });

});


app.get('/metryka/new', function (req, res) {

  var book =  {
    title: "", authorFirstName: "", authorLastName: "", issueYear: "",
    isbn: "", publisherName: "", noOfPages: "", cover: "", description: ""
  };
  res.render('metryka', {
    book: book
  });

});
app.get('/metryka/:id', function (req, res) {
  // console.log(req);
  connection.query('SELECT ' +
    'books.id, books.title, books.authorFirstName, books.authorLastName, books.issueYear, ' +
    'books.isbn, publishers.publisherName, books.noOfPages, books.cover, books.description ' +
    'from books INNER JOIN publishers ' +
    'ON (books.id_publishers=publishers.id) where books.id=?', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      // console.log(results[0]);
      res.render('metryka', { book: results[0] });
    });

});


