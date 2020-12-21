var express = require('express')
var cors = require('cors')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app = express();
app.use(cors());
port = process.env.PORT || 5000;

//swagger part
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Crops Management API",
        description: "All the operations related to purchasing and publishing of crops takes place in this micro service ",
        contact: {
          name: "VAibhav J"
        },
        servers: ["http://localhost:5000"]
      }
    },
    // ['.routes/*.js']
    apis: ['./api/routes/*.js']
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


mongoose = require('mongoose'),
userModel = require('./api/models/cropsModel'), //created model loading here
bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://username:password@cropdeal.srref.mongodb.net/CropsManagement-db?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(data=>{
    console.log("connected to database");
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes = require('./api/routes/cropsRoutes'); //importing route
app.use(routes); //register the route



module.exports = app.listen(port);

console.log('Crops Management Service RESTful API server started on: ' + port);
