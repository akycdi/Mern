const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


async function checkCreds(data) {
  await ADMINS.forEach(element => {
    if (element.username === data.username && element.passowrd === data.passowrd) {
      return true;
    }
  });
  return false;
}

app.post('/admin/signup', (req, res) => {
  let data = req.body;
  ADMINS.push(data);
  res.send('Admin created successfully');
  console.log(ADMINS);
});

app.post('/admin/login', (req, res) => {
  let data = req.headers;
  if (checkCreds(data)) {
    res.status(200).send('Logged in successfully');
  }
  else {
    res.status(401).send('Invaid username or password');
  }
});

app.post('/admin/courses', (req, res) => {
  let auth = req.headers;
  let data = req.body;
  data.id = Math.floor(Math.random() * 1000000);
  if (checkCreds(auth)) {
    COURSES.push(data);
    const value = JSON.stringify({
      message: 'Course created successfully',
      courseId: data.id
    })
    res.status(200).send(value);
  }
  else {
    res.status(401).send('Invaid username or password');
  }
});

app.put('/admin/courses/:courseId', (req, res) => {
  let auth = req.headers;

  if (checkCreds(auth)) {
    let data = req.body;
    let ID = parseInt(req.params.courseId);
    console.log(ID);
    console.log(COURSES);

    COURSES.forEach(element => {
      if (element.id === ID) {
        element.title = data.title;
        element.description = data.description;
        element.price = data.price;
        element.imageLink = data.imageLink;
        element.published = data.published;
      }
    });
    console.log(COURSES);
    res.send('Course updated successfully');
  }
  else {
    res.status(401).send('Invalid Creds');
  }
});


app.get('/admin/courses', (req, res) => {
  let auth = req.headers;
  if (checkCreds(auth)) {
    res.send(COURSES);
  }
  else {
    res.status(401).send('Invalid Creds')
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
