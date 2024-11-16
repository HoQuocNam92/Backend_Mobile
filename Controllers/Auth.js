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
        const { username, password } = req.body;
        console.log('Check data backend login ', username, password);
        try {
            const Users = await User.findOne({ username });
            if (!Users) {
                return res.status(404).json('Wrong user');
            }
            const passwordCheck = await bcrypt.compare(password, Users.password);
            if (!passwordCheck) {
                return res.status(404).json('Wrong password');
            }
            if (Users && passwordCheck) {
                const token = jwt.sign({ Users: Users }, 'your_jwt_secret', {
                    expiresIn: '1h',
                });
                return res.json({ token });
            }
        } catch (err) {
            res.status(500).json('Ket noi bi loi roi !!');
        }
    },
    Cart: async (req, res) => {
        const { id, name, price, oldPrice, quantity } = req.body;
        console.log('Data nhan dc', id, name, price, oldPrice);
        try {
            const product = await new Product({
                _id: id,
                name: name,
                price: price,
                oldPrice: oldPrice,
                quantity: quantity,
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
            console.log('Check data truocs khi gui ve ', products);
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
            await Product.findByIdAndDelete(id);

            res.status(200).json('Xoa data thanh cong');
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
module.exports = Authentication;
