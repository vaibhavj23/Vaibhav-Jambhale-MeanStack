var express = require('express');

var app = express();

var port = process.argv[2];

app.set('view engine', 'pug')

app.listen(port);

app.get('/home',function(req, res)
{
    res.render('question_8',{date: new Date().toDateString()});
});
