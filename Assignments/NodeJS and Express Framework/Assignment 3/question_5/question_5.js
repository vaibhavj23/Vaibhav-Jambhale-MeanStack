var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Item = /** @class */ (function () {
    function Item(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
    return Item;
}());
var FakeDatabase = /** @class */ (function () {
    function FakeDatabase() {
        this.inventory = [];
        this.inventory.push(new Item("Apples", 3));
        this.inventory.push(new Item("Oranges", 7));
        this.inventory.push(new Item("Banana", 55));
    }
    FakeDatabase.prototype.getItem = function (itemName) {
        var e_1, _a;
        var found = false;
        var temp;
        try {
            for (var _b = __values(this.inventory), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item.name == itemName) {
                    found = true;
                    temp = item;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (found) {
            return temp;
        }
        else {
            return undefined;
        }
    };
    FakeDatabase.prototype.getInventory = function () {
        return this.inventory;
    };
    return FakeDatabase;
}());
//Initializing Fake Database
var fd = new FakeDatabase();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var json = require('body-parser').json;
app.use(bodyParser.json());
app.get("/inventory", function (req, res) {
    res.json(fd.getInventory());
});
app.get("/inventory/:id", function (req, res) {
    var id = req.params.id;
    var found = false;
    var temp = fd.getItem(id);
    if (temp == undefined) {
        res.send("Cannot find the Item");
    }
    else {
        res.json(temp);
    }
});
app.post("/inventory", function (req, res) {
    var item = req.body;
    fd.inventory.push(item);
    res.send("Added Successfully: " + item);
});
app.delete("/inventory/:id", function (req, res) {
    var found = false;
    for (var i = 0; i < fd.inventory.length; i++) {
        if (fd.inventory[i].name == req.params.id) {
            found = true;
            fd.inventory.splice(i, i + 1);
        }
    }
    if (found) {
        res.send("Item removed successfully");
    }
    else {
        res.send("Cannot find the specified item name");
    }
});
app.delete("/inventory", function (req, res) {
    fd.inventory = [];
    res.send("Deleted the Inventory");
});
app.put("/inventory/:id", function (req, res) {
    var found = false;
    for (var i = 0; i < fd.inventory.length; i++) {
        if (fd.inventory[i].name == req.params.id) {
            found = true;
            fd.inventory[i] = req.body;
            break;
        }
    }
    if (found) {
        res.send("Item modified successfully");
    }
    else {
        res.send("Cannot find the specified Item Name");
    }
});
app.put("/inventory", function (req, res) {
    fd.inventory = req.body;
    res.send("Updated entire Inventory");
});
app.listen(3000, function () {
    console.log("Listening from port 3000");
});
//# sourceMappingURL=question_5.js.map