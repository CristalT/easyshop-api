const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

/** Store a new user */
exports.create = function(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(data => {
            if (data) {
                throw 'User already exists.';
            } else {
                const hash = bcrypt.hashSync(
                    req.body.password,
                    parseInt(process.env.BCRYPT_ROUNDS)
                );
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    type: req.body.type
                });
                return user.save();
            }
        })
        .then(data => {
            res.json({ message: 'User successfully created!', user: data });
        })
        .catch(err => {
            next(err);
        });
};


exports.login = function(req, res, next) {
    passport.authenticate('local', { session: false }, (error, user) => {
        if(error || !user) {
            next('Invalid credentials.')
        } else {
            const payload = {
                sub: user._id,
                exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                user: user.email
            }

            const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM});

            res.json({ token: token })
        }
    })(req, res);
}

exports.authState = function(req, res) {
    if (req.isAuthenticated) {
        res.send(true)
    } else {
        res.send(false)
    }
}