const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

const secretkey = process.env.secretkey

const TODO = [];
const USERS = [];

const createToken = (data) => {
    return jwt.sign({ username: data.username, password: data.password }, secretkey, { expiresIn: 86400 });
}

function authentication(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).send();
    }

    const token = auth.split(' ')[1]
    jwt.verify(token, secretkey, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Authentication failed"
            })
        }
        req.user = user;
        next();
    })
}

app.post('/signup', (req, res) => {
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
})

app.post('/login', authentication, (req, res) => {
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
})

app.post('/todo/create', authentication, (req, res) => {
    const data = req.body;
    data.id = Date.now();
    TODO.push(data);
    res.json({
        message: 'Added Todo'
    })
})

app.get('/todo/getTodos', authentication, (req, res) => {
    res.json({
        todo: TODO
    });
});

app.delete('/todo/delete/:id', authentication, (req, res) => {
    const id = parseInt(req.params.id);
    let index = TODO.findIndex(x => x.id === id)

    if (index === -1) {
        res.status(404).json({
            message: "TODO not found",
            id: id
        });
    }
    else {
        TODO.splice(index, 1);
        res.status(200).send({
            TODO: TODO
        });
    }
})

app.put('/todo/update/:id', authentication, (req, res) => {
    const id = parseInt(req.params.id);
    let index = TODO.findIndex(x => x.id === id)

    if (index === -1) {
        res.status(404).json({
            message: "TODO not found",
            id: id
        });
    }
    else {
        TODO[index].title = req.body.title;
        TODO[index].description = req.body.description;
        res.status(200).send({
            TODO: TODO
        });
    }
})

app.get('/isAuthenticated', authentication, (req, res) => {

    let username = req.user.username;
    let password = req.user.password;

    let isUser = false;

    USERS.forEach(element => {
        if (element.username === username && element.password === password) {
            isUser = true;
        }
    })
    if (isUser) {
        res.json({
            message: true,
            user: req.user.username
        })
    }
    else {
        res.status(403).json({
            message: false
        });
    }
})

app.get('/todo/getNumberOfTodos',authentication, (req, res) => {
    res.json({
        count: TODO.length
    });
})

app.listen(3000, () => { console.log("listing on port 3000") });