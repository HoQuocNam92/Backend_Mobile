const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    img: {
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
});
const ModelProduct = mongoose.model('Product', ProductSchema);
module.exports = ModelProduct;
