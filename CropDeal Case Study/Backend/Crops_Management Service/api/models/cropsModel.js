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
        required: [true, 'City is required']
    },
    state:{
        type: String,
        required: [true, 'State is required']
    },
    pinCode:{
        type: Number,
        required: [true, 'PIN Code is required']
    }

});


//published crops schema

var publishedCropsSchema =  new Schema({
    publishedBy:{
        type: String,
        required: [true,'Email id of publisher is required']
    },
    farmerName:{
        type: String,
        required: [true, 'Farmer name is required']
    },
    contact:{
        type: Number,
        required: [true, 'Contact Number is required']
    },
    cropType:{
        type: String,
        required: [true,'Crop type is required']
    },
    cropName:{
        type: String,
        required: [true,'Crop name is required']
    },
    quantityAvailable:{
        type: Number,
        required: [true,'Available quantity is required']
    },
    pricePerKg:{
        type: Number,
        required: [true, 'Price per kg of crop is required']
    },
    publishedDate:{
        type: Date,
        default: Date.now
    },
    soldOut:{
        type: Boolean,
        default: false
    },
    isPublished:{
        type: Boolean,
        default:true
    },
    cropLocation:{
        type:addressSchema,
        default: {}
    }
})


//purchased crops schema

var purchasedCropsSchema =  new Schema({
    farmerEmail:{
        type: String,
        required: [true,'Email id of publisher is required']
    },
    dealerEmail:{
        type: String,
        required: [true,'Email id of buyer is required']
    },
    dealerName:{
        type: String,
        required: [true, 'Dealer name is required']
    },
    dealerContact:{
        type: Number,
        required: [true, 'Dealer contact no is required']
    },
    quantityPurchased:{
        type: Number,
        required: [true,'Purchased quantity is required']
    },
    pricePerKg:{
        type: Number,
        required: [true, 'Price per kg of crop is required']
    },
    totalPrice:{
        type: Number,
        required: [true, 'Total price is required']
    },
    purchasedDate:{
        type: Date,
        default: Date.now
    },
    purchaseMethod:{
        type: String,
        required: [true, 'Purchase method is required']
    },
    publishedCropId:{
        type:Schema.Types.ObjectId,
        required: [true, 'Id of published crop is required']
    },
    cropLocation:{
        type:addressSchema,
        default: {}
    },
    cropType:{
        type: String,
        required: [true,'Crop type is required']
    },
    cropName:{
        type: String,
        required: [true,'Crop name is required']
    },
    farmerContact:{
        type:Number,
        required: [true, 'Farmer Contact is required']
    }
})


exports.publishedCropsModel = mongoose.model('publishedCrop', publishedCropsSchema);

exports.purchasedCropsModel = mongoose.model('purchasedCrop', purchasedCropsSchema);