const user = require('../Models/user')
const jwt = require("jsonwebtoken");


const createToken = (data) => {
    return jwt.sign({ username: data.username, password: data.password }, process.env.secretkey, { expiresIn: 86400 });
}


const userSignup = async (req, res) => {
    let data = req.headers;
    try {
        const userFound = await user.findOne({ username: data.username })
        if (userFound) {
            res.status(403).json({
                message: "User all ready exsits"
            }).send()
            return
        }
        const userSchema = await user.create({
            username: data.username,
            password: data.password
        })
        await userSchema.save();
        res.json({
            message: 'Created username',
            id: data.id,
        })
    } catch (error) {
        console.log(error);
    }
}

const userLogin = async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(403).json({
            message: "Data Null"
        })
    }

    try {
        const isUser = await user.findOne({ username: username, password: password })
        if (!isUser) {
            return res.status(404).json({
                message: " Invalid username"
            })
        }
        const token = createToken({ username, password });
        req.user = { username, password }
        res.json({
            message: 'Login succesfull',
            user: req.user.username,
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Interal Server Error"
        })
    }
}

module.exports = {
    userSignup,
    userLogin
}