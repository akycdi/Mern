import React, { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";

function AvatarR(props) {

    if (localStorage.getItem("user")) {
        return (
            <div>
                <Avatar sx={{ width: 100, height: 100, bgcolor: blue[500] }}>{localStorage.getItem("user")}</Avatar>
            </div>
        )
    }
    else {
        return (
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <br></br>
                    <br></br>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: blue[500] }}>{localStorage.getItem("user")}</Avatar>
                </div>
                <TextField id={props.username} label="Username" variant="outlined" value={props.username} onChange={(e) => props.setUsername(e.target.value)} type="text" placeholder="text" />
            </div>
        )
    }

}

export default AvatarR