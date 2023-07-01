const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }))

let ADMINS = [];
let USERS = [];
let COURSES = [];


const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(a => a.username === username && a.password === password);
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
};


//Admin
app.post('/admin/signup', (req, res) => {
  let data = req.body;
  const alreadyExistsAdmin = ADMINS.find(x => x.username === data.username);
  if (alreadyExistsAdmin) {
    res.status(403).json({ message: 'Admin already exists' });
  }
  else {
    ADMINS.push(data);
    res.send(JSON.stringify({
      message: 'Created in successfully'
    }))
  }
});

app.post('/admin/login', adminAuthentication, (req, res) => {
  res.json({ message: 'Logged in successfully' });
})

app.post('/admin/courses', adminAuthentication, (req, res) => {
  const course = req.body;
  course.id = Date.now();
  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  let data = req.body;
  let ID = parseInt(req.params.courseId);

  let index = COURSES.find(x => x.id === ID);


  COURSES.forEach(element => {
    if (element.id === ID) {
      element.title = data.title;
      element.description = data.description;
      element.price = data.price;
      element.imageLink = data.imageLink;
      element.published = data.published;
    }
  });
  res.send('Course updated successfully');
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
  res.send(JSON.stringify({
    cources: COURSES
  }))
});

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const admin = USERS.find(a => a.username === username && a.password === password);
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
};



//User 
app.post('/user/signup', (req, res) => {
  let data = req.header;
  const alreadyExistsUser = USERS.find(x => {
    x.username === data.username;
  })
  if (alreadyExistsUser) {
    res.status(403).json({ message: 'Admin already exists' });
  }
  else {
    USERS.push(data);
    res.send(JSON.stringify({
      message: "User created successfully"
    }));
  }
});


app.post('/user/login', userAuthentication, (req, res) => {
  res.send(JSON.stringify({
    message: 'Logged in successfully'
  }))
});

app.get('/user/courses', userAuthentication, (req, res) => {
  res.send(JSON.stringify({
    courses: COURSES
  }))
})

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  let ID = parseInt(req.params.courseId);
  COURSES.forEach(element => {
    if (element.id === ID) {
      element.isPurchased = true;
      res.send(JSON.stringify({
        message: "Cources purchased successfull",
        id: element.id
      }))
    }
  });
  res.send(JSON.stringify({
    message: "Cannot find the course ID"
  }))
}
)

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {

  let auth = req.headers;
  let purchasedCources = [];
  if (checkCredsUser(auth)) {
    purchasedCources = COURSES.some((cources) => { cources.isPurchased === true })
    res.send(JSON.stringify({
      cources: purchasedCources
    }))
  }
  else {
    res.status(401).send(JSON.stringify({
      message: "Invalid Creds"
    }))
  }

})


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
