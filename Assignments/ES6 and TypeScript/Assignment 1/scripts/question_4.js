"use strict";
let names = ["tom", "evan", "harry"];
let objArray = [];
let obj = function (name, length) {
    this.name = name,
        this.length = name.length;
};
let calculateLength = (str) => {
    objArray.push(new obj(str));
};
for (let name of names) {
    calculateLength(name);
}
;
console.log(objArray);
//# sourceMappingURL=question_4.js.map