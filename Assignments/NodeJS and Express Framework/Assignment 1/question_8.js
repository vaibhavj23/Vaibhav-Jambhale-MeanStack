
var fs = require('fs');

let file_data=fs.readFileSync('question_8.txt','utf8');

var file_data_to_array = file_data.split(",");

let sum=0;

for(let str of file_data_to_array)
{
    let strToNum = Number(str);
    sum=sum+strToNum;
}

console.log(`The sum of nubers in text file is ${sum}`);
