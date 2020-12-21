var express = require('express');

var app = express();

var port = process.argv[2];

app.listen(port);

app.get('/home',function(req, res)
{
    res.send("Hello World !!!");
});
