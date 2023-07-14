const USERS = [];
const jwt = require("jsonwebtoken");

const createToken = (data) => {
    return jwt.sign({ username: data.username, password: data.password }, process.env.secretkey, { expiresIn: 86400 });
}
const userSignup = (req, res) => {
    let data = req.headers;
    data.id = Date.now()
    let user = USERS.find(x => x.username === data.username)
    if (user) {
        res.status(403).json({
            message: "User all ready exsits"
        }).send()
        return
    }
    USERS.push(data);
    const token = createToken(data);
    res.json({
        message: 'Created username',
        id: data.id,
        token: token
    })
}

const userLogin = (req, res) => {
    let username = req.headers.username;
    let password = req.headers.password
    if (username === req.user.username && password == req.user.password) {
        res.json({
            message: 'Login succesfull',
            user: req.user.username
        }).send()
    }
    else {
        res.status(403).json({
            message: " Invalid username"
        })
    }
}

module.exports = {
    userSignup,
    userLogin
}