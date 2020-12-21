var express = require('express');

var app = express();

app.listen(3000);

app.get('/year',function(req, res)
{
    var age = req.query.age;
    var year = 2019-(Number(age));
    res.send(`you were born in ${year}.`);
});
