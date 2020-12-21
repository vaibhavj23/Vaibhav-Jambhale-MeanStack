var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));

var port = 3000 ;

app.listen(port);

app.get('/form',function(req, res)
{
    res.render('question_5',{data:""});
});

app.post('/post_data',function(req, res)
{
    var rev_str=req.body.str.split("").reverse().join("");
    //res.send("reversed name: "+rev_str);
    res.render('question_5',{data:rev_str});
});

