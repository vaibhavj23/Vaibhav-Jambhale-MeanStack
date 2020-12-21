const { response } = require('express');
const { connect } = require('mongoose');
var ObjectID = require('mongodb').ObjectID
mongoose = require('mongoose'),
axios = require('axios');
userdb = require('../models/userModel');

//to register a user in db
exports.registerUser = function (req, res) {
    //object to be sent to auth register endpoint
    authObj = {
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
    };

    //creating object with address properties
    addressObj = {
        landmark: req.body.address.landmark || "",
        area: req.body.address.area || "",
        city: req.body.address.city || "",
        state: req.body.address.state || "",
        pinCode: Number(req.body.address.pinCode) || ""
    };

    //creating object with address properties
    bankDetailsObj = {
        bankAccNo: req.body.bankDetails.bankAccNo || "",
        bankIfscCode: req.body.bankDetails.bankIfscCode || "",
        bankName: req.body.bankDetails.bankName || "",
    };

    //main user object which is added in database
    userObj = {
        userType: req.body.userType,
        firstName: req.body.firstName,
        lastName: req.body.lastName || "",
        email: req.body.email,
        phoneNumber: Number(req.body.phoneNumber) || 0,
        address: addressObj,
        bankDetails: bankDetailsObj
    };

    //first adding data to auth-db
    axios.post("http://localhost:3000/register", authObj)
        .then(function (response) {
            if (response.data.success) {
                //console.log(response.data.message);
                //res.json(response.data.message);
                if (req.body.userType == "farmer") {
                    var newUser = new userdb.farmerModel(userObj);
                }
                else {
                    var newUser = new userdb.dealerModel(userObj);
                }
                newUser.save(function (err, user) {
                    if (err) {
                        res.json({success:false,message:err});
                    }
                    res.json({ success: true, message: user });
                });

            }
            else {
                //console.log(response.data.message);
                res.json({success:false,message:response.data.message});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};


//to send user data to user
exports.viewProfile = function (req, res) {

    //In the beginning authorize the user
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //if there  in no token present or no authorization header it will send 401
    if (token == null) return res.sendStatus(401);
    axios.get("http://localhost:3000/authorize", {
        headers: {
            authorization: authHeader
        }
    })
        .then(function (response) {
            //console.log(response.data.success);
            //res.sendStatus(response.status);
            //res.send("got response");

            //if user authorized
            if (response.data.success) {
                //or email=response.data.message.email

                email = req.params.id;
                if (response.data.message.userType == "farmer") {
                    var updateModel = userdb.farmerModel;
                }
                else {
                    var updateModel = userdb.dealerModel;
                }
                updateModel.findOne({ email: email })
                    .then((user) => {
                        res.json({success:true,message:user});
                    })
                    .catch((error) => {
                        res.json({success:false,message:error});
                    })
            }

        }).catch(function (error) {
            //console.log(error);
            //console.log(error.response.status);
            res.sendStatus(error.response.status)
        })
};


//to update user data in db
exports.updateProfile = async function (req, res) {
    var email = req.params.id;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        //check whether email in token is same as email send in id parameter
        //so that one user after logging cannot modify other users details.
        if (responseObj.message.email != email) {
            res.sendStatus(403);
        }

        else {
            if (responseObj.message.userType == "farmer") {
                var updateModel = userdb.farmerModel;
            }
            else {
                var updateModel = userdb.dealerModel;
            }
            updateModel.updateOne({ email: email }, req.body)
                .then((updatedData) => {
                    res.json({success: true,message:updatedData});
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }


    }
};

//delete user on admin request
exports.deleteUser = async function (req, res) {
    var email = req.params.id;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        //check whether email in token is same as email send in id parameter
        //so that one user after logging cannot modify other users details.
        if (responseObj.message.userType != "admin") {
            res.sendStatus(403);
        }

        else {
            if (req.body.userType == "farmer") {
                var updateModel = userdb.farmerModel;
            }
            else {
                var updateModel = userdb.dealerModel;
            }
            updateModel.deleteOne({ email: email }, function (err, user) {
                if (err) {
                    res.json({success:false,message:err});
                }
                else if (user) {
                    const authHeader = req.headers['authorization'];

                    //delete the same user from auth db also.
                    axios.delete("http://localhost:3000/user/"+email,{
                        headers: {
                            authorization: authHeader
                        }
                    })
                    .then(function (response) {
                        if (response.data.success) {
                            res.json({success:true,message:"user deleted"});
                        }
                        else {
                            //console.log(response.data.message);
                            res.json({success:false,message:response.data.message});
                        }
                    })
    
                }
                else {
                    res.json({success:false,message:"User not found"});
                }
            });
        }
    }
};

//function to send farmers list on request of admin
exports.getFarmersList = async function (req, res) {
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        if (responseObj.message.userType != "admin") {
            res.sendStatus(403);
        }

        else {
            userdb.farmerModel.find({},{"firstName":1,"lastName":1,"email":1,"userType":1,"phoneNumber":1})
            .then((farmersList)=>
            {
                res.json({success:true,message:farmersList});
            })
            .catch((err)=>
            {
                res.json({success:false,message:err});
            })
        }
            
    }
    
};

//function to send dealers list on request of admin
exports.getDealersList = async function (req, res) {
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        if (responseObj.message.userType != "admin") {
            res.sendStatus(403);
        }

        else {
            userdb.dealerModel.find({},{"firstName":1,"lastName":1,"email":1,"userType":1,"phoneNumber":1})
            .then((dealerList)=>
            {
                res.json({success: true,message:dealerList});
            })
            .catch((err)=>
            {
                res.json({success:false,message:err});
            })
        }
            
    }
    
};

//rate farmer or dealer

exports.rateUser = async function (req, res) {
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //dealerEmail= req.body.dealerEmail;
        //res.json(responseObj.message);
        if (responseObj.message.userType == "admin") {
            res.sendStatus(403);
        }

        else {
            if(responseObj.message.userType=="dealer")
            {
                ratingObj={
                    dealerEmail: responseObj.message.email,
                    farmerEmail: req.body.farmerEmail,
                    rating: req.body.rating
                };
            }
            else
            {
                ratingObj={
                    dealerEmail: req.body.dealerEmail,
                    farmerEmail: responseObj.message.email,
                    rating: req.body.rating
                };
            }
            //get farmer full name and set in ratingObj
            userdb.farmerModel.aggregate([{$match:{email:ratingObj.farmerEmail}},{$project:{name:{$concat:["$firstName"," ","$lastName"]}}}])
            .then((farmerName)=>
            {
                //console.log(farmerName[0].name)
                ratingObj.farmerName=farmerName[0].name;
                 //get dealer full name and set in ratingObj
                userdb.dealerModel.aggregate([{$match:{email:ratingObj.dealerEmail}},{$project:{name:{$concat:["$firstName"," ","$lastName"]}}}])
                .then((dealerName)=>
                {
                    //console.log(dealerName[0].name)
                    ratingObj.dealerName=dealerName[0].name;

                    //console.log(ratingObj);
                    if(responseObj.message.userType == "farmer")
                    {
                        //if farmer is giving rating data will be added to dealer rating collection/table
                        ratingModel = userdb.dealerRatingModel;
                    }
                    else
                    {
                        ratingModel = userdb.ratingModel;
                    }
                    
                    //add a rating in db
                    var newRating = new ratingModel(ratingObj);
                    newRating.save(function (err, user) {
                    if (err) {
                        res.json({success:false,message:err});
                    }
                    res.json({ success: true, message: user });
                    }); 
                })
                .catch((err)=>
                {
                    //console.log(err);
                    res.json({success:false,message:err});
                });
            })
            .catch((err)=>
            {
                //console.log(err);
                res.json({success:false,message:err});
            });
        }
    }
};

//send farmer rating to admin
exports.viewFarmerRatings = async function (req, res) {
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        if (responseObj.message.userType == "farmer") {
            res.sendStatus(403);
        }

        else {
            userdb.ratingModel.find({})
            .then((farmerRatings)=>
            {
                res.json({success:true,message:farmerRatings});
            })
            .catch((err)=>
            {
                res.json({success:false,message:err});
            })
        }
    }
};


//send dealer ratings to admin
exports.viewDealerRatings = async function (req, res) {
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        if (responseObj.message.userType != "admin") {
            res.sendStatus(403);
        }

        else {
            userdb.dealerRatingModel.find({})
            .then((dealerRatings)=>
            {
                res.json({success:true,message:dealerRatings});
            })
            .catch((err)=>
            {
                res.json({success:false,message:err});
            })
        }
    }
};


//send farmer name and contact number while farmer publish crops
exports.sendFarmerContactAndName = async function (req, res) {
    //authorize user
    //farmerEmail=req.params.id;
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        if (responseObj.message.userType != "farmer") {
            res.sendStatus(403);
        }

        else {
            farmerEmail = responseObj.message.email;
            userdb.farmerModel.aggregate([{$match:{email:farmerEmail}},
                {$project:{name:{$concat:["$firstName"," ","$lastName"]},phoneNumber:1}}])
            .then((farmerObj)=>
            {
                //console.log(farmerObj[0]);
                res.json({success:true,message:farmerObj[0]})
                //res.send(farmerObj[0]);
            })
            .catch((err)=>
            {
                res.json({success:false,message:err})            
            })
        }
    }
};


//send dealer name and contact number while dealer purchase published crops
exports.sendDealerContactAndName = async function (req, res) {
    //authorize user
    //farmerEmail=req.params.id;
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        if (responseObj.message.userType != "dealer") {
            res.sendStatus(403);
        }

        else {
            dealerEmail = responseObj.message.email;
            userdb.dealerModel.aggregate([{$match:{email:dealerEmail}},
                {$project:{name:{$concat:["$firstName"," ","$lastName"]},phoneNumber:1}}])
            .then((dealerObj)=>
            {
                //console.log(farmerObj[0]);
                res.json({success:true,message:dealerObj[0]})
                //res.send(farmerObj[0]);
            })
            .catch((err)=>
            {
                res.json({success:false,message:err})            
            })
        }
    }
};



//add subscribed crops to subscribed crops array
exports.addSubscribedCrops =  async function (req, res) {
    //authorize user
    dealerEmail=req.params.dealerId;
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        //console.log(responseObj.message);
        if (responseObj.message.userType != "dealer" || responseObj.message.email != dealerEmail) {
            res.sendStatus(403);
        }

        else {
            userdb.dealerModel.findOne({email:dealerEmail},
                {"subscribedCrops":1})
                .then((subscribedCropsList)=>
                { 
                    alreadySubscribedFlag=0;
                    subscribedCropsArray=subscribedCropsList.subscribedCrops;
                    if(subscribedCropsArray.length > 0)
                    {
                        for(let item of subscribedCropsArray)
                        {
                            if(item.cropType==req.body.cropType && item.cropName==req.body.cropName)
                            {
                                alreadySubscribedFlag=1;
                            }
                        }
                    }
                    if(alreadySubscribedFlag==1)
                    {
                        res.json({success:false,message:"you have already subscribed to this crop"});
                    }
                    else
                    {
                        userdb.dealerModel.updateOne({email:dealerEmail},
                            {$push:{subscribedCrops: req.body}})
                            .then((dealerObj)=>
                            {
                                //console.log(farmerObj[0]);
                                res.json({success:true,message:dealerObj})
                                //res.send(farmerObj[0]);
                            })
                            .catch((err)=>
                            {
                                res.json({success:false,message:err})            
                            })
                    }
                })
                .catch((err)=>
                {
                    res.json({success:false,message:err})            
                })
        }
    }
};

//delete subscribed crop from subscribed crops array on request of dealer
exports.deleteSubscribedCrop =  async function (req, res) {
    //authorize user
    subscribedCropId = req.params.subscribedCropId;
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        //console.log(responseObj.message);
        if (responseObj.message.userType != "dealer") {
            res.sendStatus(403);
        }

        else {
            dealerEmail = responseObj.message.email;
            userdb.dealerModel.updateOne({email:dealerEmail},
            {$pull:{subscribedCrops:{_id:ObjectID(subscribedCropId)}}})
            .then((dealerObj)=>
            {
                //console.log(farmerObj[0]);
                res.json({success:true,message:dealerObj})
                //res.send(farmerObj[0]);
            })
            .catch((err)=>
            {
                res.json({success:false,message:err})            
            })
        }
    }
};


//send subscribed crops list on request of dealer
exports.sendSubscribedCropsList =  async function (req, res) {
    //authorize user
    dealerEmail = req.params.dealerId;
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        //res.json(responseObj.message);
        //console.log(responseObj.message);
        if (responseObj.message.userType != "dealer" || responseObj.message.email != dealerEmail) {
            res.sendStatus(403);
        }

        else {
            userdb.dealerModel.findOne({email:dealerEmail},
            {"subscribedCrops":1})
            .then((subscribedCropsList)=>
            {
                res.json({success:true,message:subscribedCropsList})
            })
            .catch((err)=>
            {
                res.json({success:false,message:err})            
            })
        }
    }
};





async function getUserAuthorized(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        //if there  in no token present or no authorization header it will send 401
        if (token == null) return res.sendStatus(401);

        const response = await axios.get("http://localhost:3000/authorize", {
            headers: {
                authorization: authHeader
            }
        });

        //console.log(response.data);
        return response.data;
    } catch (error) {
        // console.log(error);
        //responseObj={success:false,status:error.response.status};
        return res.sendStatus(error.response.status);
        // return responseObj;
    }
}