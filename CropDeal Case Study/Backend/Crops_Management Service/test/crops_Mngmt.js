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
    var publishedId = "";
    var publishedCropId = "";
    var setTransactionId = "";
    /**
     * Test the POST publish crop data in db route
     */
    describe("POST /publishCrop", () => {
        it("It should POST crop data in db", (done) => {
            const crop = {
                cropType: "grain",
                cropName: "rice",
                quantityAvailable: 500,
                pricePerKg: 50,
                cropLocation: {
                    landmark: "mark" || "",
                    area: "down" || "",
                    city: "high City" || "",
                    state: "real state" || "",
                    pinCode: 203965 || ""
                }  
            }
            chai.request(server)                
                .post("/publishCrop")
                .send(crop)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.have.property('soldOut').eq(false);
                    response.body.message.should.have.property('isPublished').eq(true);
                    publishedId = response.body.message._id;
                done();
                });
        });

        it("It should not POST crop data in db with invalid token", (done) => {
            const crop = {
                cropType: "grain",
                cropName: "rice",
                quantityAvailable: 500,
                pricePerKg: 50,
                cropLocation: {
                    landmark: "mark" || "",
                    area: "down" || "",
                    city: "high City" || "",
                    state: "real state" || "",
                    pinCode: 203965 || ""
                }  
            }
            chai.request(server)                
                .post("/publishCrop")
                .send(crop)
                .set('Authorization', 'Bearer ' + farmerToken+"e")
                .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });
    });

    /**
     * Test the PUT route ro update published crop data in db 
     */
    describe("PUT /publishCrop/:id", () => {    
        it("It should update published crop data in db", (done) => {
            const crop = {
                quantityAvailable: 550
            }
            const id = publishedId;
            chai.request(server)                
                .put("/publishCrop/"+ id)
                .send(crop)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                done();
                });
        });
    });

    /**
     * Test the DELETE published crop by published id
     */
    describe("DELETE /publishedCrop/:id", () => {    
        it("It should delete published crop data in db", (done) => {
            const id = publishedId;
            chai.request(server)                
                .delete("/publishedCrop/"+ id)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                done();
                });
        });
        it("It should not delete published crop data in db with dealer token", (done) => {
            const id = publishedId;
            chai.request(server)                
                .delete("/publishedCrop/"+ id)
                .set('Authorization', 'Bearer ' + dealerToken)
                .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });
    });

    /**
     * Test the GET all published crops by all farmers
     */
    describe("GET /publishedCrop/", () => {    
        it("It should get all published crop data from db which is not sold out", (done) => {
            chai.request(server)                
                .get("/publishedCrop/")
                .set('Authorization', 'Bearer ' + dealerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.be.a('array');
                    response.body.message[0].should.have.property('soldOut').eq(false);
                    response.body.message[0].should.have.property('isPublished').eq(true);
                done();
                });
        });
    });

    /**
     * Test the GET published crops of a farmer in db route
     */
    describe("GET /publishedCrops/inStock/:farmerId", () => {    
        it("It should get all published crop data from db which is not sold out of a particular farmer", (done) => {
            const farmerId = "tom@gmail.com";
            chai.request(server)                
                .get("/publishedCrops/inStock/" + farmerId)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.be.a('array');
                    response.body.message[0].should.have.property('soldOut').eq(false);
                    response.body.message[0].should.have.property('isPublished').eq(true);
                done();
                });
        });
    });

    /**
     * Test the GET published crops which are subscribed by dealer
    */
    describe("GET /publishedCrops/subscribed/:dealerId", () => {    
        it("It should get subscribed published crop data from db of a particular dealer", (done) => {
            const dealerId = "sam@gmail.com";
            chai.request(server)                
                .get("/publishedCrops/subscribed/" + dealerId)
                .set('Authorization', 'Bearer ' + dealerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.be.a('array');
                    response.body.message[0].should.have.property('soldOut').eq(false);
                    response.body.message[0].should.have.property('isPublished').eq(true);
                done();
                });
        });
    });


    /**
     * Test the POST publish crop data in db route
     */
    describe("POST /publishCrop", () => {
        it("It should POST crop data in db", (done) => {
            const crop = {
                cropType: "grain",
                cropName: "rice",
                quantityAvailable: 500,
                pricePerKg: 50,
                cropLocation: {
                    landmark: "mark" || "",
                    area: "down" || "",
                    city: "high City" || "",
                    state: "real state" || "",
                    pinCode: 203965 || ""
                }  
            }
            chai.request(server)                
                .post("/publishCrop")
                .send(crop)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message');
                    response.body.message.should.have.property('soldOut').eq(false);
                    response.body.message.should.have.property('isPublished').eq(true);
                    publishedCropId = response.body.message._id;
                done();
                });
        });
    });
    /**
     * Test the POST purchase crop data in db route
     */
    describe("POST /purchaseCrop/:publishedCropId", () => {    
        it("It should post puchased crop data in db", (done) => {
            const publishedId1 = publishedCropId;
            //console.log(publishedId1);
            crop = {
                quantityPurchased: 10,
                pricePerKg: 50,
                totalPrice: 500,
                purchasedMethod: "COD"
            }
            chai.request(server)                
                .post("/purchaseCrop/" + publishedId)
                .send(crop)
                .set('Authorization', 'Bearer ' + dealerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.have.property('cropType').eq("grain");
                    response.body.message.should.have.property('cropName').eq("rice");
                    setTransactionId = response.body.message._id;
                done();
                });
        });
    });

    /**
     * Test the GET purchased crops list of a dealer
    */
   describe("GET /purchasedCrops/:dealerId", () => {    
        it("It should get purchased crops list of a dealer", (done) => {
            const dealerId = "sam@gmail.com";
            chai.request(server)                
                .get("/purchasedCrops/" + dealerId)
                .set('Authorization', 'Bearer ' + dealerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.be.a('array');
                done();
                });
        });
    });

    /**
     * Test the GET purchased crops by all dealers
    */
    describe("GET /purchasedCrops", () => {    
        it("It should get purchased crops by all dealers", (done) => {
            chai.request(server)                
                .get("/purchasedCrops")
                .set('Authorization', 'Bearer ' + adminToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.be.a('array');
                done();
                });
        });
    });

    /**
     * Test the GET sold crops list of a farmer
    */
   describe("GET /soldCrops/:farmerId", () => {    
        it("It should get sold crops list of a farmer", (done) => {
            farmerId = "tom@gmail.com";
            chai.request(server)                
                .get("/soldCrops/" + farmerId)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.be.a('array');
                done();
                });
        });
    });

    /**
     * Test the GET receipt of sold/purchase crops list of a farmer/dealer
    */
    describe("GET /receipt/:transactionId", () => {    
        it("It should get receipt of sold/purchase crops list of a farmer/dealer", (done) => {
            const transactionId = setTransactionId;
            chai.request(server)                
                .get("/receipt/" + transactionId)
                .set('Authorization', 'Bearer ' + farmerToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.message.should.have.property('farmerEmail').eq("tom@gmail.com");
                done();
                });
        });
    });


});