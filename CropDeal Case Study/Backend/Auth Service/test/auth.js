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
     * Test the POST user data in db route
     */
    describe("POST /register", () => {
        it("It should POST users data in db", (done) => {
            const user = {
                email: "jerry@gmail.com",
                password: "12345",
                userType: "farmer"
            }
            chai.request(server)                
                .post("/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.have.property('userType').eq("farmer");
                    response.body.message.should.have.property('email').eq("jerry@gmail.com");
                done();
                });
        });

        it("It should not POST users data in db with duplicate email id", (done) => {
            const user = {
                email: "jerry@gmail.com",
                password: "12345",
                userType: "farmer"
            }
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('success').eq(false);
                    response.body.should.have.property('message').eq("email id already present...try with different email");
                done();
                });
        });

    });

    /**
     * Test the DELETE user profile (by id) route
     */
    describe("DELETE /user/:id", () => {
        it("It should delete user from db", (done) => {
            const id = "jerry@gmail.com"
            chai.request(server)                
                .delete("/user/" + id)
                .set('Authorization', 'Bearer ' + adminToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                done();
                });
        });

        it("It should not delete user from db with unregistered email id", (done) => {
            const id = "jerry@gmail.com"
            chai.request(server)                
                .delete("/user/" + id)
                .set('Authorization', 'Bearer ' + adminToken)
                .end((err, response) => {
                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.have.property('deletedCount').eq(0);
                done();
                });
        });

        it("It should not delete user from db without admin token", (done) => {
            const id = "jerry@gmail.com"
            chai.request(server)                
                .delete("/user/" + id)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(false);
                    response.body.should.have.property('message').eq("user is not admin");
                done();
                });
        });

    });

    /**
     * Test the POST route to get access token 
     */
    describe("POST /login", () => {
        it("It should login user and generate token", (done) => {
            const user = {
                email: "sam@gmail.com",
                password: "1234"
            }
            chai.request(server)                
                .post("/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('accessToken');
                    response.body.userData.should.have.property('userType').eq("dealer");
                    response.body.userData.should.have.property('email').eq("sam@gmail.com");
                done();
                });
        });

        it("It should not login user with incorrect password", (done) => {
            const user = {
                email: "sam@gmail.com",
                password: "12345"
            }
            chai.request(server)                
                .post("/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(false);
                    response.body.should.not.have.property('accessToken');
                    response.body.should.have.property('message').eq("password incorrect");
                done();
                });
        });

        
    });

    /**
     * Test the GET user authorize route
     */
    describe("GET /authorize", () => {
        it("It should GET user authorized", (done) => {
            chai.request(server)                
                .get("/authorize")
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.have.property('userType').eq("farmer");
                done();
                });
        });

        it("It should NOT GET get user authorized without token", (done) => {
            chai.request(server)                
                .get("/authorize")
                .end((err, response) => {
                    response.should.have.status(401);
                done();
                });
        });

        it("It should NOT GET get user authorized with altered token", (done) => {
            chai.request(server)                
                .get("/authorize")
                .set('Authorization', 'Bearer ' + farmerToken+"e")
                .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });

    });

    /**
     * Test the GET user emails route
     */
    describe("GET /usersEmail", () => {
        it("It should GET user emails list", (done) => {
            chai.request(server)                
                .get("/usersEmail")
                .end((err, response) => {
                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.be.a('array');
                    response.body.message[0].should.have.property('email');
                done();
                });
        });

    });


});