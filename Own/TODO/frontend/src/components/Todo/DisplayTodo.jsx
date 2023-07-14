import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleTODO from "./SingleTODO";

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
            })
            .catch((error) => {
                console.log("Error fetching Todos:", error);
            });
    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>You have {counter} Todos</Typography>
            </div>
            <SingleTODO data={data} counter={counter} setData={setData} setCounter={setCounter} />
        </div>
    );
}

export default DisplayTodo;
