import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent } from "@mui/material";
import { Routes, Route, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    function LoginButton() {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "username": username,
                "content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(loginCallback)
    }

    function loginCallback(response) {
        response.json().then((err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                navigate('/todo');
                console.log(data);
            }
        })
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
        }}>
            <Card>
                <CardContent>
                    <form>
                        <TextField id={username} label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <br></br>
                        <br></br>
                        <Button variant="contained" onClick={LoginButton}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}
export default Login;