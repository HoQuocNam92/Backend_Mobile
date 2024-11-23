const Product = require('../models/Product');
const userService = require('../services/userService');
const registerService = require('../services/RegisterService');
const loginService = require('../services/loginService');
require('dotenv').config();
const Authentication = {
    register: async (req, res) => {
        const { username, password, email } = req.body;
        console.log('Check ', username, password, email);
        try {
            const Savenew = await registerService({ username, password, email });
            return res.status(200).json(Savenew);
        } catch (err) {
            res.status(500).json({ message: 'Dang ky that bai' });
        }
    },
    ResetToken: async (req, res) => {},
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const { Accesstoken, Refreshtoken } = await loginService({ username, password });
            res.cookie('Refreshtoken', Refreshtoken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            });
            return res.status(200).json(Accesstoken);
        } catch (err) {
            res.status(500).json({ message: 'Dang nhap that bai' });
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
    getUsers: async (req, res) => {
        try {
            const users = await userService();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Het cach roi' });
        }
    },
};
module.exports = Authentication;
