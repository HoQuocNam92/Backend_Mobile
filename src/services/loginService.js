require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = async (req, res) => {
    const KeyAcessToken = process.env.JWT_KEY_ACCESS_TOKEN;
    const { username, password } = req.body;
    console.log('Check Login ', username, password);
    try {
        const Users = await User.findOne({ username: username });
        if (!Users) {
            res.status(404).json('Wrong user');
        }
        const passwordCheck = await bcrypt.compare(password, Users.password);
        if (!passwordCheck) {
            return res.status(404).json('Wrong password');
        }
        if (Users && passwordCheck) {
            const Accesstoken = jwt.sign({ Users: Users }, KeyAcessToken, {
                expiresIn: '1h',
            });
            const Refreshtoken = jwt.sign({ Users: Users }, KeyAcessToken, {
                expiresIn: '365d',
            });
            return res.status(200).json({ Accesstoken, Refreshtoken });
        }
    } catch (err) {
        res.status(500).json('Ket noi bi loi s roi !!');
    }
};
module.exports = { login };
