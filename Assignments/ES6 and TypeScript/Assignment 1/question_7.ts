//part a

let numArray=[1,2,3,4];

let[first_ele,second_ele,third_ele,fourth_ele]=numArray;

console.log(third_ele);

//part b

let organization={
    name: "Delta Solutions",
    address:{
        street:"1st Street",
        city:"NY",
        pin:20098
    }
}

let{name,address}=organization;

console.log(address.pin);