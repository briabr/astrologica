// Dependencies
let cityName = document.getElementById("cityInput");
var eventEl = document.getElementById("event-name")
var button = document.getElementById("button");
// City input
// Sumbit button
// Modal trigger (probably a button to open the menu)
// Place to display events
// Place to display saved events

// Data
var apiKey = "0da3f74b44c04bb0a6dd84b85199b22c"
// User location
// Current date and time
// NASA API
button.addEventListener("click", getAPI);


// Function
function getAPI() {
    let cityName = document.getElementById("cityInput");
    let city = document.getElementById("city");
    //taking the user's input 
    //and updating city name to the user's input
    city.innerHTML = "--"+cityName.value+"--"
    var requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location='+"cityName.value"

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

getAPI()
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

function dataFunc(data) {
    var sunrise = data.sunrise;
    var sunset = data.sunset;
    var moonrise = data.moonrise;
    var moonset = data.moonset;

    // creates card for the sunrise
    var sunriseCard = document.createElement("div");
    var sunriseTime = document.createElement("p");
    sunriseTime.innerHTML = "The sun will rise at " + sunrise + ".";
    sunriseCard.appendChild(sunriseTime);
    eventEl.appendChild(sunriseCard);

    // creates card for the sunset
    var sunsetCard = document.createElement("div");
    var sunsetTime = document.createElement("p");
    sunsetTime.innerHTML = "The sun will set at " + sunset + ".";
    sunsetCard.appendChild(sunsetTime);
    eventEl.appendChild(sunsetCard);

    // creates card for the moorise
    var moonriseCard = document.createElement("div");
    var moonriseTime = document.createElement("p");
    moonriseTime.innerHTML = "The moon will rise at " + moonrise + ".";
    moonriseCard.appendChild(moonriseTime);
    eventEl.appendChild(moonriseCard);

    // creates card for the moonset
    var moonsetCard = document.createElement("div");
    var moonsetTime = document.createElement("p");
    moonsetTime.innerHTML = "The moon will set at " + moonset + ".";
    moonsetCard.appendChild(moonsetTime);
    eventEl.appendChild(moonsetCard);
}

// function getInfo(){
//     let cityName = document.getElementById("cityInput");
//     let city = document.getElementById("city");
//     //taking the user's input 
//     //and updating city name to the user's input
//     city.innerHTML = "--"+cityName.value+"--"
// }
  

