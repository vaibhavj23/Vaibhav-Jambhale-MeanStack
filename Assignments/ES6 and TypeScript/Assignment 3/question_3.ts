interface Printable{
    print:()=>void
}

let circle:Printable = {
    print:()=>{
        console.log("This is Circle Object");
    }
}

let employee:Printable = {
    print:()=>{
        console.log("This is Employee Object");
    }
}

function printAll(obj1:Printable,obj2:Printable) {
    obj1.print();
    obj2.print();
}

printAll(circle,employee);