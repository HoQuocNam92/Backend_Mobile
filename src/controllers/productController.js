const User = require('../models/User');
const Product = require('../models/Product');
const userService = require('../services/userService');
const registerService = require('../services/RegisterService');
const loginService = require('../services/loginService');
require('dotenv').config();
const Authentication = {
    register: async (req, res) => {
        try {
            const Savenew = await registerService.register;
            return res.status(200).json(Savenew);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    login: async (req, res) => {
        try {
            const Accesstoken = await loginService.login.Accesstoken;
            const Refreshtoken = await loginService.login.Refreshtoken;
            return res.status(200).json({ Accesstoken, Refreshtoken });
        } catch (err) {
            res.status(500).json(err);
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
            const users = await userService.getAllUsers;
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
module.exports = Authentication;
