const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();
connectDB();
const port = process.env.PORT;
app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
