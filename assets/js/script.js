// Dependencies
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

// Function
function getAPI() {
    var requestURL = 'https://api.ipgeolocation.io/astronomy?apiKey=' + apiKey + '&location=Stamford,CT';

    fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            console.log(data.moonrise)
            console.log(data.sunrise)
        })
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

document.getElementById("cityInput").defaultValue = "New York";
function getInfo(){
    let newName = document.getElementById("cityInput");
    let City = document.getElementById("City");
    //taking the user's input 
    //and updating city name to the user's input
    City.innerHTML = "--"+newCityName.value+"--"
}
  
