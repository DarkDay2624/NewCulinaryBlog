const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterUserSchema = new Schema({
    id: Number,
    name: String,
});

module.exports = mongoose.model('RegisterUser', RegisterUserSchema);