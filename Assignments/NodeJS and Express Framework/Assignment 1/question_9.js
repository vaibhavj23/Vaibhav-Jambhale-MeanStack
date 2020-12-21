var fs = require('fs');
var concat = require('concat-stream');
var arrwrite = concat(function(data) {console.log(data);});

arrwrite.write(fs.readFileSync('Question_9a.txt','utf-8').split(" "));
arrwrite.write(fs.readFileSync('Question_9b.txt','utf-8').split(","));
arrwrite.end();