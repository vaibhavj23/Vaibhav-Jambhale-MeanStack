let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var expect = chai.expect;

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Users API', () => {

    var farmerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImZhcm1lciIsImlhdCI6MTYwODQ2MjI4OCwiZXhwIjoxNjA4NDczMDg4fQ.4p5ACVL_EPjVl8nDSHC_g74CPNr-bmsF5O3iBcFkS6o";
    var dealerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImRlYWxlciIsImlhdCI6MTYwODQ2MjMxOCwiZXhwIjoxNjA4NDczMTE4fQ.glICU-LwLVngW_tw-qJKgJTU4eAy_uMATmYiPNPm0WY";
    var adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2MDg0NjIzNTIsImV4cCI6MTYwODQ3MzE1Mn0.3_04-Lu4oXEre4vAMu-Nbmt9M0ETPDBu2CPEktLdOeA";
    /**
     * Test the GET user profile (by id) route
     */
    describe("GET /user/:id", () => {
        it("It should GET a user profile deatils by ID", (done) => {
            const emailId = "tom@gmail.com";
            chai.request(server)                
                .get("/user/" + emailId)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.have.property('userType').eq("farmer");
                    response.body.message.should.have.property('email').eq("tom@gmail.com");
                done();
                });
        });

        it("It should NOT GET a user profile by ID with invalid email", (done) => {
            const emailId = "123@gmail.com";
            chai.request(server)                
                .get("/user/" + emailId)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message').eq(null);
                done();
                });
        });

        it("It should NOT GET a user profile by ID with invalid token", (done) => {
            const emailId = "123@gmail.com";
            chai.request(server)                
                .get("/user/" + emailId)
                .set('Authorization', 'Bearer ' + farmerToken+"e")
                .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });

    });

    /**
     * Test the GET system farmers route
     */
    describe("GET /farmers", () => {
        it("It should GET a list of farmers", (done) => {
            chai.request(server)                
                .get("/farmers")
                .set('Authorization', 'Bearer ' + adminToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.be.a('array');
                    response.body.message[0].should.have.property('userType').eq('farmer');
                done();
                });
        });

        it("It should NOT GET list of farmers with any token other than adminToken", (done) => {
            chai.request(server)                
                .get("/farmers")
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });

    });

    /**
     * Test the GET system dealers list route
     */
    describe("GET /farmers", () => {
        it("It should GET a list of dealers", (done) => {
            chai.request(server)                
                .get("/dealers")
                .set('Authorization', 'Bearer ' + adminToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.be.a('array');
                    response.body.message[0].should.have.property('userType').eq('dealer');
                done();
                });
        });

        it("It should NOT GET list of dealers with any token other than adminToken", (done) => {
            chai.request(server)                
                .get("/dealers")
                .set('Authorization', 'Bearer ' + dealerToken)
                .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });

    });

    /**
     * Test the GET farmers ratings given by dealers route
     */
    describe("GET /farmerRating", () => {
        it("It should GET a list of ratings given to farmers", (done) => {
            chai.request(server)                
                .get("/farmerRating")
                .set('Authorization', 'Bearer ' + adminToken)
                .end((err, response) => {
                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.be.a('array');
                    expect(response.body.message[0].rating).to.be.within(1,5);
                done();
                });
        });

    });

    /**
     * Test the GET farmer name and contact route
     */
    describe("GET /farmerNameAndContact", () => {
        it("It should GET a farmer name and contact", (done) => {
            chai.request(server)                
                .get("/farmerNameAndContact")
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.be.a('object');
                    response.body.message.should.have.property('name');
                    response.body.message.should.have.property('phoneNumber');
                done();
                });
        });

    });

    /**
     * Test the GET subscribed crops of a particular dealer 
     */
    describe("GET /dealer/subscribedCrops/:dealerId", () => {
        it("It should GET subscribed crops of a particular dealer", (done) => {
            const dealerId = "sam@gmail.com";
            chai.request(server)            
                .get("/dealer/subscribedCrops/" + dealerId)
                .set('Authorization', 'Bearer ' + dealerToken)
                .end((err, response) => {
                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.be.a('object');
                    response.body.message.should.have.property('subscribedCrops');
                    response.body.message.subscribedCrops.should.be.a('array');
                done();
                });
        });

    });


    /**
     * Test the POST route
     */
     describe("POST /register", () => {
   
        it("It should NOT POST a new user with already existing user email", (done) => {
            const user = {
                userType: "dealer",
                firstName: "jerry",
                lastName: "rj" || "",
                email: "tom@gmail.com",
                phoneNumber: 1234567890 || 0,
                address:{
                    landmark: "mark" || "",
                    area: "down" || "",
                    city: "high City" || "",
                    state: "real state" || "",
                    pinCode: 203965 || ""
                },
                bankDetails: {
                    bankAccNo: "" || "",
                    bankIfscCode: "" || "",
                    bankName: "" || "",
                }
            };
            chai.request(server)                
                .post("/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('success').eq(false);
                done();
                });
        });

        it("It should  POST a new user data", (done) => {
            const user = {
                userType: "dealer",
                firstName: "jerry",
                lastName: "rj" || "",
                email: "jerry@gmail.com",
                password: "3333",
                phoneNumber: 1234567890 || 0,
                address:{
                    landmark: "mark" || "",
                    area: "down" || "",
                    city: "high City" || "",
                    state: "real state" || "",
                    pinCode: 203965 || ""
                },
                bankDetails: {
                    bankAccNo: "" || "",
                    bankIfscCode: "" || "",
                    bankName: "" || "",
                }
            };
            chai.request(server)                
                .post("/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.have.property('userType').eq("dealer");
                done();
                });
        });

    });
    
    /**
    * Test the PUT route to add subscribed cops of dealer
    */
   describe("PUT /dealer/subscribeCrops/:dealerId", () => {
    
        it("It should not add subscribed crop with token of other dealer", (done) => {
            const crop = {
                cropType: "grain",
                cropName: "rice"
            };
            const dealerId = "jerry@gmail.com"
            chai.request(server)                
                .put("/dealer/subscribeCrops/" + dealerId)
                .send(crop)
                .set('Authorization', 'Bearer ' + dealerToken)
                    .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });

    });

    /**
    * Test the POST route to delete user
    */
     describe("POST /user/:id", () => {
    
        it("It should  delete the user", (done) => {
            const user = {
                userType: "dealer"
            };
            const id = "jerry@gmail.com"
            chai.request(server)                
                .post("/user/" + id)
                .send(user)
                .set('Authorization', 'Bearer ' + adminToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message').eq("user deleted");
                done();
                });
        });

    });


});

