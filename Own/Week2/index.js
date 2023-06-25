// Description: This is the main file of this web application.

// const fs = require('fs');

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());



function middleWare(req, res, next) {
    console.log("This is middleware");
    // if(req.headers.counter == 10){
    // }
    // res.send(500);
    next();
}

// app.use(middleWare);


// app.get('/', callbackofHome);




// app.get('/getHTML',getHTML);

// function getHTML(req,res){

// }

app.get('/', handleFirstRequest);

function handleFirstRequest(req, res) {
    var counter = req.query.counter;
    var calculatedSum = calculateSum(counter);
    var mulsum = multiplySum(counter);

    var ansObj = {
        sum : calculatedSum,
        mul : mulsum
    }
    // res.send("This is home page : " + calculatedSum);

    res.status(200).send(ansObj);
}



// app.post('/', handleFirstRequest);

// function handleFirstRequest(req, res) {
//     var body = req.body;
//     console.log(body);
//     var calculatedSum = calculateSum(body.counter);
//     var mulsum = multiplySum(body.counter);

//     var ansObj = {
//         sum : calculatedSum,
//         mul : mulsum
//     }
//     // res.send("This is home page : " + calculatedSum);

//     res.status(200).send(ansObj);
// }

function multiplySum(params) {
    var sum = 1;
    for (let i = 1; i <= params; i++) {
        sum *= i;
    }
    return sum;
}


// app.get('/careers', careers);
// app.get('/home', getHome);

// app.get('/sum', async (req, res) => {

//     let sumNeeded = req.query.sum;
//     let data = calSum(sumNeeded);
//     res.send("Hello your sum is :" + data);
// });

// app.post('/create', createUser);

// function createUser(req, res) {
//     res.send("This is create user page");
// }

// app.get('/about', (req, res) => {
//     var counter = req.query.counter;
//     let data = calSum(counter);
//     console.log(data);
//     res.send("Hello your sum is :" + data);
// });


app.listen(port, stareted);

function stareted() {
    console.log(`Example app listening on port ${port}`)
}

// function careers(req, res) {
//     res.send("This is careers page");
// }

// function callbackofHome(req, res) {
//     res.send('This is home page');
// }


function calculateSum(params) {
    var sum = 0;
    for (let i = 0; i < params; i++) {
        sum += i;
    }
    return sum;
}

// console.log(calSum(10));