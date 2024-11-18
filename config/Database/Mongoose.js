const Mongonse = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_DB;
const DB = async (req, res) => {
    try {
        await Mongonse.connect(url, {});
        console.log('Ket Noi thanh cong');
    } catch (err) {
        if (err) throw err;
    }
};
module.exports = DB;
