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
app.post('/users/signup', (req, res) => {
  let data = req.body;
  const alreadyExistsUser = USERS.find(x => x.username === data.username);
  if (alreadyExistsUser) {
    res.status(403).json({ message: 'User already exists' });
  }
  else {
    const user = {
      username: req.body.username,
      password: req.body.password,
      purchasedCourses: []
    }
    USERS.push(user);
    res.send(JSON.stringify({
      message: 'Created in successfully'
    }))
  }
});

app.post('/users/login', userAuthentication, (req, res) => {
  console.log(USERS);
  res.send(JSON.stringify({
    message: 'Logged in successfully'
  }))
});

// app.get('/users/courses', userAuthentication, (req, res) => {
//   res.send(JSON.stringify({
//     courses: COURSES
//   }))
// })

app.get('/users/courses', userAuthentication, (req, res) => {
  // COURSES.filter(c => c.published)
  let filteredCourses = [];
  for (let i = 0; i<COURSES.length; i++) {
    if (COURSES[i].published) {
      filteredCourses.push(COURSES[i]);
    }
  }
  res.json({ courses: filteredCourses });
});

// app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
//   let courseId = parseInt(req.params.courseId);
//   let course = COURSES.find(element => { element.id === courseId });
//   if (course) {
//     req.user.purchasedCourses.push(courseId);
//     res.json({ message: 'Course purchased successfully' });
//   }
//   else {
//     res.status(404).json({ message: 'Course not found or not available' });
//   }
// })

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: 'Course purchased successfully' });
  } else {
    res.status(404).json({ message: 'Course not found or not available' });
  }
});

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  var purchasedCourseIds = req.user.purchasedCourses;[1, 4];
  var purchasedCourses = [];
  for (let i = 0; i < COURSES.length; i++) {
    if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) {
      purchasedCourses.push(COURSES[i]);
    }
  }
  res.json({ purchasedCourses });
});
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
