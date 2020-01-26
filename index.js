//podłącznie express
var express = require('express');
var app = express();

app.get('/', (req,res)=> res.send('Hello world'));

app.listen(3000, ()=>console.log('Nasz serwer działa na porcie 3000'));

//odpalanie komendą node index.js