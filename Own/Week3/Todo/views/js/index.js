function todosCallback(data) {
    var parentElement = document.getElementById("parent");
    parentElement.innerHTML=""

    for (var i = 0; i < data.length; i++) {
        var childElement = document.createElement("div");

        var grandChildElement1 = document.createElement("span");
        grandChildElement1.innerHTML = data[i].title

        var grandChildElement2 = document.createElement("span");
        grandChildElement2.innerHTML = data[i].description

        var grandChildElement3 = document.createElement("button");
        grandChildElement3.innerHTML = "Delete"

        grandChildElement3.setAttribute("onclick", "deleteTodo(" + data[i].id + " )");
        childElement.appendChild(grandChildElement1)
        childElement.appendChild(grandChildElement2)
        childElement.appendChild(grandChildElement3)

        parentElement.appendChild(childElement);
    }
}

function deleteDone(resp){
    resp.json().then(todosCallback);
    console.log("delete done");
}


function deleteTodo(id) {
    fetch("http://localhost:3000/todos/" + id, {
        method: "DELETE"
    }).then(deleteDone)
}

function getDataCallback(resp) {
    resp.json().then(todosCallback);

}

function getData() {
    fetch("http://localhost:3000/todos", {
        method: "GET",
    }).then(getDataCallback)
}

function parsedResponse(data) {
    console.log(data);
    getData();
}

function callback(resp) {
    resp.json().then(parsedResponse);
}

function onPress() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;

    fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(callback)
}
