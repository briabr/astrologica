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

document.getElementById("cityInput").defaultValue = "New York";
function getInfo(){
    let newName = document.getElementById("cityInput");
    let City = document.getElementById("City");
    //taking the user's input 
    //and updating city name to the user's input
    City.innerHTML = "--"+newName.value+"--"
}
  
