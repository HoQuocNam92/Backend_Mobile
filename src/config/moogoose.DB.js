const Mongonse = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_DB;

const DB = async (req, res) => {
    try {
        await Mongonse.connect(url, {});
        res.status(200).json({ message: 'Connect to MongoDB Success' });
    } catch (err) {
        if (err) throw err;
        res.status(500).json({ message: 'Failed to connect to MongoDB' });
    }
};
module.exports = DB;
