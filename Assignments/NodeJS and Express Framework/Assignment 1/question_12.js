var dt = new Date();

//console.log(dt);

let date = (dt.getDate());

let month = ((dt.getMonth() + 1));

let year = dt.getFullYear();

let hours = dt.getHours();

let minutes = dt.getMinutes();

let seconds = dt.getSeconds();

console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
