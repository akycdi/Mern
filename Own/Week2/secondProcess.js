function callbackFun(result) {
    // console.log(result.status);

    result.json().then(function (data) {
        console.log(data);
    });
}


var sendObj = {
    method: "GET"
}

fetch("http://localhost:3000/?counter=10", sendObj).then(callbackFun);