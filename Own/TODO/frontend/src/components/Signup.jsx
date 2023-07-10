import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField, Card, CardContent } from "@mui/material";


function Signup(params) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function signUP(params) {
        console.log("Log is working");
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <form>
                        <TextField id={username} label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <TextField id={password} label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" />
                        <br></br><br></br>
                        <Button variant="contained" onClick={signUP}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFydW4iLCJpYXQiOjE2ODg5MzM1NTEsImV4cCI6MTY4OTAxOTk1MX0.t0SZIMwsAFh5OoPA_WmLlyT3Dhi9BLbRHu8d5p-XmdE"

export default Signup;