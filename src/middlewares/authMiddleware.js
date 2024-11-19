const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Middleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(' ')[1];
            console.log(accessToken);
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
};
module.exports = Middleware;
