
var myArgs = process.argv.slice(2);

var fs = require('fs');

fs.writeFile('writeMe.txt',myArgs[0],function(err)
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



