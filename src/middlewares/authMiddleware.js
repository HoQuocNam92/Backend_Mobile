const jwt = require('jsonwebtoken');
require('dotenv').config;
const Middleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;

        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_KEY_ACCESS_TOKEN, (err, Users) => {
                if (err) {
                    res.status(403).json('Token not Valid', err);
                }
                req.Users = Users;
                next();
            });
        } else {
            res.status(401).json('You are not Authenticated');
        }
    },
    verifyAuthor: (req, res, next) => {
        Middleware.verifyToken(req, res, () => {
            if (req.Users.role === 'admin') {
                next();
            } else {
                res.status(403).json('You are not Authorized to access this route');
            }
        });
    },
};
module.exports = Middleware;
