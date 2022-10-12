// Dependencies
// City input
let cityName = document.getElementById("cityInput");
// Place to display events
var sunEl = document.getElementById("sun-card");
var moonEl = document.getElementById("moon-card");
// Submit button
var button = document.getElementById("button");
// Modal trigger (probably a button to open the menu)

// Place to display saved events

// Data
var apiKey = "0da3f74b44c04bb0a6dd84b85199b22c"
// User location
// Current date and time
// NASA API


// Function
function getAPI() {
    let cityName = document.getElementById("cityInput");
    let city = document.getElementById("city");
    //taking the user's input 
    //and updating city name to the user's input
    city.innerHTML = "--" + cityName.value + "--"
    var requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location=' + cityName.value;

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

function dataFunc(data) {
    // clears previous data
    sunEl.innerHTML = "";
    moonEl.innerHTML = "";

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

button.addEventListener("click", getAPI);

  

