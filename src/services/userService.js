const Product = require('../models/Product');
const getAllUsers = async () => {
    return await Product.find();
};

module.exports = getAllUsers;
