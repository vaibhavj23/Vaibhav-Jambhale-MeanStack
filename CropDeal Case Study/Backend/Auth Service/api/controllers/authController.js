require('dotenv').config()
const jwt = require('jsonwebtoken')
var mongoose = require('mongoose'),
    userCredential = require('../models/authModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//function to register user
exports.registerUser = function (req, res) {
    email = req.body.email;
    //to check whether email is already present in database
    userCredential.find({ email: email }, { "_id": 1 }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user.length > 0) {
            res.json({ success: false, message: "email id already present...try with different email" })
        }
        else {
            userObj = {
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType
            };
            //console.log(userObj);
            //encrypt password
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(userObj.password, salt);
            userObj.password = hash;
            //console.log(userObj);
            //console.log("in fun"+userObj.password);

            var newUser = new userCredential(userObj);
            newUser.save(function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                }
                res.json({ success: true, message: user });
            });
        }
    });
}

//function to login user and send token
exports.loginUser = function (req, res) {
    //console.log(req.body);
    email = req.body.email;
    password = req.body.password;
    isMatch = false;
    userCredential.findOne({ email: email }, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else if (user) {
            //compare hashed password
            isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                userdataInToken = {
                    email: user.email,
                    userType: user.userType
                }
                const accessToken = generateAccessToken(userdataInToken)
                //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                //refreshTokens.push(refreshToken)
                res.json({ success: true, accessToken: accessToken, userData: userdataInToken })
                //res.json(user);
            }
            else {
                res.json({ success: false, message: "password incorrect" })
            }
        }
        else {
            res.json({ success: false, message: "email not present" })
        }
    });
}


//function to delete user on request of admin
exports.deleteUser = function (req, res) {
    //here req.user comes from authentication function
    if (req.user.userType == "admin") {
        email = req.params.id;
        userCredential.deleteOne({ email: email }, function (err, user) {
            if (err) {
                res.json({ success: false, message: err })
            }
            else if (user) {
                res.json({ success: true, message: user })
            }
            else {
                res.json({ success: false, message: "user not found" })
            }
        });
    }
    else {
        res.json({success: false,message:"user is not admin"});
    }
}

//function to send all users emails id for validation of duplicate email
exports.getUsersEmail = function (req, res) {

    userCredential.find({},{"email":1})
    .then((emails)=>
    {
        //console.log(emails);
        res.json({success:true, message:emails});
    })
    .catch((err)=>
    {
        res.json({success: false, message:err});
    })
}



//function to authorize user from different micro service
exports.authorizeUser = function (req, res) {
    //console.log("authorized");
    res.json({ success: true, message: req.user })
}

//function to authenticate token
exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //if there  in no token present or no authorization header it will send 401
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userdataInToken) => {
        //console.log(err)
        if (err) return res.sendStatus(403);
        req.user = userdataInToken;
        next()
    })
}


//function to generate token
function generateAccessToken(userObj) {
    return jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' })
}
