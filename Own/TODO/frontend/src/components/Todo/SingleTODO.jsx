import { Typography, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

function SingleTODO(props) {

    const [editedTitle, setEditedTitle] = useState('');
    const [editedTodoId, setEditedTodoId] = useState('');

    function deleteTODO(id) {
        fetch(`http://localhost:3000/todo/delete/${id}`, {
            method: "DELETE",
            headers: {
                username: localStorage.getItem("user"),
                "content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                props.setData(data.TODO);
                props.setCounter(data.TODO.length);
            })
            .catch((error) => {
                console.log("Error deleting TODO:", error);
            });
    }

    function updateTODO(id) {
        fetch(`http://localhost:3000/todo/update/${id}`, {
            method: "PUT",
            headers: {
                username: localStorage.getItem("user"),
                "content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: editedTitle
            })
        })
            .then((res) => res.json())
            .then((data) => {
                props.setData(data.TODO);
                props.setCounter(data.TODO.length);
            })
            .catch((error) => {
                console.log("Error deleting TODO:", error);
            });
    }

    let data = props.data;
    return (
        <div>
            {data &&
                data.map((todo) => (
                    <div style={{ display: "flex", padding: 10 }} key={todo.id}>
                        {editedTodoId === todo.id ? (
                            <TextField
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                onBlur={() => {
                                    setEditedTodoId('');
                                    updateTODO(todo.id);
                                }}
                                autoFocus
                                fullWidth
                            />
                        ) : (
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                                onClick={() => {
                                    setEditedTitle(todo.title);
                                    setEditedTodoId(todo.id);
                                }}>
                                {todo.title}
                            </Typography>
                        )}
                        <HighlightOffIcon color="primary" size="large" onClick={() => deleteTODO(todo.id)} />
                    </div>
                ))}
        </div>
    );
}
export default SingleTODO;
