const User = require('../models/User');

const getAllUsers = async () => {
    return await User.find();
};

module.exports = { getAllUsers };
