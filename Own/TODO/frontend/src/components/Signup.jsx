import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent } from "@mui/material";
import { Routes, Route, useNavigate } from 'react-router-dom';


function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function signUp() {
        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "username": username,
                "password": password,
            }
        }).then(signupCallback)
    }

    function signupCallback(response) {

        if (response.status == 403) {
            alert("User all ready registered go to login")
            console.log("403");
        }
        else {
            response.json().then((data, err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (localStorage.getItem("token")) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                    }

                    localStorage.setItem("token", data.token)
                    localStorage.setItem("user", username)
                    console.log("User: " + username + "Token: " + data.token);
                    navigate('/todo');
                }
            })
        }
    }

    return (

        <div>
            <Card>
                <CardContent>
                    <form>
                        <TextField id={username} label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <TextField id={password} label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" />
                        <br></br><br></br>
                        <Button variant="contained" onClick={signUp}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}


export default Signup;