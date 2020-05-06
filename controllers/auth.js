const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const myconfig = require('../config/myconfig');
//const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res) {
    const user = await User.findOne ({email: req.body.email});
    if(user) {
        const password = bcrypt.compareSync(req.body.password, user.password);
        if(password) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, myconfig.jwt, {expiresIn: 60 * 60});
            res.status(200).json({
                token: token
            })
        } else {
            res.status(401).json ({
                message: 'Wrong password'
            })
        }
    } else {
        res.status(404).json ({
            message: "User not found"
        })
    }

};

module.exports.register = async function(req, res) {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        res.status(409).json({
            message: 'This email is used'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try{
            await user.save();
            res.status(201).json(user)
        } catch(e) {
            res.status(500).json ({
                success: false,
                message: error.message ? error.message : error
            })
        }
    }
};
