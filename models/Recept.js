const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receptSchema = new Schema({
    id: {type: Number},
    nameRecept: {type: String},
    ingredients: {type: String},
    time: {type: Number},
    cook: {type: String}
});

module.exports = Recept = mongoose.model('Recept', receptSchema);