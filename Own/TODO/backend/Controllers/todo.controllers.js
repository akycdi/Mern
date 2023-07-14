let TODO = []
const createTodo = (req, res) => {
    const data = req.body;
    data.id = Date.now();
    TODO.push(data);
    res.json({
        message: 'Added Todo'
    })
}

const getTodos = (req, res) => {
    res.json({
        todo: TODO
    });
}

const deleteTodo = (req, res) => {
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
}


const updateTodo = (req, res) => {
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
}

const isAuthenticated = (req, res) => {
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
}

const getNumberOfTodos = (req, res) => {
    res.json({
        count: TODO.length
    });
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    isAuthenticated,
    getNumberOfTodos
}