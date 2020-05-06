const RegisterUser = require('../models/RegisterUser');

const getAll = (req, res) => {
    RegisterUser.find()
        .exec()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
};

const create = (req, res) => {
    RegisterUser.create(req.body)
        .then(createdUser => res.json(createdUser))
        .catch(err => res.status(500).json(err))
};

const update = (req, res) => {
    RegisterUser.findOneAndUpdate ({ id: req.params.id}, req.body)
        .exec()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
};

const remove = (req, res) => {
    RegisterUser.deleteOne ({ id: req.params.id})
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


