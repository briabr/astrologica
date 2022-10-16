//Dependencies
//Create variable to store "city input" and "city" elements 
let cityName = document.getElementById("cityInput");
let city = document.getElementById("city");
//Create variable to store "site-header" elements 
var headerEl = document.getElementById("site-header");
//Create variable to display events
var sunEl = document.getElementById("sun-card");
var moonEl = document.getElementById("moon-card");
var planetEl = document.getElementById("planet-card");
//Create variable to store "button" and "load-time" elements 
var submitModalData = document.getElementById("button");
var loadEl = document.getElementById("load-time");
var loaderEl = document.querySelector(".loaderContainer");
//Get button element for local storage 
var saveButton = document.querySelector(".button1");
var showSavedSearchesButton = document.getElementById("showSavedSearches");
var savedSearch = document.getElementById("savedSearch");
//Button element to clear the search data from html and local storage
var clearSearchButton = document.getElementById("clearbtn");
//Date element for getting selected date from the modal 
var dateEl = document.getElementById("date-input")
//Variable for invalid city name 
var errorModal = document.getElementById("errorModal");
//Trigger to open the modal for city name and date
var startbtnEl = document.getElementById("start-btn");
//Variable to store API key
var apiKey = "0da3f74b44c04bb0a6dd84b85199b22c";
//Variable called history for localStorage function
let history = [];
let save = {};

//Initialize data gathering process by calling clear, loading and getAPI functions
function onClick() {
    clear();
    loading();
    getAPI();
}
//Clear divisions related to sun, moon, planet data 
function clear() {
    // Clears previous data
    sunEl.innerHTML = "";
    moonEl.innerHTML = "";
    planetEl.innerHTML = "";
}
function loading() {
    //Clear the default spinner behavior
    loadEl.innerHTML = "";
    //Create message for loading time 
    var loadTime = document.createElement("p");
    loadTime.innerHTML = "Please wait a few moments for the data to be loaded.";
    loadEl.appendChild(loadTime);
    //Create variable for the spinner
    var loadSpinner = document.createElement("div");
    //Add class to build spinner from CSS
    loadSpinner.classList.add("loader");
    //Add spinner div to DOM (Document Object Model)
    loaderEl.appendChild(loadSpinner);
    //Makes the button unclickable to prevent second input while first one is still loading
    startbtnEl.disabled = true;
    saveButton.disabled = true;
}
function endLoading() {
    //Clear division that loads message 
    loadEl.innerHTML = "";
    //Clear division that loads the spinner 
    loaderEl.innerHTML = "";
    // Re-enables the button so user can enter second input
    startbtnEl.disabled = false;
    saveButton.disabled = false;
}
// Create variable with empty string value
var upperCaseCityName = "";
// Capitalize city input 
function casing() {
    upperCaseCityName = "";
    var cityArr = cityName.value.split(" ");
    
    for (var i = 0; i < cityArr.length; i++) {
    // Take first character from city name and capitalize it
    upperCaseCityName += cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1) + " ";
    }
    return upperCaseCityName;
}
// Fetch sun, moon and planet APIs data 
function getAPI() {
    console.log('cityName.value', cityName.value)
    //Select user input date or current date
    let date = document.getElementById("date-input").value ?? moment().format('YYYY-MM-DD');
    // Get values from localStorage for savedSearches 
    let save = JSON.parse(localStorage.getItem("saveSearch"))
    //If data found in local storage, then call dataFunc to set sun, moon and planet data.
    if (save && save[cityName.value + ' ' + date]) {
        dataFunc(save[cityName.value + " " + date])
        return
    }
    casing();
    //Taking the user's input and updating city name to the user's input
    city.innerHTML = "-- " + upperCaseCityName + "--"
    var requestURL;
    requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location=' + cityName.value + '&date=' + date;
    //Make fetch request to external/third party API
    fetch(requestURL)
    .then(function (response) {
        if (!response.ok) {
            invalidCityMessage();
            
        } else {
            return response.json();
        }
        })
        .then(function (data) {
            //As soon as the data appears, stop loading 
            endLoading();
            //Data loaded 
            dataFunc(data);
            planetsAPI(data);
            //Set localStorage with current data
            localStorage.setItem("current data", JSON.stringify(data))
        })
}
function saveToLocalStorage (){
    //Gettting the current data from localStorage
    let data = JSON.parse(localStorage.getItem("current data"))
    //Getting the saved searches from the localStorage 
    let save = JSON.parse(localStorage.getItem('saveSearch')) || {};
    //Add a cityName to history array
    if (cityName.value !== "" && !history.includes(cityName.value)){
        history.push(cityName.value);
    }
    let date;
    console.log(dateEl.value)
    //If no date provided 
    if (dateEl.value === ""){
        //Assign current date to date variable 
        date = moment().format('YYYY-MM-DD');
    }else { 
        //Assign user's provided date to date variable
        date = dateEl.value
    }
    //If city name is provided and it is not previousely saved, then save city name 
    if (cityName.value !== "" && !save[cityName.value + date]){
        save[cityName.value + " " + date] = data;
    }
    //Set localStorage value for city list and saved search 
    localStorage.setItem("cityList", JSON.stringify(history));
    localStorage.setItem("saveSearch", JSON.stringify(save));
}
function showSavedSearches(){
    //Clear the saved searches 
    savedSearch.innerHTML = "";
    console.log("showing the saved data")
    //Get the cities from localstorage
    var cities = JSON.parse(localStorage.getItem("saveSearch"))
    console.log(cities)
    if (cities) {
        console.log("this should be an array of cities: ", cities)
        for ( var i=0; i < Object.keys(cities).length; i++){
            
            var newButton = document.createElement("button")
            newButton.classList.add("button")
            newButton.textContent = Object.keys(cities)[i]
            newButton.addEventListener("click", function(){
                sunEl.textContent = "";
                moonEl.textContent ="";
                planetEl.textContent ="";
                console.log(this.textContent)
                //Convert sttring based data to Json object data using Json.parse
                let saved = JSON.parse(localStorage.getItem("saveSearch"))  
                //Get the appropriate saved search data 
                let data = saved[this.textContent]
                //Calling dataFunc to display sunrise, moonrise and planet data.
                dataFunc(data)     
            })
            savedSearch.appendChild(newButton)
        }
    } 
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
    //Get local storge data for city list and saveSEarch 
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
// Loads the picture of the day from NASA's API
podAPI();
submitModalData.addEventListener("click", onClick);
saveButton.addEventListener("click", function(){
    saveToLocalStorage()
});
showSavedSearchesButton.addEventListener("click", showSavedSearches);
clearSearchButton.addEventListener("click", clearSavedSearches);

