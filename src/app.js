const express = require('express');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const routes = require('./routes/productRoutes');
const cors = require('cors');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', routes);
module.exports = app;
