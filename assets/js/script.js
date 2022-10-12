// Dependencies
// City input
// Sumbit button
// Modal trigger (probably a button to open the menu)
// Place to display events
// Place to display saved events

// Data
// User location
// Current date and time
// NASA API

// Function
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

var eventEl = document.getElementById("event-name")

var sunrise = data.sunrise;
var sunset = data.sunset;
var moonrise = data.moonrise;
var moonset = data.moonset;

// creates card for the sunrise
var sunriseCard = document.createElement("div");
var sunriseTime = document.createElement("p");
sunriseTime.innerHTML = sunrise;
sunriseCard.appendChild(sunriseTime);
eventEl.appendChild(sunriseCard);

// creates card for the sunset
var sunsetCard = document.createElement("div");
var sunsetTime = document.createElement("p");
sunsetTime.innerHTML = sunset;
sunsetCard.appendChild(sunsetTime);
eventEl.appendChild(sunsetCard);

// creates card for the moorise
var moonriseCard = document.createElement("div");
var moonriseTime = document.createElement("p");
moonriseTime.innerHTML = moonrise;
moonriseCard.appendChild(moonriseTime);
eventEl.appendChild(moonriseCard);

// creates card for the moonset
var moonsetCard = document.createElement("div");
var moonsetTime = document.createElement("p");
moonsetTime.innerHTML = moonset;
moonsetCard.appendChild(moonsetTime);
eventEl.appendChild(moonsetCard);