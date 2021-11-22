var SingleJoke = (function () {
    function SingleJoke() {
    }
    return SingleJoke;
}());
window.onload = function () {
    var jokeButton = document.getElementById('get-joke');
    jokeButton.onclick = main;
};
function main() {
    var http = new XMLHttpRequest();
    http.open("GET", "https://api.icndb.com/jokes/random?limitTo=[nerdy]");
    http.onreadystatechange = processRequest;
    http.send();
}
function processRequest() {
    var http = this;
    if (http.readyState == 4 && http.status == 200) {
        var response = JSON.parse(http.responseText).value;
        console.log("Printing response frow web API...");
        console.log(response);
        console.log("Printing the joke ID...");
        console.log(response.id);
        console.log("Printing the joke");
        console.log(response.joke);
        console.log("Printing the joke category");
        console.log(response.categories);
        displayJoke(response);
    }
}
function displayJoke(j) {
    var displayDiv = document.getElementById("display-joke");
    var jokeIdSpan = displayDiv.querySelector("h2 > span");
    jokeIdSpan.innerText = j.id.toString();
    var jokeParagraph = displayDiv.querySelector("p");
    jokeParagraph.innerHTML = j.joke;
    var catList = displayDiv.querySelector("ul");
    catList.innerHTML = "";
    for (var i = 0; i < j.categories.length; i++) {
        var nextCat = document.createElement("li");
        nextCat.innerText = j.categories[i];
        catList.appendChild(nextCat);
    }
}
