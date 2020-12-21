
var myArgs = process.argv.slice(2);

var fs = require('fs');

fs.readFile(myArgs[0],'utf8',function(err,data)
{
    console.log(data);
});



