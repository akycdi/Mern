const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
app.use(express.json())

const secretkey = 'process.env.secretkey'

const TODO = [];
const USERS = [];

const createToken = (data) => {
    return jwt.sign({ username: data.username }, secretkey, { expiresIn: 86400 });
}


function authentication(req, res, next) {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1]
        jwt.verify(token, secretkey, (err, user) => {
            if (err) {
                res.status(403).json({
                    message: "Inavalid Username or Passwrod"
                })
            }
            next();
        })
    }
    res.json({
        message: "Invalid Username or passowrd"
    }).send();
}



app.post('/signup', (req, res) => {
    let data = req.headers;
    data.id = Date.now()
    let user = USERS.find(x => x.username === data.username)
    if (user) {
        res.json({
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
})

app.post('/login', authentication, (req, res) => {
    res.json({
        message: 'Login succesfull'
    }).send()
})






app.get('/todo', (req, res) => {

});



app.listen(3000, () => { console.log("listing on port 3000") });