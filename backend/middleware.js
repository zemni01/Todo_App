const jwt = require('jsonwebtoken');
const tokenSecret = 'x-access-token'

exports.verify = (req, res, next) => {
    const token = req.header.authorization;
    if (!token) res.status(403).json({error: 'please provide a token'})
    else {
        jwt.verify(token.split(' ')[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            req.user = value.user;
            next();
        })
    }
}