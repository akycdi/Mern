import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, Typography, CardContent } from "@mui/material";


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
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(todosCallback)

        setTitle(" ");
        setDescription(" ");

    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 30,
            }}>
                <Card sx={{ minWidth: 500, minheigth: 500 }} style={{
                    width: 400,
                    height: 200,
                    padding: 10,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <CardContent style={{
                        padding: 10,
                        margin: 10,
                    }}>
                        <form>
                            <TextField id={title} label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value) } type="text" placeholder="Title" />
                            <TextField id={description} label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
                            <br></br>
                            <br></br>
                            <Button variant="contained" onClick={createTODO}>Submit</Button>
                        </form>
                    </CardContent>
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

export default Todo;