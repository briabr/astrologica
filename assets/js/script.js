//Dependencies
// Create variable to store "city input" and "city" ids 
let cityName = document.getElementById("cityInput");
let city = document.getElementById("city");
// Create variable to store "site-header" id 
var headerEl = document.getElementById("site-header");
// Create variable to display events
var sunEl = document.getElementById("sun-card");
var moonEl = document.getElementById("moon-card");
var planetEl = document.getElementById("planet-card");
// Create variable to store "button" and "load-time" 
var button = document.getElementById("button");
var loadEl = document.getElementById("load-time");
var loaderEl = document.querySelector(".loaderContainer");
var saveButton = document.querySelector(".button2");
var showSavedSearchesButton = document.getElementById("showSavedSearches");
var clearSearchButton = document.getElementById("clearbtn");
var savedSearch = document.getElementById("savedSearch");
var dateEl = document.getElementById("date-input")


var errorModal = document.getElementById("errorModal");
// Modal trigger (probably a button to open the menu)

var startbtnEl = document.getElementById("start-btn");
// Create variable to store API key
var apiKey = "0da3f74b44c04bb0a6dd84b85199b22c";

//Create variable called history for localStorage function
let history = [];
let save = {};

// Create onclick function calling the clear() and the loading() functions.
function onClick() {
    clear();
    loading();
    getAPI();
}


function clear() {
    // Clears previous data
    sunEl.innerHTML = "";
    moonEl.innerHTML = "";
    planetEl.innerHTML = "";
}


function loading() {
    loadEl.innerHTML = "";
    //Create message for loading time 
    var loadTime = document.createElement("p");
    loadTime.innerHTML = "Please wait a few moments for the data to be loaded.";
    loadEl.appendChild(loadTime);
    var loadSpinner = document.createElement("div");//create
    loadSpinner.classList.add("loader");// build
    loaderEl.appendChild(loadSpinner);// place
    // Makes the button unclickable to prevent second input while first one is still loading
    startbtnEl.disabled = true;
}


function endLoading() {
    //end the loaded message 
    loadEl.innerHTML = "";
    //end the spinner 
    loaderEl.innerHTML = "";
    // Re-enables the button so user can enter second input
    startbtnEl.disabled = false;
}


var upperCaseCityName = "";
// Will fix the display name of the city input so that it is correctly capitalized
function casing() {
    upperCaseCityName = "";
    var cityArr = cityName.value.split(" ");

    for (var i = 0; i < cityArr.length; i++) {
        upperCaseCityName += cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1) + " ";
    }
    return upperCaseCityName;
}




function getAPI(location) {
    console.log('location', location);
    console.log('cityName.value', cityName.value)


    // select user input date or current date
    let date = document.getElementById("date-input").value ?? moment().format('YYYY-MM-DD');
    let save = JSON.parse(localStorage.getItem("saveSearch"))
    if (save && save[cityName.value + ' ' + date]) {
        dataFunc(save[cityName.value + " " + date])
        return
    }
    casing();
    //Taking the user's input and updating city name to the user's input
    city.innerHTML = "-- " + upperCaseCityName + "--"
    var requestURL;
    if (location){
        requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location=' + location + '&date=' + date;
    }else {
        requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location=' + cityName.value + '&date=' + date;
    }

    
    fetch(requestURL)
    .then(function (response) {
        if (!response.ok) {
            invalidCityMessage();
            
        } else {
            return response.json();
        }
        })
        .then(function (data) {
            //as soon as the data appears, stop loading 
            endLoading();
            // data loaded 
            dataFunc(data);
            planetsAPI(data);
            localStorage.setItem("current data", JSON.stringify(data))
            
            
            

        })
}
function saveToLocalStorage (){
    let data = JSON.parse(localStorage.getItem("current data"))
    let save = JSON.parse(localStorage.getItem('saveSearch')) || {};
    //Add a cityName to history array
    if (cityName.value !== "" && !history.includes(cityName.value)){
        history.push(cityName.value);
    }
    let date;
    console.log(dateEl.value)
    if (dateEl.value === ""){
        date = moment().format('YYYY-MM-DD');
    }else {
        date = dateEl.value
    }
    if (cityName.value !== "" && !save[cityName.value + date]){
        save[cityName.value + " " + date] = data;
    }
    
    //Set localStorage name/value pair
    localStorage.setItem("cityList", JSON.stringify(history));
    localStorage.setItem("saveSearch", JSON.stringify(save));


}

function showSavedSearches(){
    savedSearch.innerHTML = "";
    console.log("showing the saved data")
    //get the cities from localstorage
    var cities = JSON.parse(localStorage.getItem("saveSearch"))
    console.log(cities)
    if (cities) {
        // cities = cities.split(",")
        console.log("this should be an aarrray of cities: ", cities)
        for ( var i=0; i < Object.keys(cities).length; i++){
            
            var newButton = document.createElement("button")
            newButton.classList.add("button")
            newButton.textContent = Object.keys(cities)[i]
            newButton.addEventListener("click", function(){
                sunEl.textContent = "";
                moonEl.textContent ="";
                planetEl.textContent ="";
                console.log(this.textContent)
                let saved = JSON.parse(localStorage.getItem("saveSearch"))   
                let data = saved[this.textContent]
                dataFunc(data)     
            })

            savedSearch.appendChild(newButton)
        
        }
    } 
    //list of buttons of past cities to appear
    //when button clicked, the data of that city appear
}

function clearSavedSearches() {
    localStorage.clear();
    savedSearch.innerHTML = "";
}
//location and date



function planetsAPI(data) {
    var latitude = data.location.latitude;
    var longitude = data.location.longitude;
    
    var planetURL = "https://visible-planets-api.herokuapp.com/v3?" + "latitude=" + latitude + "&longitude=" + longitude + "&showCoords=true"
    fetch(planetURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data2) {
        console.log(data2);
        var celestialBodies = data2.data
        var filteredData = celestialBodies.filter(function(body) {
            return body.nakedEyeObject});
        console.log(filteredData);
        planetData(filteredData);
    })
}

function planetData(filteredData) {
    planetEl.innerHTML = "";
    planetEl.setAttribute("class","card");
    var caption = document.createElement("p");
    caption.textContent = "Under optimal conditions you can currently see:"
    planetEl.appendChild(caption);
    for (i=0; i < filteredData.length; i++) {
        var visibleBody = document.createElement("p");
        visibleBody.innerHTML = filteredData[i].name;
        planetEl.appendChild(visibleBody);
    }
}

function dataFunc(data) {
    sunEl.innerHTML = "";
    moonEl.innerHTML = "";
    // Creates card for the sunrise
    sunEl.setAttribute("class", "card")
    var sunriseTime = document.createElement("p");
    sunriseTime.innerHTML = "The sun will rise at " + data.sunrise + ".";
    sunEl.appendChild(sunriseTime);
    
    // Creates card for the sunset
    var sunsetTime = document.createElement("p");
    sunsetTime.innerHTML = "The sun will set at " + data.sunset + ".";
    sunEl.appendChild(sunsetTime);
    
    // Creates card for the moorise
    moonEl.setAttribute("class", "card")
    var moonriseTime = document.createElement("p");
    moonriseTime.innerHTML = "The moon will rise at " + data.moonrise + ".";
    moonEl.appendChild(moonriseTime);
    
    // Creates card for the moonset
    var moonsetTime = document.createElement("p");
    moonsetTime.innerHTML = "The moon will set at " + data.moonset + " the next day.";
    moonEl.appendChild(moonsetTime);
}


function invalidCityMessage() {
    $('#errorModal').foundation('open');
    
}


function getFromLocalStorage() {
    //retrieve localStorage name/value pair:
    let historyData = JSON.parse(localStorage.getItem("cityList"));
    let saveData = JSON.parse(localStorage.getItem("saveSearch"));
    console.log(historyData);
    console.log(saveData);
}
getFromLocalStorage();

//Display picture of the day 
function podAPI() {
    nasaURL = "https://api.nasa.gov/planetary/apod?api_key=YZ4bgMRaiHrTUwO9oeZ8kogbpKg1YYlpyyovcfkU"
    fetch(nasaURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        headerEl.setAttribute("style", "background-image: url(" + data.url + ")");
    })
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
saveButton.addEventListener("click", function(){
    saveToLocalStorage()
});
showSavedSearchesButton.addEventListener("click", showSavedSearches);

clearSearchButton.addEventListener("click", clearSavedSearches);



// saved past searches : 
//where is it saving automatically
// grab the code when they click this button

