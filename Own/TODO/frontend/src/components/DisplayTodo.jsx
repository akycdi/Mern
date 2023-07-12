import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

function DisplayTodo({ dataChanged, setDataChanged }) {
    const [data, setData] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        getTodos();
    }, [dataChanged]);

    useEffect(() => {
        getNumberOfTodos();
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
            setCounter(data.TODO.length);
            console.log(data.TODO.length);
        }).catch((error) => {
            console.log("Error deleting TODO:", error);
        });
    }

    function editTodo(id) {
        console.log(id);
    }

    function getNumberOfTodos() {
        fetch("http://localhost:3000/todo/getNumberOfTodos", {
            method: "GET",
            headers: {
                username: localStorage.getItem("user"),
                "content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCounter(data.count);
                // console.log(data.count);
            })
            .catch((error) => {
                console.log("Error fetching Todos:", error);
            });
    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "center",
                padding: 10,
            }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>You have {counter} Todos</Typography>
            </div>
            {data.map((todo) => (
                <div
                    style={{
                        display: "flex",
                        padding: 5,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                    key={todo.id}
                >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {todo.title}
                    </Typography>
                    <HighlightOffIcon
                        size="medium"
                        variant="contained"
                        onClick={() => deleteTODO(todo.id)}
                    >
                    </HighlightOffIcon>
                    {/* <EditIcon size="small" variant="contained" onClick={() => editTodo(todo.id)}></EditIcon> */}
                </div>
            ))}
        </div>
    );
}

export default DisplayTodo;
