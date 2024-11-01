const jwt = require('jsonwebtoken')
const middleController = {
    verifyToken: (req, res, next) => {
        const token = req.headers["Authorization"]?.split(" ")[1];
        if (token) {
            jwt.verify(token, "your_jwt_secret", (err, Users) => {
                if (err) {
                    res.status(403).json("Token not");
                }
                req.Users = Users
                next();
            })
        }
        else {
            res.status(401).json("Chua sign in ");
        }
    }
}
module.exports = middleController;