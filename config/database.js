var mysql = require('mysql');

var con = mysql.createConnection({
  host: "library.c1kbpa6z08tl.eu-west-1.rds.amazonaws.com",
  user: "TestUser",
  password: "TPO12345",
  database: "mydb",
  charset : 'utf8mb4'
});


con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM books", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});