"use strict";
function getNextArmstrong(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;
    const rangeIterator = {
        next: function () {
            let result;
            while (nextIndex < end) {
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
                    nextIndex += step;
                    iterationCount++;
                    return result;
                }
                else {
                    nextIndex += step;
                    iterationCount++;
                }
            }
            return { value: iterationCount, done: true };
        }
    };
    return rangeIterator;
}
const it = getNextArmstrong(1, 1000, 1);
let result = it.next();
while (!result.done) {
    console.log(result.value);
    result = it.next();
}
//# sourceMappingURL=question_2.js.map