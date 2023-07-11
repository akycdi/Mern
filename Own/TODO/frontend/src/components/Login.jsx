import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent, Avatar } from "@mui/material";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { blue } from "@mui/material/colors";

function Login() {
    const [password, setUsername] = useState("");
    const navigate = useNavigate();

    function LoginButton() {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "username": localStorage.getItem("user"),
                "content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token"),
                "password":password
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

    if (localStorage.getItem("token")) {

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
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Avatar sx={{ width: 100, height: 100, bgcolor: blue[500] }}>{localStorage.getItem("user")}</Avatar>
                        </div>
                        <br>
                        </br>
                        <TextField id={password} label="Password" variant="outlined" value={password} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Password" />
                        <br></br>
                        <br></br>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Button size="large" variant="contained" onClick={LoginButton} sx={{ width: 220, height: 50 }}>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}
export default Login;