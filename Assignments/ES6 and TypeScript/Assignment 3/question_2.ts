let accounts:Account[] =[];
class Account{
    public id:number;
    public name:string;
    public balance:number;
    constructor(id:number,name:string,balance:number){
        this.id=id;
        this.name=name;
        this.balance=balance
        accounts.push(this);
    }
};

class SavingAccount extends Account{
    public interest:number;
    constructor(id:number,name:string,balance:number,interest:number)
    {
        super(id,name,balance);
        this.interest=interest;
    }
};

class CurrentAccount extends Account{
    public cash_credit:number;
    constructor(id:number,name:string,balance:number,cash_credit:number)
    {
        super(id,name,balance);
        this.cash_credit=cash_credit;
    }
};

let s1=new SavingAccount(1,"Joey",2500,8);
let s2=new SavingAccount(2,"Sam",5500,9);
let s3=new SavingAccount(3,"Tom",2000,5);

let c1= new CurrentAccount(1,"Chandler",2000,450);
let c2= new CurrentAccount(2,"Ross",7000,200);
let c3= new CurrentAccount(3,"Milan",3000,650);


function getBankBalance(){

    let total_balance=0;

    for(let acc of accounts)
    {
        total_balance=total_balance+(acc.balance);
    }
    return total_balance;
}

let bankBalance=getBankBalance()

console.log(`total balance in bank : Rs ${bankBalance}`);