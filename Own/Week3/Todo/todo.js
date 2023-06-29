const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var path = require('path');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'views')));



let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id);
    todos.forEach(element => {
        if (element.id === id) {
            console.log(element);
            res.json(element);
        }
    });
    res.status(404).send();
});

app.post("/todos", (req, res) => {
    let data = req.body;
    data.id = Math.floor(Math.random() * 1000000);
    console.log(data);
    todos.push(data);
    res.status(201).json(data);
});

app.put("/todos/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let data = req.body;
    todos.forEach(element => {
        if (id === element.id) {
            element.title = data.title;
            element.description = data.description;
            res.json(element);
        }
    });
    res.status(404);
});

app.delete("/todos/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let index = todos.findIndex(x => x.id === id);

    if (index === -1) {
        res.status(404).send();
    }
    else {
        todos.splice(index, 1);
        res.status(200).send(todos);
    }
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'views/index.html'));
});

// res.render('index');
app.listen(3000, started);

function started() {
    console.log('Port opened on 3000');
}
