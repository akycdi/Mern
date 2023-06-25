function parsedResponse(data) {
    console.log(data);
    getData();
}

function callback(resp) {
    resp.json().then(parsedResponse);
}

async function onPress() {
    var title = await document.getElementById("title").value;
    var description = await document.getElementById("description").value;
    fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(
            { title: title, description: description }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(callback)
}


function todosCallback(data) {
    console.log(data);
    var parentElement = document.getElementById("data");
    parentElement.innerHTML = JSON.stringify(data);
}

function getDataCallback(resp) {
    resp.json().then(todosCallback);
}

function getData() {
    fetch("http://localhost:3000/todos", {
        method: "GET",
    }).then(getDataCallback);
}
