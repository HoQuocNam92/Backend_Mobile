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
    admin: {
        type: String,
        require: true,
        default: 'user',
    },
});
const ModelsData = mongoose.model('Users', DataSchema);
module.exports = ModelsData;
