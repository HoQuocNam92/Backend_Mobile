const Product = require('../models/Product');
const userService = require('../services/userService');
const UploadFileImg = require('../services/UploadImg');
const registerService = require('../services/RegisterService');
const loginService = require('../services/loginService');
const cloudinary = require('../config/cloudinaryConfig');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Authentication = {
    register: async (req, res) => {
        const { username, password, email } = req.body;
        console.log('Check ', username, password, email);
        try {
            const Savenew = await registerService({ username, password, email });
            return res.status(200).json(Savenew);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const { Accesstoken, Refreshtoken } = await loginService({ username, password });
            res.cookie('Refreshtoken', Refreshtoken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            });
            return res.json(Accesstoken);
        } catch (err) {
            res.status(500).json({ message: 'Dang nhap that bai' });
        }
    },
    Cart: async (req, res) => {
        const { id, name, price, oldPrice } = req.body;
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
    CartItem: async (req, res) => {
        try {
            const product = await Product.find();
            return res.status(200).json(product);
        } catch (err) {
            return res.status(500).json(err);
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
        try {
            const responve = await Product.findOneAndDelete(id);
            res.status(200).json(responve);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await Product.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Het cach roi' });
        }
    },
    uploadImage: async imagePath => {
        try {
            const result = await cloudinary.uploader.upload(imagePath);
            console.log('URL của ảnh:', result.secure_url);
            return result.secure_url; // Lấy URL để lưu vào DB
        } catch (error) {
            console.error('Lỗi upload ảnh:', error);
        }
    },
    UploadFile: async (req, res) => {
        const { title, url } = req.body;
        try {
            const uploadFile = await UploadFileImg();
            res.json(uploadFile);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    SendMail: async (req, res) => {
        const { email, address, phone, date, name } = req.body;
        var transprort = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        var mailOptions = {
            from: 'Ok',
            to: email,
            subject: 'CÔNG TY TNHH QUỐC NAM KÍNH GỮI QUÝ KHÁCH HÀNG',
            text: 'Đơn hàng của bạn đã được xác nhận',
            html: `<div>  <h1>Cảm ơn quý khách đã đặt hàng tại CÔNG TY TNHH QUỐC NAM</h1> <p>Đơn hàng của bạn đã được xác nhận với thông tin sau:</p> <ul> <li>Tên khách hàng: ${name}</li><li>Địa chỉ email: ${email}</li><li>Số điện thoại: ${phone}</li><li>Địa chỉ: ${address}</li><li>Ngày đặt hàng: ${date}</li></ul> </div>`,
        };
        await transprort.sendMail(mailOptions, function (err, info) {
            if (err) {
                return res.status(500).json({ message: err.message });
            } else {
                return res.status(200).json({ message: 'Gửi mail thành công' });
            }
        });
    },
    items: async (req, res) => {
        try {
            const product = await Product.find();
            return res.status(200).json(product);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};
module.exports = Authentication;
