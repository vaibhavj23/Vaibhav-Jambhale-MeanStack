class Item{
    public name:string;
    public quantity:number;
    constructor(name:string,quantity:number){
        this.name = name;
        this.quantity = quantity;
        
    }
    
}


interface IDatabase{
    
    getItem(itemName:string): Item;
    getInventory(): Array<Item>;
}
class FakeDatabase implements IDatabase{
    public inventory: Array<Item>=[];
    
    constructor(){
        this.inventory.push(new Item("Apples",3));
        this.inventory.push(new Item("Oranges",7));
        this.inventory.push(new Item("Banana",55));

    }
    
    getItem(itemName:string):Item{
        var found = false;
        var temp;
        for(var item of this.inventory){
            if(item.name==itemName){
                found = true;
                temp = item;
                break;
            }
        }
        if(found){
            return temp;
        }
        else{
            return undefined;
        }
        
    }

    getInventory(): Array<Item>{
        return this.inventory;
    }

}

//Initializing Fake Database
let fd = new FakeDatabase();


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { json } = require('body-parser');

app.use(bodyParser.json());



app.get("/inventory", function(req,res){
    res.json(fd.getInventory());
});



app.get("/inventory/:id", function(req,res){
    var id = req.params.id;
    var found = false;
    var temp = fd.getItem(id);
    if(temp==undefined){
        res.send("Cannot find the Item");
    }
    else{
        res.json(temp);
    }
    
});

app.post("/inventory", function(req,res){
    var item = req.body;
    fd.inventory.push(item);
    res.send("Added Successfully: "+item);
});

app.delete("/inventory/:id", function(req,res){
    
    var found = false;
    for(var i=0;i<fd.inventory.length;i++){
        if(fd.inventory[i].name==req.params.id){
            found = true;
            fd.inventory.splice(i,i+1);
        }
    }
    if(found){
        res.send("Item removed successfully");
    }
    else{
        res.send("Cannot find the specified item name");
    }
});

app.delete("/inventory", function(req,res){
        fd.inventory = [];
        res.send("Deleted the Inventory");
    });

app.put("/inventory/:id", function(req,res){
    var found = false;
    for(var i=0;i<fd.inventory.length;i++){
        if(fd.inventory[i].name==req.params.id){
            found = true;
            fd.inventory[i] = req.body;
            break;
        }
    }
    if(found){
        res.send("Item modified successfully");
    }
    else{
        res.send("Cannot find the specified Item Name");
    }
});

app.put("/inventory", function(req,res){
    
    fd.inventory = req.body;
    res.send("Updated entire Inventory");
    

});


app.listen(3000, function(){
    console.log("Listening from port 3000");
});

