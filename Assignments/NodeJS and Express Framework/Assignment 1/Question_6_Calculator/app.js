var calc = require('./calculator.js');

console.log("Phase 1 output");
calc.add(3,7);
calc.multiply(3,7);

console.log("Phase 2 output");

var addition = require('./Operations/sum.js');
var substraction = require('./Operations/substraction');
var multiplication = require('./Operations/multiplication');
var division = require('./Operations/division');

addition.add(4,2);
substraction.substract(4,2);
multiplication.multiply(4,2);
division.divide(4,2);


// Phase 3

var moment = require('moment');
console.log("Phase 3 output");

console.log(`Today is : ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`); 
calc.add(3,7);
calc.multiply(3,7);

