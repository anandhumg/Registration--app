const mongoose = require('mongoose');

const stockSchema =new mongoose.Schema(
    {
        stockName :String,
        price : String,
        date : Date,
        percentage : String,
        personIds : Array
    }
);

const stockModel = mongoose.model('stocks',stockSchema);

module.exports = stockModel;