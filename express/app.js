//odpalanie komendą node app.js

const express = require('express');
const app = express();

//aby odpalić middleware -> use
var middleware = function (req, res, next){
    console.log('new request!');
    next();
};
app.use(middleware);

// testowanie w PostMan url: 127.0.0.1:3000
app.all('/', function (req,res){ // dzieki temu, ze mamy all, a nie tylko get otrzymujemy dla kazdego typu zapytania nasz komunikat
    res.send('Hello world');
});

//api - > wygenerowanie losowej liczby i zwrócenie jej json
//url do testowania: 127.0.0.1:3000/api/getRandomNumber
app.get('/api/getRandomNumber', function(req, res){
    res.send({randomNumber: Math.random()});
});
//deklaracja parametrów i dostawanie się do nich
app.get('/api/random/min/:min/max/:max', function (req, res){
    var min = Number(req.params.min);
    var max=Number(req.params.max);

    var randomNumber=Math.floor((Math.random()*max)+min)
    res.send({randomNumber: randomNumber});
});

app.listen(3000, ()=>console.log('Nasz serwer działa na porcie 3000'));

