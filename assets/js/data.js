const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    phoneNumber: String,
    code: Number,
})

const User = mongoose.model('User', userData);



module.exports = { User: User };
