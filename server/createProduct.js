const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const ModelProduct = mongoose.model('Product', ProductSchema);
module.exports = ModelProduct;
