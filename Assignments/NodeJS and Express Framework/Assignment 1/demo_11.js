//demo file to read
var fs = require('fs');


fs.readdir(__dirname, (err, files) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("\nCurrent directory filenames:"); 
      files.forEach(file => { 
        var stats = fs. statSync(file);
        if(stats. isFile())
        {
          console.log(`FILE: ${file}`)
        }
        else if(stats. isDirectory())
        {
          console.log(`DIR: ${file}`);
        }
      }) 
    } 
  }) ;
    

