const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receptBookSchema = new Schema({
    id: {type: Number},
    idUser: {type: Number},
    idRecept: {type: Number}
});

module.exports = ReceptBook = mongoose.model('ReceptBook', receptBookSchema);