import { useEffect } from "react";

function DisplayTodo(props) {

    const todos = useEffect(() => {
        getTodos()
    })

    function getTodosCallBack(res) {
        res.json().then(data => {
            console.log(data);
        })
    }

    function getTodos() {
        fetch('http://localhost:3000/todo/getTodos', {
            method: "GET",
            headers: {
                "username": localStorage.getItem("user"),
                "content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(getTodosCallBack)
    }

    return (<div>
        <h1> Hello </h1>
    </div>)
}
export default DisplayTodo;