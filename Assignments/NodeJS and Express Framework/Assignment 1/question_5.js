
var myArgs = process.argv.slice(2);

var fs = require('fs');

let file_data=fs.readFileSync('question5.txt','utf8');

let search = myArgs[0];
let count_str = 0;
var file_data_to_array = file_data.split(" ");

for(let str of file_data_to_array)
{
    if(str===search)
    {
        count_str++;
    }
}

console.log(`${search} occurs ${count_str} times in the file.`);
