const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone:      String,
    gender:     String,
    hearAbout : String,
    city      : String,
    state : String
});

const userModel = mongoose.model('user' , userSchema);

module.exports = userModel;