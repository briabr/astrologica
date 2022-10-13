//Dependencies
// Create variable to store "city input" and "city" ids 
let cityName = document.getElementById("cityInput");
let city = document.getElementById("city");
// Create variable to store "site-header" id 
var headerEl = document.getElementById("site-header");
// Create variable to display events
var sunEl = document.getElementById("sun-card");
var moonEl = document.getElementById("moon-card");
// Create variable to store "button" and "load-time" 
var button = document.getElementById("button");
var loadEl = document.getElementById("load-time");
var loaderEl = document.querySelector(".loader")

// Modal trigger (probably a button to open the menu)

// Create variable to store API key
var apiKey = "0da3f74b44c04bb0a6dd84b85199b22c"

//Create variable called history for localStorage function
let history = []

// Create onclick function calling the clear() and the loading() functions.
function onClick() {
    clear();
    loading();
    getAPI();
}

var upperCaseCityName = "";
// Will fix the display name of the city input so that it is correctly capitalized
function casing() {
    upperCaseCityName = "";
    var cityArr = cityName.value.split(" ");

    for (var i = 0; i < cityArr.length; i++){
        upperCaseCityName += cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1) + " ";
    }
    return upperCaseCityName;
}

function getAPI() {
    let cityName = document.getElementById("cityInput");
    let city = document.getElementById("city");
    // select user input date or current date
    let date = document.getElementById("date-input").value ?? moment().format('YYYY-MM-DD');
    //taking the user's input 
    //and updating city name to the user's input
    //updates date to user's input
    
    casing();
    //Taking the user's input and updating city name to the user's input
    city.innerHTML = "-- " + upperCaseCityName + "--"
    var requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location=' + cityName.value + '&date=' + date;

    fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {

            dataFunc(data)

            //Add a cityName to history array
            history.push(cityName.value)
            //Set localStorage name/value pair
            localStorage.setItem("cityList", [history])

        }      
        )
}

function loading() { 
    loadEl.innerHTML = "";
    //Create message for loading time 
    var loadTime = document.createElement("p");
    loadTime.innerHTML = "Please wait a few moments for the data to be loaded.";
    loadEl.appendChild(loadTime);
    var loadSpinner = document.createElement("div");
    loaderEl.appendChild(loadSpinner);
}

function clear() {
    // Clears previous data
    sunEl.innerHTML = "";
    moonEl.innerHTML = "";
}


function dataFunc(data) {
    // Creates card for the sunrise
    var sunriseTime = document.createElement("p");
    sunriseTime.innerHTML = "The sun will rise at " + data.sunrise + ".";
    sunEl.appendChild(sunriseTime);

    // Creates card for the sunset
    var sunsetTime = document.createElement("p");
    sunsetTime.innerHTML = "The sun will set at " + data.sunset + ".";
    sunEl.appendChild(sunsetTime);

    // Creates card for the moorise
    var moonriseTime = document.createElement("p");
    moonriseTime.innerHTML = "The moon will rise at " + data.moonrise + ".";
    moonEl.appendChild(moonriseTime);

    // Creates card for the moonset
    var moonsetTime = document.createElement("p");
    moonsetTime.innerHTML = "The moon will set at " + data.moonset + " the next day.";
    moonEl.appendChild(moonsetTime);
}

function getFromLocalStorage(){
    //Retrieve localStorage name/value pair:
    let historyData = localStorage.getItem("cityList")
    console.log(historyData)
    getFromLocalStorage()
  }

function podAPI() { 
    //Display picture of the day 
    nasaURL = "https://api.nasa.gov/planetary/apod?api_key=YZ4bgMRaiHrTUwO9oeZ8kogbpKg1YYlpyyovcfkU"
    fetch(nasaURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
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

  

