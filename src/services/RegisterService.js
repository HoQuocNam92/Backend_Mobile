const User = require('../models/User');
const bcrypt = require('bcrypt');
const register = async ({ username, password, email }) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const userName = await User.findOne({ username: username });
        const Email = await User.findOne({ email: email });

        const user = await new User({
            username: username,
            email: email,
            password: hashed,
        });
        const Savenew = await user.save();
        return Savenew;
    } catch (err) {
        console.error(err);
    }
};
module.exports = register;
