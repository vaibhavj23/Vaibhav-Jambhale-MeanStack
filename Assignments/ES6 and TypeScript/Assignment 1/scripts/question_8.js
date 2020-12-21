"use strict";
let accounts = [];
class Account {
    constructor(id, name, balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        accounts.push(this);
    }
}
;
class SavingAccount extends Account {
    constructor(id, name, balance, interest) {
        super(id, name, balance);
        this.interest = interest;
    }
}
;
class CurrentAccount extends Account {
    constructor(id, name, balance, cash_credit) {
        super(id, name, balance);
        this.cash_credit = cash_credit;
    }
}
;
let s1 = new SavingAccount(1, "Joey", 2500, 8);
let s2 = new SavingAccount(2, "Sam", 5500, 9);
let s3 = new SavingAccount(3, "Tom", 2000, 5);
let c1 = new CurrentAccount(1, "Chandler", 2000, 450);
let c2 = new CurrentAccount(2, "Ross", 7000, 200);
let c3 = new CurrentAccount(3, "Milan", 3000, 650);
let total_balance = 0;
for (let acc of accounts) {
    total_balance = total_balance + (acc.balance);
}
console.log(`total balance in bank : ${total_balance}`);
//# sourceMappingURL=question_8.js.map