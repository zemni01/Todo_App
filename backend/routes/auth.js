const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const middleware = require('../middleware')
const rounds = 10;

const jwt = require('jsonwebtoken');
const tokenSecret = 'x-access-token';

router.get('/jwt-test', middleware.verify, (req, res) => {
    res.status(200).json(req.user);
})

router.get('/login', (req, res) => {
    User.findOne({ email: req.body.email})
    .then(user => {
        if (!user) res.status(404).json({error: 'no user with that email found'})
        else {
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) res.status(500).json(error)
                else if (match) res.status(200).json({token: generateToken(user)})
                else res.status(403).json({error: 'password do not match'})
            })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, rounds, (err, hash) => {
        if (err) res.status(500).json(err)
        else {
            const newUser = User({
                email: req.body.email,
                password: hash
            });
            newUser.save()
                .then(user => {
                    res.status(200).json({token: generateToken(user)})
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        };
    });
});

function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, {expiresIn: '24h'})
};

module.exports = router 