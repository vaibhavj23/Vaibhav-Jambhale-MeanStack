const {Router} = require('express');
const router = Router();
var inventories = require('../models/inventory.model.js');


//Question 1
router.get('/inventory',function(req, res)
{
    res.send(inventories);
});

router.get('/inventory/:name',function(req, res)
{
    for (let inventory of inventories)
    {
        if(inventory.name===req.params.name)
        {
            res.send(inventory);
        }
    }
    //res.send(+req.params.name+" not present in Inventories");

});


//Question 2
router.put('/inventory',function(req, res)
{
    var inventory = req.body;
    inventories = inventory;
    res.send(inventories);

});

router.put('/inventory/:name',function(req, res)
{
    var inventory_name = req.params.name;
    for (let inventory of inventories)
    {
        if(inventory.name===inventory_name)
        {
            inventory.name = req.body.name;
            inventory.quantity = req.body.quantity;
        }
    }
    
    res.send(inventories);

});

//Question 3

router.post('/inventory',function(req, res)
{
    inventories.push(req.body);
    res.send(inventories);
});

//Question 4

router.delete('/inventory/:name',function(req,res)
{
    var inventory_name = req.params.name;
    for (let inventory of inventories)
    {
        if(inventory.name===inventory_name)
        {
            indexOfItem = inventories.indexOf(inventory);
            break;
        }
    }
    inventories.splice(indexOfItem,1);
    
    res.send(inventories);
    
});


router.delete('/inventory',function(req,res)
{
    
    inventories=[];
    res.send(inventories);
});


module.exports = router;