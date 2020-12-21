"use strict";
let circle = {
    print: () => {
        console.log("This is Circle Object");
    }
};
let employee = {
    print: () => {
        console.log("This is Employee Object");
    }
};
function printAll(obj1, obj2) {
    obj1.print();
    obj2.print();
}
printAll(circle, employee);
//# sourceMappingURL=question_3.js.map