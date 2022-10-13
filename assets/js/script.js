
// Dependencies
// City input
let cityName = document.getElementById("cityInput");
// Header
var headerEl = document.getElementById("site-header");
// Place to display events
var sunEl = document.getElementById("sun-card");
var moonEl = document.getElementById("moon-card");
// Submit button
var button = document.getElementById("button");
var loadEl = document.getElementById("load-time");
// Modal trigger (probably a button to open the menu)

// Place to display saved events

// Data
var apiKey = "0da3f74b44c04bb0a6dd84b85199b22c"
// User location
// Current date and time
// NASA API


// Function
function onClick() {
    clear();
    loading();
}

function getAPI() {
    let cityName = document.getElementById("cityInput");
    let city = document.getElementById("city");
    // select user input date or current date
    let date = document.getElementById("date-input").value ?? moment().format('YYYY-MM-DD');
    //taking the user's input 
    //and updating city name to the user's input
    //updates date to user's input
    city.innerHTML = "--" + cityName.value + "--"
    var requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location=' + cityName.value + '&date=' + date;

    fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            console.log(data.moonrise)
            console.log(data.sunrise)
            dataFunc(data)
        }      
        )
}

function loading() {
    loadEl.innerHTML = "";
    //create message for loading time 
    var loadTime = document.createElement("p");
    loadTime.innerHTML = "Please wait a few moments for the data to be loaded.";
    loadEl.appendChild(loadTime);
    getAPI();
}

function clear() {
    // clears previous data
    sunEl.innerHTML = "";
    moonEl.innerHTML = "";
}

function dataFunc(data) {
    // creates card for the sunrise
    var sunriseTime = document.createElement("p");
    sunriseTime.innerHTML = "The sun will rise at " + data.sunrise + ".";
    sunEl.appendChild(sunriseTime);

    // creates card for the sunset
    var sunsetTime = document.createElement("p");
    sunsetTime.innerHTML = "The sun will set at " + data.sunset + ".";
    sunEl.appendChild(sunsetTime);

    // creates card for the moorise
    var moonriseTime = document.createElement("p");
    moonriseTime.innerHTML = "The moon will rise at " + data.moonrise + ".";
    moonEl.appendChild(moonriseTime);

    // creates card for the moonset
    var moonsetTime = document.createElement("p");
    moonsetTime.innerHTML = "The moon will set at " + data.moonset + " the next day.";
    moonEl.appendChild(moonsetTime);
}


function podAPI() {
    nasaURL = "https://api.nasa.gov/planetary/apod?api_key=YZ4bgMRaiHrTUwO9oeZ8kogbpKg1YYlpyyovcfkU"
    fetch(nasaURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            headerEl.setAttribute("style", "background-image: url(" + data.url + ")");
        }
        )
    }



// getAPI
// Grab user location
    // May need to convert City name to coordinates
// Autocomplete (optional)

// User interaction
// Textbox for user to input location
    // Submit button
    // Using a Modal?
// Button for user to save event
// Button for user to remove saved event

// Loads the picture of the day from NASA's API
podAPI();
button.addEventListener("click", onClick);

  

