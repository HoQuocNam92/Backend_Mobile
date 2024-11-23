const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});
const ModelsData = mongoose.model('userProducts', DataSchema);
module.exports = ModelsData;
