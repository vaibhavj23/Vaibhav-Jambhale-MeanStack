var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var authSchema = new Schema({
  email: {
    type: String,
    required: 'email is required'
  },
  password: {
    type: String,
    required: 'password is required'
  },
  userType: {
      type: String,
      required: 'User Type is required'
  }
});


const userCredential = mongoose.model('UserCredential', authSchema);

module.exports = userCredential;