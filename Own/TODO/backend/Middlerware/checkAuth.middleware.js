const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).send();
    }

    const token = auth.split(' ')[1]
    jwt.verify(token, process.env.secretkey, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Authentication failed"
            })
        }
        req.user = user;
        next();
    })
}