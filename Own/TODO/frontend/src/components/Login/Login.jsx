import React, { useState } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import AvatarR from "../Login/Avatar";

function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    function LoginButton() {

        if (!localStorage.getItem("user")) {
            localStorage.setItem("user", username)
        }
        fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": localStorage.getItem("user"),
                "password": password
            }),
        }).then(loginCallback)
    }

    function loginCallback(response) {
        response.json().then((data) => {
            if (response.ok) {
                localStorage.setItem("token", data.token)
                navigate('/todo');
            } else {
                console.log(data);
            }
        }).catch((err) => {
            console.log(err);
        });
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
                    <form >
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <AvatarR username={username} setUsername={setUsername} />
                        </div>
                        <br></br>
                        <TextField id={password} label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} type="Password" placeholder="Password" />
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