var express = require('express');
var cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app = express();
app.use(cors());
port = process.env.PORT || 3000;

//swagger part
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Auth API",
        description: "Authentication and Authorization Micro Service ",
        contact: {
          name: "VAibhav J"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis: ['./api/routes/*.js']
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  

mongoose = require('mongoose'),
userCredential = require('./api/models/authModel'), //created model loading here
bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://username:password@cropdeal.srref.mongodb.net/Auth-db?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(data=>{
    console.log("connected to database");
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes = require('./api/routes/authRoutes'); //importing route
app.use(routes); //register the route



module.exports = app.listen(port);

console.log('Auth Service RESTful API server started on: ' + port);
