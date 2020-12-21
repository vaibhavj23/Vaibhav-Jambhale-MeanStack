var express = require('express');
var fs = require('fs'); 

var app = express();

var port = process.argv[2];
//console.log(port);
var file = process.argv[3];
//console.log(file);
app.listen(port); 
  
var file_data="";

app.get('/books',function(req, res)
{
    fs.readFile(file, function(err, data){ 
        if (err) throw err;
        file_data = JSON.parse(data);

        res.json(file_data);

});

});
