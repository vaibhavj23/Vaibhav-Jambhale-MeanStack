require('dotenv').config();
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

mongoose = require('mongoose'),
    axios = require('axios');
var ObjectID = require('mongodb').ObjectID
cropsDb = require('../models/cropsModel');


//function to publish crops
exports.publishCrop = async function (req, res) {

    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "farmer") {
            res.sendStatus(403);
        }
        else {
            cropObj = {
                //publishedBy email is taken from token
                publishedBy: responseObj.message.email,
                cropType: req.body.cropType,
                cropName: req.body.cropName,
                quantityAvailable: Number(req.body.quantityAvailable),
                pricePerKg: Number(req.body.pricePerKg),
                publishedDate: Date.now(),
                cropLocation: req.body.cropLocation,
            };

            const authHeader = req.headers['authorization'];

            //get farmer name and contact from users db .
            axios.get("http://localhost:4000/farmerNameAndContact", {
                headers: {
                    authorization: authHeader
                }
            })
                .then(function (response) {
                    //console.log(response.data);
                    if (response.data.success) {
                        farmerName = response.data.message.name;
                        contact = response.data.message.phoneNumber;

                        cropObj.farmerName = farmerName;
                        cropObj.contact = contact;

                        var publishNewCrop = new cropsDb.publishedCropsModel(cropObj);
                        publishNewCrop.save()
                            .then((publishedCrop) => {
                                //console.log(publishedCrop);
                                res.json({ success: true, message: publishedCrop });
                            })
                            .catch((err) => {
                                res.send(500, { error: err });
                            })
                    }
                    else {
                        res.json({ success: false, message: response.data });
                    }
                })
                .catch((err) => {
                    res.json({ success: false, message: err });
                })
        }

    }
}

//function to update published crops
exports.updatePublishedCrop = async function (req, res) {
    var publishedId = req.params.id;

    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "farmer") {
            res.sendStatus(403);
        }
        else {
            cropsDb.publishedCropsModel.updateOne(
                {
                    _id: ObjectID(publishedId),
                    publishedBy: responseObj.message.email
                },
                req.body
            )
                .then((UpdatedpublishedCrop) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: UpdatedpublishedCrop });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}


//function to delete published crop on request of farmer
exports.deletePublishedCrop = async function (req, res) {
    var publishedId = req.params.id;

    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "farmer") {
            res.sendStatus(403);
        }
        else {
            cropsDb.publishedCropsModel.updateOne(
                {
                    _id: ObjectID(publishedId),
                    publishedBy: responseObj.message.email
                },
                {
                    isPublished: false
                }
            )
                .then((deletedpublishedCrop) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: deletedpublishedCrop });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}

//send published crops to dealers which are not sold out.
exports.sendPublishedCrops = async function (req, res) {

    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "dealer") {
            res.sendStatus(403);
        }
        else {
            cropsDb.publishedCropsModel.find(
                {
                    soldOut: false,
                    isPublished: true
                },
            )
                .then((publishedCrops) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: publishedCrops });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}


//send all published crops to admin 
exports.sendAllPublishedCrops = async function (req, res) {

    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "admin") {
            res.sendStatus(403);
        }
        else {
            cropsDb.publishedCropsModel.find({})
                .then((allPublishedCrops) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: allPublishedCrops });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}


//send all purchased crops to admin 
exports.getAllPurchasedCropsList = async function (req, res) {

    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "admin") {
            res.sendStatus(403);
        }
        else {
            cropsDb.purchasedCropsModel.find({})
                .then((allPurchasedCrops) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: allPurchasedCrops });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}

//send published crops only which are subscribed by particular dealer
exports.getPublishedCropsSubscribedByDealerId = async function (req, res) {
    dealerEmail = req.params.dealerId;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "dealer" && responseObj.message.email != dealerEmail) {
            res.sendStatus(403);
        }
        else {
            cropsDb.publishedCropsModel.find(
                {
                    soldOut: false,
                    isPublished: true
                },
            )
                .then((publishedCrops) => {
                    //console.log(publishedCrops);

                    //get subscribed crops of this dealer
                    const authHeader = req.headers['authorization'];

                    //delete the same user from auth db also.
                    axios.get("http://localhost:4000/dealer/subscribedCrops/" + dealerEmail, {
                        headers: {
                            authorization: authHeader
                        }
                    })
                        .then(function (response) {
                            if (response.data.success) {
                                subscribedCropsArray = response.data.message.subscribedCrops;
                                //console.log(subscribedCropsArray);
                                resultArray = [];
                                for (let subscribedItem of subscribedCropsArray) {
                                    for (let publishedItem of publishedCrops) {
                                        if (subscribedItem.cropType == publishedItem.cropType && subscribedItem.cropName == publishedItem.cropName) {
                                            resultArray.push(publishedItem);
                                        }
                                    }
                                }
                                res.json({ success: true, message: resultArray });
                            }
                            else {
                                //console.log(response.data.message);
                                res.json({ success: false, message: response.data.message });
                            }
                        })
                        .catch((error) => {
                            res.sendStatus(error.response.status);
                        })


                    //res.json(publishedCrops);
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}

//send published crop to farmer filter by published ID which is not sold out.
exports.getPublishedCropById = async function (req, res) {
    publishedId = req.params.id;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "farmer") {
            res.sendStatus(403);
        }
        else {
            cropsDb.publishedCropsModel.findOne(
                {
                    _id: ObjectID(publishedId),
                    publishedBy: responseObj.message.email,
                    soldOut: false,
                    isPublished: true
                },
            )
                .then((publishedCrop) => {
                    //console.log(publishedCrop);
                    res.json(publishedCrop);
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}


//send all published crops to farmer filter by farmer email id which are not sold out.
exports.getAllPublishedCropByFarmerId = async function (req, res) {
    farmerId = req.params.farmerId;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "farmer" || responseObj.message.email != farmerId) {
            res.sendStatus(403);
        }
        else {
            cropsDb.publishedCropsModel.find(
                {
                    publishedBy: farmerId,
                    soldOut: false,
                    isPublished: true
                },
            )
                .then((publishedCrops) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: publishedCrops });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}

//add purchase details of a published crop in purchasedCrop collection

exports.purchaseCrop = async function (req, res) {
    publishedCropId = req.params.publishedCropId;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "dealer") {
            res.sendStatus(403);
        }
        else {
            purchaseObj = {
                //publishedBy email is taken from token
                dealerEmail: responseObj.message.email,
                quantityPurchased: Number(req.body.quantityPurchased),
                pricePerKg: Number(req.body.pricePerKg),
                totalPrice: Number(req.body.totalPrice),
                purchaseMethod: req.body.purchasedMethod,
                publishedCropId: req.params.publishedCropId
            };

            const authHeader = req.headers['authorization'];

            //get farmer name and contact from users db .
            axios.get("http://localhost:4000/dealerNameAndContact", {
                headers: {
                    authorization: authHeader
                }
            })
                .then(function (response) {
                    //console.log(response.data);
                    if (response.data.success) {
                        dealerName = response.data.message.name;
                        contact = response.data.message.phoneNumber;

                        purchaseObj.dealerName = dealerName;
                        purchaseObj.dealerContact = contact;

                        cropsDb.publishedCropsModel.findOne({ _id: ObjectID(publishedCropId) })
                            .then((data) => {
                                //console.log(data);
                                purchaseObj.farmerEmail = data.publishedBy;
                                purchaseObj.farmerName = data.farmerName;
                                purchaseObj.cropType = data.cropType;
                                purchaseObj.cropName = data.cropName;
                                purchaseObj.cropLocation = data.cropLocation;
                                purchaseObj.farmerContact = data.contact;
                                //console.log(purchaseObj);

                                updatedQuantityAvailable = data.quantityAvailable - purchaseObj.quantityPurchased;
                                updatedSoldOut = data.soldOut;
                                updatedIsPublished = data.isPublished;
                                if (updatedQuantityAvailable <= 0) {
                                    updatedSoldOut = true;
                                    updatedIsPublished = false;
                                }

                                //update published crop quantity which is being purchased
                                updatedPublishedCropObj = {
                                    quantityAvailable: updatedQuantityAvailable,
                                    soldOut: updatedSoldOut,
                                    isPublished: updatedIsPublished
                                }

                                cropsDb.publishedCropsModel.updateOne({ _id: ObjectID(publishedCropId) },
                                    updatedPublishedCropObj
                                )
                                    .then((data) => {
                                        var purchasehNewCrop = new cropsDb.purchasedCropsModel(purchaseObj);
                                        purchasehNewCrop.save()
                                            .then((purchasedCrop) => {
                                                //console.log(publishedCrop);
                                                res.json({ success: true, message: purchasedCrop });

                                                //send mail
                                                sendMail(purchasedCrop);
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                //res.send(500, { error: err });
                                                res.status(500).send({ error: err })
                                            })
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        res.status(500).send({ error: err })
                                    })
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({ success: false, message: err })
                            })
                    }
                    else {
                        res.json({ success: false, message: response.data });
                    }
                })
                .catch((err) => {
                    res.json({ success: false, message: err });
                })
        }

    }
}

//send purchased crops list of a particular dealer
exports.getPurchasedCropsList = async function (req, res) {
    dealerEmail = req.params.dealerId;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "dealer" || responseObj.message.email != dealerEmail) {
            res.sendStatus(403);
        }
        else {
            cropsDb.purchasedCropsModel.find(
                {
                    dealerEmail: dealerEmail,
                },
                {
                    "farmerEmail": 1,
                    "cropType": 1,
                    "cropName": 1,
                    "quantityPurchased": 1,
                    "pricePerKg": 1,
                    "purchasedDate": 1,
                    "dealerContact": 1
                }
            )
                .then((purchasedCrops) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: purchasedCrops });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}

//send sold crops list of a particular farmer
exports.getSoldCropsList = async function (req, res) {
    farmerEmail = req.params.farmerId;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType != "farmer" || responseObj.message.email != farmerEmail) {
            res.sendStatus(403);
        }
        else {
            cropsDb.purchasedCropsModel.find(
                {
                    farmerEmail: farmerEmail,
                },
                {
                    "dealerEmail": 1,
                    "cropType": 1,
                    "cropName": 1,
                    "quantityPurchased": 1,
                    "pricePerKg": 1,
                    "purchasedDate": 1
                }
            )
                .then((SoldCrops) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: SoldCrops });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}


//send receipt of sold/purchased crops by farmer/dealer
exports.getReceipt = async function (req, res) {
    transactionId = req.params.transactionId;
    //authorize user
    const responseObj = await getUserAuthorized(req, res);
    if (responseObj.success) {
        if (responseObj.message.userType == "admin") {
            res.sendStatus(403);
        }
        else if (responseObj.message.userType == "farmer") {
            cropsDb.purchasedCropsModel.findOne(
                {
                    _id: transactionId,
                    farmerEmail: responseObj.message.email
                }
            )
                .then((receipt) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: receipt });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }
        else {
            cropsDb.purchasedCropsModel.findOne(
                {
                    _id: transactionId,
                    dealerEmail: responseObj.message.email
                }
            )
                .then((receipt) => {
                    //console.log(publishedCrop);
                    res.json({ success: true, message: receipt });
                })
                .catch((err) => {
                    res.send(500, { error: err });
                })
        }

    }
}




//authorize user
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


//send mail of receipt

/* function sendMail(receipt)
{
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
            pass: process.env.PASSWORD || '1234' // TODO: your gmail password
        }
    });

    // Step 2
    let mailOptions = {
        from: 'vaibhav.jambhale23@gmail.com', // TODO: email sender
        to: 'vaibhav.jambhale23@gmail.com', // TODO: email receiver
        subject: 'Nodemailer - Test',
        text: 'Wooohooo it works!!'
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        return log('Email sent!!!');
    });

} */

function sendMail(receipt)
{
    farmerEmail  =  receipt.farmerEmail;
    dealerEmail = receipt.dealerEmail;
    console.log(dealerEmail);
    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
            pass: process.env.PASSWORD || '1234' // TODO: your gmail password
        }
    });

    readHTMLFile(__dirname + '/views/receipt.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             receiptId: receipt._id,
             receiptDate: receipt.purchasedDate,
             dealerName: receipt.dealerName,
             dealerContact: receipt.dealerContact,
             dealerEmail: receipt.dealerEmail,
             farmerEmail: receipt.farmerEmail,
             farmerContact: receipt.farmerContact,
             purchasedDate: receipt.purchasedDate,
             totalPrice: receipt.totalPrice,
             purchaseMethod: receipt.purchaseMethod,
             cropType: receipt.cropType,
             cropName: receipt.cropName,
             landmark: receipt.cropLocation.landmark,
             area: receipt.cropLocation.area,
             city: receipt.cropLocation.city,
             state: receipt.cropLocation.state,
             pinCode: receipt.cropLocation.pincode,
             quantityPurchased: receipt.quantityPurchased,
             pricePerKg: receipt.pricePerKg,
             totalPrice: receipt.totalPrice
 
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'vaibhav.jambhale23@gmail.com', // TODO: email sender
            to: `${farmerEmail}, ${dealerEmail}`,
            //to: 'vaibhav.jambhale23@gmail.com', // TODO: email receiver
            subject : 'Payment Receipt from CropDeal',
            text : "This is the receipt of the crop purchased",
            html : htmlToSend
         };
         transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
            else{
                //console.log("mail sent");
            }
        });
    });
}