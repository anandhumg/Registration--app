const mongoose = require('mongoose');

const stockSchema =new mongoose.Schema(
    {
        stockName : String,
        stockPrice : String,
        stockPercentage : Number,
        purchaseDate: Date,
        selectedIds : Array
    }
);

const stockModel = mongoose.model('stocks',stockSchema);

module.exports = stockModel;