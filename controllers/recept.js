const Recept = require('../models/Recept');

const getAll = (req, res) => {
    Recept.find()
        .exec()
        .then(recept => res.json(recept))
        .catch(err => res.status(500).json(err))
};

const create = (req, res) => {
    Recept.create(req.body)
        .then(createdRecept => res.json(createdRecept))
        .catch(err => res.status(500).json(err))
};

const update = (req, res) => {
    Recept.findOneAndUpdate ({ id: req.params.id}, req.body)
        .exec()
        .then(recept => res.json(recept))
        .catch(err => res.status(500).json(err))
};

const remove = (req, res) => {
    Recept.deleteOne ({ id: req.params.id})
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


