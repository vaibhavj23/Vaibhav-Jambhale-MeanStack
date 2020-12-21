
var myArgs = process.argv.slice(2);

var fs = require('fs');

fs.writeFile(myArgs[0],myArgs[1],function(err)
    {
        if(err)
        { 
            throw err;
        }
        else
        {
            console.log("The file was saved!");
        }
    }
);

fs.readFile(myArgs[0],'utf8',function(err,data)
{
    console.log(data);
});


