var express = require('express');
var bodyParser = require('body-parser');
const routes = require('./routes/routeControllers');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(routes);

app.listen(8081); 
  
