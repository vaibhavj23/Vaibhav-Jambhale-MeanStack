var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Address Schema
var addressSchema = new Schema({
    landmark:{
        type: String
    },
    area:{
        type:String,
        required:[true, 'Area/Village is required']
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    pinCode:{
        type: Number,
    }

});


//Bank Details Schema
var bankSchema = new Schema({
    bankAccNo:{
        type: String,
    },
    bankIfscCode:{
        type:String,
    },
    bankName:{
        type: String,
    }

});


//User Details Schema
var farmerSchema = new Schema({
  userType: {
    type: String,
    required: [true,'User Type is required']
  },
  firstName: {
    type: String,
    required: [true,'First Name is required']
  },
  lastName: {
      type: String,
  },
  email:{
      type: String,
      required: [true,'Email id is required']
  },
  phoneNumber: {
    type: Number,
  },
  address:{
      type:addressSchema,
      default: {}
  },
  bankDetails: {
      type: bankSchema,
      default: {}
  }
  
});

//dealer Schema
var dealerSchema = new Schema({
    userType: {
      type: String,
      required: [true,'User Type is required']
    },
    firstName: {
      type: String,
      required: [true,'First Name is required']
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: [true,'Email id is required']
    },
    phoneNumber: {
      type: Number,
      required: [true,'Phone number is required']
    },
    address:{
        type:addressSchema,
        default: {}
    },
    subscribedCrops:{
        type:[{
            cropType:{
                type: String,
                required: [true, 'Crop Type is required']
            },
            cropName:{
                type: String,
                required: [true, 'Crop Name is required']
            }
        }],
        default:[]
    },
    bankDetails: {
        type: bankSchema,
        default: {}
    }
    
});
  
//farmer rating schema
var ratingSchema = new Schema({
    dealerEmail:{
        type: String,
        required:[true, 'Dealer email id is required'] 
    },
    dealerName:{
        type:String,
        required:[true, 'Dealer name is required']
    },
    farmerEmail:{
        type: String,
        required:[true, 'Farmer email id is required']
    },
    farmerName:{
        type: String,
        required:[true, 'Dealer name is required']
    },
    rating:{
        type: Number,
        required:[true, 'Rating is required'],
        min: 1,
        max: 5
    }
    

});



exports.farmerModel = mongoose.model('farmerDetail', farmerSchema);

exports.dealerModel = mongoose.model('dealerDetail', dealerSchema);

exports.ratingModel = mongoose.model('farmerRating', ratingSchema);

exports.dealerRatingModel = mongoose.model('dealerRating', ratingSchema);


