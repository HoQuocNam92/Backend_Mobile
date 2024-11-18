const express = require('express');
const routes = require('./routes/webConnect');
const cors = require('cors');
const app = express();
const templa = require('../backend/models/Templates');
const connectDB = require('./config/Database/Mongoose');
require('dotenv').config();
templa(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', routes);
connectDB();
const port = process.env.PORT;
console.log(port);
app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
