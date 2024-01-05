const mongoose = require('mongoose');

const personSchema =new mongoose.Schema(
    {
        username : String,
        email    : String,
        phone    : String
    }
);

const personModel = mongoose.model('persons',personSchema);

module.exports = personModel;