const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = async ({ username, password }) => {
    const KeyAcessToken = process.env.JWT_KEY_ACCESS_TOKEN;
    const KeyRefreshToken = process.env.JWT_KEY_REFERSH_TOKEN;
    try {
        const Users = await User.findOne({ username: username });
        if (!Users) {
            return 'User not found';
        }
        const passwordCheck = await bcrypt.compare(password, Users.password);
        if (!passwordCheck) {
            return 'Wrong password';
        }
        if (Users && passwordCheck) {
            const Accesstoken = jwt.sign({ Users: Users }, KeyAcessToken, {
                expiresIn: '1h',
            });
            const Refreshtoken = jwt.sign({ Users: Users }, KeyRefreshToken, {
                expiresIn: '365d',
            });

            return { Accesstoken, Refreshtoken };
        }
    } catch (err) {
        throw err;
    }
};
module.exports = login;
