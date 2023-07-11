import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent } from "@mui/material";
import { Routes, Route, useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn()
        if (isAuth) {
            navigate('/todo');
        }
    })

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

        if (response.status === 403) {
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
                    console.log("User: " + username + " Token: " + data.token);
                    navigate('/todo');
                }
            })
        }
    }

    function isAuthCallBack(res) {
        res.json().then((data) => {
            if (res.ok) {
                console.log(data);
                setIsAuth(true)
                return
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    function isLoggedIn() {
        if (!localStorage.getItem("token")) {
            setIsAuth(false)
        }
        else {
            fetch('http://localhost:3000/isAuthenticated', {
                method: "GET",
                headers: {
                    "username": localStorage.getItem("user"),
                    "content-type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("token"),
                }
            }).then(isAuthCallBack)
        }
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