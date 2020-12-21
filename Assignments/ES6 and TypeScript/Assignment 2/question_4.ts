
class Users {
    public username:string;
    public message_arr:string[]=[];
    public chatroom:Map<string,string[]>= new Map();
    constructor(username:string)
    {
        this.username= username;
        this.message_arr=[];
    }

    addToChatRoom(chatroom:Map<string,string[]>)
    {
        this.chatroom = chatroom;
        chatroom.set(this.username,this.message_arr);
    };

    post(mssg:string)
    {
        this.message_arr=this.chatroom.get(this.username);
        this.message_arr.push(mssg);
        this.chatroom.set(this.username,this.message_arr);
    }
    
}

function getUsersfromChatRoom(chatroom:Map<string,string[]>)
{
    for (let user of chatroom.keys()) {
        console.log(user);
    }
}

function getMesssagesFromChatroom(chatroom:Map<string,string[]>)
{
    for (let [key, value] of chatroom) {
        console.log(key+" :");
        for(let message of value)
        {
            console.log(message);
        }
    } 
}

let user1 = new Users("Sam");
let user2 = new Users("Tom");
let user3 = new Users("Joey");
let user4 = new Users("Ramesh");
let user5 = new Users("Suresh");
let user6 = new Users("Kamal");

let chatRoom_1_Users = new Set([user1,user2,user3]);
let chatRoom_2_Users = new Set([user4,user5,user6]);


let chatroom1 = new Map();
let chatroom2 = new Map();

user1.addToChatRoom(chatroom1);
user2.addToChatRoom(chatroom1);
user3.addToChatRoom(chatroom1);

user4.addToChatRoom(chatroom2);
user5.addToChatRoom(chatroom2);
user6.addToChatRoom(chatroom2);

//get users from chatroom 1
console.log("Chat Room 1 Users");
getUsersfromChatRoom(chatroom1);

console.log("Chat Room 2 Users");
getUsersfromChatRoom(chatroom2);


user1.post("Hii there");
user1.post("How are you");
user2.post("i am good");
user3.post("Whats up");
user3.post("Lets enjoy today's final");
user2.post("It is going to be exiting");

user4.post("Whats the plan for the weekend");
user5.post("Not decided yet");
user6.post("lets plan something");
user5.post("Lets go to goa");
user4.post("Yeah this is good");

console.log("Chat Room 1");
console.log(chatroom1);

console.log("Chat Room 2");
console.log(chatroom2);

console.log("Chat Room 1 Messages");
getMesssagesFromChatroom(chatroom1);

console.log("Chat Room 2 Messages");
getMesssagesFromChatroom(chatroom2);


