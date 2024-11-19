const bcrypt = require('bcrypt');
const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = await new User({
            username: username,
            email: email,
            password: hashed,
        });
        const Savenew = await user.save();
        return res.status(200).json(Savenew);
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports = { register };
