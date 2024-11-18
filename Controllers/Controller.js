const User = require('../server/createUser');
const Product = require('../server/createProduct');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const Authentication = {
    register: async (req, res) => {
        const { username, password, email } = req.body;

        console.log('Check Backend ', username, password, email);
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
    },
    login: async (req, res) => {
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
    },
    Cart: async (req, res) => {
        const { id, name, price, oldPrice } = req.body;
        console.log('Data nhan dc', id, name, price, oldPrice);
        try {
            const product = await new Product({
                id: id,
                name: name,
                price: price,
                oldPrice: oldPrice,
            });
            const SaveProduct = await product.save();
            res.status(200).json(SaveProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ProductCart: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    loginDelete: async (req, res) => {
        try {
            const User = await user.findById(req.params.id);
            res.status(200).json('Delet thanh cong');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeCart: async (req, res) => {
        const id = req.params.id;
        console.log('Check ID backend', id);
        console.log(typeof id);
        try {
            await Product.findOneAndDelete(id);

            res.status(200).json('Xoa data thanh cong');
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
module.exports = Authentication;
