const User = require('../models/User');

const getAll = (req, res) => {
    User.find()
        .exec()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
};

const create = (req, res) => {
    User.create(req.body)
        .then(createdUser => res.json(createdUser))
        .catch(err => res.status(500).json(err))
};

const update = (req, res) => {
    User.findOneAndUpdate ({ id: req.params.id}, req.body)
        .exec()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
};

const remove = (req, res) => {
    User.deleteOne ({ id: req.params.id})
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


