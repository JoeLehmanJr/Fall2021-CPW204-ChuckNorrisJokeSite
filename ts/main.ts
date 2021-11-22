class SingleJoke{
    /**
     * The joke's identifier.
     */
    id: number;

    /**
     * The text of the joke.
     */
    joke: string;

    /**
     * The category of the joke. eg. "explicit", "nerdy"
     */
    categories: string[];
}

window.onload = function() {
    let jokeButton = document.getElementById('get-joke');
    jokeButton.onclick = main;
}

function main() {
    let http = new XMLHttpRequest();
    // Prepare the request to the server and
    // GET request asks the server for data to be sent
    // The URL is the website we are requesting data from
    http.open("GET","https://api.icndb.com/jokes/random?limitTo=[nerdy]");

    // Function to handle different readyStates
    http.onreadystatechange = processRequest;

    // Sends the request to the server
    http.send();
}

function processRequest() {
    let http = <XMLHttpRequest>this;
    if(http.readyState == 4 && http.status == 200){
        // alert("Check the console because we are finished!");
        let response:SingleJoke = JSON.parse(http.responseText).value;

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

function displayJoke(j:SingleJoke){
    let displayDiv = document.getElementById("display-joke");

    // Display joke ID
    let jokeIdSpan = <HTMLElement>displayDiv.querySelector("h2 > span");
    jokeIdSpan.innerText = j.id.toString();

    // Display joke text
    let jokeParagraph = displayDiv.querySelector("p");
    jokeParagraph.innerHTML = j.joke;

    // Display joke categories
    let catList = displayDiv.querySelector("ul");
    catList.innerHTML = "";
    for (let i = 0; i < j.categories.length; i++){
         let nextCat = document.createElement("li");
         nextCat.innerText = j.categories[i];
         catList.appendChild(nextCat);
    }
}