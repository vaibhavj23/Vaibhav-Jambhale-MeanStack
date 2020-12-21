"use strict";
function* getNextArmstrong() {
    let nextIndex = 1;
    while (true) {
        let reset;
        let result;
        let sum = 0;
        let temp = nextIndex;
        let str = temp.toString();
        while (temp > 0) {
            let remainder = temp % 10;
            sum += Math.pow(remainder, str.length);
            temp = Math.floor(temp / 10);
        }
        if (sum == nextIndex) {
            result = { value: nextIndex, done: false };
            nextIndex += 1;
            if (result.value > 1000) {
                result = { value: nextIndex, done: true };
                throw (new Error("Value greater than 1000"));
            }
            reset = yield result;
        }
        else {
            reset = 0;
            nextIndex += 1;
        }
        if (reset) {
            nextIndex = 1;
        }
    }
}
const getNum = getNextArmstrong();
/*let output = getNum.next();
console.log((output.value).value);
output = getNum.next();
console.log((output.value).value);*/
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next(true).value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
console.log((getNum.next().value).value);
//# sourceMappingURL=question_3.js.map