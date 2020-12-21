var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000); 
  
var file_data="";

var shopping_list = [
    {
        id:1,
        name:"shocks",
        price:50
    },
    {   
        id:2,
        name:"shoes",
        price:500
    },
    {
        id:3,
        name:"chocklates",
        price:100
    }
];

app.get('/items',function(req, res)
{
    res.send(shopping_list);
});

app.post('/items',function(req, res)
{
    var item_id = shopping_list.length + 1;
    req.body.id = item_id;
    shopping_list.push(req.body);
    res.send(shopping_list);
});

app.get('/items/:id',function(req, res)
{
    //console.log(typeof req.params.id);
    for (let item of shopping_list)
    {
        //console.log(item);
        if(item.id===Number(req.params.id))
        {
            res.send(item);
        }
    }
    res.send("Item with id "+req.params.id+" not present in shopping list");

});

app.patch('/items/:id',function(req, res)
{
    var item_id = req.params.id;
    for (let item of shopping_list)
    {
        //console.log(item);
        if(item.id===Number(item_id))
        {
            item.name = req.body.name;
            item.price = req.body.price;
        }
    }
    
    res.send(shopping_list);

});

app.delete('/items/:id',function(req,res)
{
    var item_id = req.params.id;
    for (let item of shopping_list)
    {
        //console.log(item);
        if(item.id===Number(item_id))
        {
            indexOfItem = shopping_list.indexOf(item);
            break;
        }
    }
    shopping_list.splice(indexOfItem,1);
    
    res.send(shopping_list);
    
})
