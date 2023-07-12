import { useEffect, useState } from "react";

function DisplayTodo({ dataChanged }) {
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
        }).then(getTodosCallBack);
    }

    return (
        <div>
            {data.map((todo) => (
                <div key={todo.id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                </div>
            ))}
        </div>
    );
}

export default DisplayTodo;
