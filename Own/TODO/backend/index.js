const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json())


const TODO = [];
const USERS = [];


function authentation(req, res, next) {
    let { username, password } = req.headers;
    USERS.forEach(element => {
        if (element.username == username && element.password == password) {
            next();
        }
    })
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
    res.json({
        message: 'Created username',
        id: data.id
    })
})

app.post('/login', authentation, (req, res) => {
    res.json({
        message: 'Login succesfull'
    }).send()
})






app.get('/todo', (req, res) => {

});



app.listen(3000, () => { console.log("listing on port 3000") });