const ReceptBook = require('../models/ReceptBook');

const getAll = (req, res) => {
    ReceptBook.find()
        .exec()
        .then(receptbook => res.json(receptbook))
        .catch(err => res.status(500).json(err))
};

const create = (req, res) => {
    ReceptBook.create(req.body)
        .then(createdReceptBook => res.json(createdReceptBook))
        .catch(err => res.status(500).json(err))
};

const update = (req, res) => {
    ReceptBook.findOneAndUpdate ({ id: req.params.id}, req.body)
        .exec()
        .then(receptBook => res.json(receptBook))
        .catch(err => res.status(500).json(err))
};

const remove = (req, res) => {
    ReceptBook.deleteOne ({ id: req.params.id})
        .exec()
        .then(() => res.json({success: true}))
        .catch(err => res.status(500).json(err))
};

module.exports = {
    getAll,
    create,
    update,
    remove
};


