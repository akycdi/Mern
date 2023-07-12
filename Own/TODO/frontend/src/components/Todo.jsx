import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent } from "@mui/material";

import DisplayTodo from "./DisplayTodo";

function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dataChanged, setDataChanged] = useState(false);

    function createTODO() {
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
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setDataChanged(prevDataChanged => !prevDataChanged);
                    setTitle("");
                    setDescription("");
                }
            });
    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 30,
            }}>
                <Card sx={{ minWidth: 500, minHeight: 500 }} style={{
                    padding: 10,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <CardContent style={{
                        padding: 10,
                        margin: 10,
                    }}>
                        <DisplayTodo dataChanged={dataChanged} setDataChanged={setDataChanged} />
                        <form>
                            <TextField id="title" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
                            <TextField id="description" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
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

export default Todo;
