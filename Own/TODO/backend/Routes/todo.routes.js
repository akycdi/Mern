const express = require('express');
const router = express.Router()

const todoController = require('../Controllers/todo.controllers');
const auth = require('../Middleware/checkAuth.middleware')

router.post("/create", auth, todoController.createTodo)
router.get("/getTodos", auth, todoController.getTodos)
router.delete("/delete/:id", auth, todoController.deleteTodo)
router.put("/update/:id", auth, todoController.updateTodo)
router.get("/isAuthenticated", auth, todoController.isAuthenticated)
router.get("/getNumberOfTodos", auth, todoController.getNumberOfTodos)




module.exports = router;