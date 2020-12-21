"use strict";
// part a
function add(a, b) {
    let sum = a + b;
    console.log(`(a)Add Function:${a}+${b} = ${sum}`);
}
;
add(5, 4);
//part b
var userFriends = (username, ...friends) => {
    console.log(`${username} friends are ${friends.join(",")}`);
};
userFriends("Sam", "Tom", "Joe", "Rachel");
userFriends("Chandler", "Joe", "Rachel");
//part c
var printCapitalNames = (a, b, c, d, e) => {
    console.log(`${a.toUpperCase()} ,${b.toUpperCase()} , ${c.toUpperCase()} , ${d.toUpperCase()}, ${e.toUpperCase()}`);
    //console.log(a.toUpperCase());
};
var smallNames = ["Sam", "Tom", "Joe", "Rachel", "Monica"];
printCapitalNames(...smallNames);
//# sourceMappingURL=question_5.js.map