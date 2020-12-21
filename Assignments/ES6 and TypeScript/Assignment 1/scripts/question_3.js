"use strict";
let order = {
    'id': 1,
    'title': "Shoe",
    'price': 500
};
order.printOrder = function () {
    console.log(`id: ${this.id} `);
    console.log(`title: ${this.title} `);
    console.log(`price: ${this.price} `);
};
order.getPrice = function () {
    console.log(`Price is ${this.price}`);
};
console.log(order);
order.printOrder();
order.getPrice();
let newObj = {};
newObj = Object.assign(newObj, order);
console.log(`new object created using assign`);
console.log(newObj);
//# sourceMappingURL=question_3.js.map