let TODO = []

const user = require('../Models/user')

const createTodo = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(404).json({
            message: "Title or description Null"
        })
    }
    try {
        const getUser = await user.findOne({ username: req.user.username })
        if (!getUser) {
            res.status(404).json({
                message: "No User"
            })
        }
        getUser.todo.push({ id: Date.now(), title, description })
        await getUser.save();

        res.json({
            todo: getUser.todo
        })

    } catch (error) {
        console.log(error);
    }
}

const getTodos = async (req, res) => {
    const getUser = await user.findOne({ username: req.user.username })

    if (!getUser) {
        res.status(404).json({
            message: "No User"
        })
    }
    const todos = getUser.todo
    res.json({
        todo: todos
    });
}

const deleteTodo = async (req, res) => {
    const id = parseInt(req.params.id);
    const getUser = await user.findOne({ username: req.user.username })
    if (!getUser) {
        return res.status(404).json({
            message: "No User"
        })
    }
    try {
        const todos = getUser.todo;
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                index = i;
                break;
            }
        }
        getUser.todo.splice(index, 1)
        getUser.save();
        res.json({
            TODO: todos
        })
    }
    catch (error) {
        console.log(error);
    }
}


const updateTodo = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const getUser = await user.findOne({ username: req.user.username })
    if (!getUser) {
        return res.status(404).json({
            message: "No User"
        })
    }
    try {
        const todos = getUser.todo;
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                index = i;
                break;
            }
        }
        getUser.todo[index].title = title ? title : getUser.todo[index].title;
        getUser.todo[index].description = description ? description : getUser.todo[index].description;
        getUser.save();
        res.json({
            TODO: todos
        })
    }
    catch (error) {
        console.log(error);
    }
}

const isAuthenticated = async (req, res) => {
    let username = req.user.username;
    let password = req.user.password;

    const getUser = await user.findOne({ username: username, password: password })
    if (getUser) {
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

const getNumberOfTodos = async (req, res) => {
    const getUser = await user.findOne({ username: req.user.username, password: req.user.password })
    if (getUser) {
        res.json({
            count: getUser.todo.length
        });
    }
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    isAuthenticated,
    getNumberOfTodos
}