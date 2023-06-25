function parsedResponse(data) {
    console.log(data);
}

function callback(resp) {
    resp.json().then(parsedResponse);
}

function onPress() {
    fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(
            {title: "gym", description: "go to gym at 7"}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(callback)
}

