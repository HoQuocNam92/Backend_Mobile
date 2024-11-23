const User = require('../models/User');
const bcrypt = require('bcrypt');
const register = async ({ username, password, email }) => {
    console.log('Thông tin nhận được từ controller:', { username, password, email });
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = await new User({
            username: username,
            email: email,
            password: hashed,
        });
        const Savenew = await user.save();
        return Savenew;
    } catch (err) {
        throw new Error('Đã xảy ra lỗi khi đăng ký: ' + err.message);
    }
};
module.exports = register;
