var express = require('express');

var app = express();

//var PORT = 8080;

var port = process.env.PORT || 8080 ;

console.log(port);

app.listen(port);


app.get('/',function(req, res)
{
    res.send("Hello World !!!");
});

app.get('/time',function(req, res)
{
    var dt = new Date();
    var dtToISO = dt.toISOString();
    res.send(`Today's Date: ${dtToISO}`);
});

