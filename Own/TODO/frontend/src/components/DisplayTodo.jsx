import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function DisplayTodo({ dataChanged, setDataChanged }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTodos();
    }, [dataChanged]);

    function getTodosCallBack(res) {
        res.json().then((data) => {
            setData(data.todo);
        });
    }

    function getTodos() {
        fetch("http://localhost:3000/todo/getTodos", {
            method: "GET",
            headers: {
                username: localStorage.getItem("user"),
                "content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(getTodosCallBack)
            .catch((error) => {
                console.log("Error fetching Todos:", error);
            });
    }

    function deleteTODO(id) {
        fetch(`http://localhost:3000/todo/delete/${id}`, {
            method: "DELETE",
            headers: {
                username: localStorage.getItem("user"),
                "content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res.json()).then((data) => {
            setData(data.TODO)
        }).catch((error) => {
            console.log("Error deleting TODO:", error);
        });
    }

    return (
        <div>
            {data.map((todo) => (
                <div
                    style={{
                        display: "flex",
                        padding: 5,
                    }}
                    key={todo.id}
                >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {todo.title}
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => deleteTODO(todo.id)} // Fix: Pass a reference to deleteTODO
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default DisplayTodo;
