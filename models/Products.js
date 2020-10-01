const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: String,
    description: String,
    imageUrl: String
});

module.exports = mongoose.model('Product', productSchema)