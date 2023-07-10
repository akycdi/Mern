import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <h1>Register</h1>
      <form >
        <TextField id={title} label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
        <TextField id={description} label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
        <br></br>
        <Button variant="contained" onClick={signup} >Submit</Button>
      </form>
    </div>
  )
}

const todosCallback = (res) => {
  res.json().then((data) => {
    console.log(data);
  })
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFydW4iLCJpYXQiOjE2ODg5MzM1NTEsImV4cCI6MTY4OTAxOTk1MX0.t0SZIMwsAFh5OoPA_WmLlyT3Dhi9BLbRHu8d5p-XmdE"

function signup() {
  fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({
      title: "Hello Title",
      description: "Hello Description"
    }),
    headers: {
      "username": "Arun",
      "Authorization": "Bearer " + token,
    }
  }).then(todosCallback)
}

function login() {
  fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({
      title: "Hello Title",
      description: "Hello Description"
    }),
    headers: {
      "username": "Arun",
      "Authorization": "Bearer " + token,
    }
  }).then(todosCallback)
}

export default App;
