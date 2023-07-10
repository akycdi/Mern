import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card ,Typography } from "@mui/material";


function Todo(params) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function createTODO() {
        console.log(title, description);
        fetch("http://localhost:3000/todo/create", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                'Content-Type': 'application/json',
                "username": "Arun",
                "Authorization": "Bearer " + token,
            }
        }).then(todosCallback)
    }

    return (
        <div>
            <Typography  sx={{ fontSize: 50 }} color="text.secondary" >Todo</Typography>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Card style={{
                    width: 400,
                    height: 200,
                    padding: 10,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid black",
                }}>
                    <form>
                        <TextField id={title} label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
                        <TextField id={description} label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
                        <br></br><br></br>
                        <Button variant="contained" onClick={createTODO}>Submit</Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}

function todosCallback(response) {
    response.json().then((data) => {
        console.log(data);
    })
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFydW4iLCJpYXQiOjE2ODg5MzM1NTEsImV4cCI6MTY4OTAxOTk1MX0.t0SZIMwsAFh5OoPA_WmLlyT3Dhi9BLbRHu8d5p-XmdE"

function login() {
    fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
            title: "Hello Title",
            description: "Hello Description"
        }),
        headers: {
            "username": "Arun",
            "Authorization": "Bearer " + token,
        }
    }).then(todosCallback)
}

export default Todo;