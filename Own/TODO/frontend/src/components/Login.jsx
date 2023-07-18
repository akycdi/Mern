import React, { useState } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { blue } from "@mui/material/colors";

function Login() {
    const [password, setUsername] = useState("");
    const navigate = useNavigate();
    function LoginButton() {
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
                localStorage.setItem("token",data.token)
                navigate('/todo');
                console.log(data);
            } else {
                console.log(data);
            }
        }).catch((err) => {
            console.log(err);
        });
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