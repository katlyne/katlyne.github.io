'use strict';

//New Functions
var pagenav = document.querySelector('#nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-container');
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
var idHeader = {
    headers: {
     "User-Agent": "Student Learning Project - chi17400@byui.edu"
    }
   };

// We also could have write it like this:

// var pagenav = document.getElementById('nav');
// var statusContainer = document.getElementById('status');
// var contentContainer = document.getElementById('main-container');

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);


// A collection of functions for the weather page
document.addEventListener("DOMContentLoaded", function () {

    //Call the modified date function
    lastModified();

    //Work with small screen menu
    //const menuButton = document.querySelector("#menuBtn");
    // menuButton.addEventListener('click', menuButton);

    //Get weather json data
    getGeoLocation();
});


//Move to originial file

(function() {
    

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
    

    
})();

var now = new Date();

var day = now.getDayName();
var month = now.getMonthName();
var date = now.getDate();
var year = now.getFullYear();

document.getElementById("currentdate").innerHTML=day + ", " + date + " " + month + " " +
    year;


console.log(day + month + date + year);

//date
function lastModified() {
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthArray = ["January", "February", "March", "Arpil", "May", "June", "July", "August", "September", "October", "November", "December"];
    let lastMod = new Date(document.lastModified);
    const dayName = dayArray[lastMod.getDay()];
    const monthName = monthArray[lastMod.getMonth()];
    const formattedDate = dayName + ", " + lastMod.getDate() + " " + monthName + ', ' + lastMod.getFullYear();
    document.querySelector("#lastModified").innerText = formattedDate;
    console.log(lastModified);
};
// menu button
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}


// Handles Small Screen Menu
//const menuButton = document.querySelector("#menuBtn");
//menuButton.addEventListener('click',function(event){
//const navList = document.querySelector('#navList');
//navList.classList.toggle("mobileNav");
//})
//function mobileMenu(event){
//    const navList = $('navList');
//navList.classList.toggle("mobileNav");
//}

/* *****************************************
 *   Calculates the Wind Chill Temperature
 ****************************************** */
function buildWC(speed, temp) {
  //let feelTemp = document.getElementById("windchill");

    //Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(`The wind chill is: ${wc}`); // log wc to console

    //Round the answer down to integer
    wc = Math.floor(wc);

    //If chills is greater than temp, return temp
    //wc = (wc < temp) ? temp : wc;

    // Display the windchill
    console.log(`The wind chill is: ${wc}`);

    //wc = 'Feels like '+wc+' °F';
    return wc;
}

// Time Ball Indicator
function timeIndicator(hour) {
    // Find all "ball" classes and remove them
    let x = document.querySelectorAll(".ball");
    for (let item of x) {
        console.log(item);
        item.classList.remove("ball");
    }
    // Find all hours that match the parameter and add the "ball" class
    let hr = document.querySelectorAll(".i" + hour);
    for (let item of hr) {
        item.classList.add("ball");
    }
}

/* *********************************************
 *   Handle Weather Summary Background Image
 ************************************************ */
function changeSummaryImage(weather) {
    let w = document.getElementById('currweather');
    weather = weather.toLowerCase();
    console.log(weather);
    switch (weather) {
        case "clear":
            w.className = "";
            w.className += 'clear';
            break;
        case "fog":
            w.className = "";
            w.className += 'fog';
            break;
        case "rain":
            w.className = "";
            w.className += 'rain';
            break;
        case "snow":
            w.className = "";
            w.className += 'snow';
            break;
        case "clouds":
            w.className = "";
            w.className += 'clouds';
            break;
    }

}

// Function to change background image
function changeSummaryBackground(keyword) {
    let x = document.getElementById('currweather');
    console.log(`Outside is: ${keyword}`);

// Case Statements to change background image into current condition
console.log(keyword);
switch (keyword) {
    case "clear":
        x.className += 'clear';
        break;
    case "rain":
        x.className += 'rain';
        break;
    case "fog":
        x.className += 'fog';
        break;
    case "snow":
        x.className += 'snow';
        break;
    case "cloudy":
        x.className += 'cloudy';
        break;
    default:
        console.log("Weather Type Not Found");
        break;
}
console.log(`The used name is: ${x.className}`);
}

//Change shortForecast to keyword
function getKeyword(shortForecast) {
    let forecast = shortForecast.toLowerCase();
    var keyword;
    if (forecast.includes("sunny") || forecast.includes("clear")){
        keyword = "clear";
    }
    else if (forecast.includes("cloud") || forecast.includes("overcast")){
        keyword = "cloudy";
    }
    else if (forecast.includes("snow") || forecast.includes("snow showers") || forecast.includes("sleet")){
        keyword = "snow";
    }
    else if (forecast.includes("rain") || forecast.includes("thunder") || forecast.includes("showers")){
        keyword = "rain";
    }
    else if (forecast.includes("fog")){
        keyword = "fog";
    }
    else {
        console.log("Forecast Error");
    }
    return keyword;

}

/* *************************************
 *  Get Hourly Forecast data
 ************************************* */
function getHourly(URL) {
    fetch(URL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            console.log('Data from getHourly function:');
            console.log(data); // Let's see what we got back

            // Store 12 hours of data to session storage  
            var hourData = [];
            let todayDate = new Date();
            var nowHour = todayDate.getHours();
            console.log(`nowHour is ${nowHour}`);
            for (let i = 0, x = 11; i <= x; i++) {
                if (nowHour < 24) {
                    hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
                    sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
                    nowHour++;
                } else {
                    nowHour = nowHour - 12;
                    hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
                    sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
                    nowHour = 1;
                }
            }

            // Get the shortForecast value from the first hour (the current hour)
            // This will be the condition keyword for setting the background image
            sessStore.setItem('shortForecast', data.properties.periods[0].shortForecast);
            
            // Call the buildPage function
            buildPage();
        })
        .catch(error => console.log('There was a getHourly error: ', error));
}

/* *************************************
 *  Build The Weather Page
 ************************************* */
function buildPage() {
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.querySelector('#title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(sessStore.getItem('fullName'));
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Preston, Idaho | The Weather Site  
    // Get the h1 to display the city location
    let contentHeading = document.querySelector('#contentHeading');
    contentHeading.innerHTML = sessStore.getItem('fullName');
    // The h1 in the main element should now say "Preston, Idaho"                  
    // Get the coordinates container for the location
    let latlon = document.querySelector('#latLong');
    console.log(latlon);
    latlon.innerHTML = sessStore.getItem('locale');
    console.log(latlon);
    // The latitude and longitude should match what was stored in session storage.
    // Get the condition keyword and set Background picture
    //changeSummaryImage(sessStore.getItem('shortForecast'));
    var cast = sessStore.getItem('shortForecast');
    var background = getKeyword(cast);
    changeSummaryBackground(background);
    /* Keep in mind that the value may be different than 
    what you need for your CSS to replace the image. You 
    may need to make some adaptations for it to work.*/

    // **********  Set the current conditions information  **********
    // Set the temperature information
    let highTemp = $('#currenthotdegree');
    let loTemp = $('#currentcolddegree');
    let currentTemp = $('#currentdegree');
    let feelTemp = $('#feels');
    highTemp.innerHTML = sessStore.getItem('high') + "°F";
    console.log(highTemp);
    loTemp.innerHTML = sessStore.getItem('low') + "°F";
    console.log(loTemp);
    currentTemp.innerHTML = sessStore.getItem('temperature') + "°F";
    console.log(currentTemp);
    // Set the wind information
    let speed = $('#speed');
    let gust = $('#gusts');
    speed.innerHTML = "Wind Speed: " + sessStore.getItem('windSpeed');
    console.log(speed);
    gust.innerHTML = "Gust: " + sessStore.getItem('windGust');
    console.log(gust);
    // Calculate feel like temp
    console.log(buildWC(39,5.1));
    feelTemp.innerHTML = "Feel like: " + buildWC(sessStore.getItem('windSpeed'), sessStore.getItem('temperature')) + "°F";
};

// **********  Set the Time Indicators  **********
//let nowDate = new Date();
console.log(now);
var currentHour = now.getHours();
console.log(currentHour);
let indicatorHour;
// If hour is greater than 12, subtract 12
if (currentHour > 12) {
 indicatorHour = currentHour - 12;
} else {
 indicatorHour = currentHour;
};
console.log(`Current hour in time indicator is: ${currentHour}`);
// Set the time indicator
timeIndicator(indicatorHour);


// ********** Hourly Temperature Component  **********
// Get the hourly data from storage as an array
let currentData = [];
let tempHour = currentHour;
// Adjust counter based on current time
for (let i = 0, x = 12; i < x; i++) {
 if (tempHour <= 23) {
  currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
  tempHour++;
 } else {
  tempHour = tempHour - 12;
  currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
  console.log(`CurrentData[i][0] is: ${currentData[i][0]}`);
  tempHour = 1;
 }
}
console.log(currentData);

// Loop through array inserting data
// Start with the outer container that matchs the current time
tempHour = currentHour;
for (let i = 0, x = 12; i < x; i++) {
 if (tempHour >= 13) {
  tempHour = tempHour - 12;
 }
 console.log(`Start container is: #temperatures o.${tempHour}`);
 $('#temperatures .o' + tempHour).innerHTML = currentData[i][0];
 tempHour++;
}

// ********** Hourly Wind Component  **********
// Get the hourly data from storage
let windArray = [];
let windHour = currentHour;
// Adjust counter based on current time
for (let i = 0, x = 12; i < x; i++) {
 if (windHour <= 23) {
  windArray[i] = currentData[i][1].split(" ");
  console.log(`windArray[i] is: ${windArray[i]}`);
  windHour++;
 } else {
  windHour = windHour - 12;
  windArray[i] = currentData[i][1].split(" ");
  windHour = 1;
 }
}
console.log(windArray);

// Insert Wind data
// Start with the outer container that matchs the time indicator
windHour = currentHour;
for (let i = 0, x = 12; i < x; i++) {
 if (windHour >= 13) {
  windHour = windHour - 12;
 }
 $('#wind .o' + windHour).innerHTML = windArray[i][0];
 windHour++;
}



// **********  Condition Component Icons  **********
let conditionHour = currentHour;
// Adjust counter based on current time
for (let i = 0, x = 12; i < x; i++) {
 if (conditionHour >= 13) {
  conditionHour = conditionHour - 12;
 }
 $('#conditions .o' + conditionHour).innerHTML = '<img src="' + currentData[i][2] + '" alt="hourly weather condition image">';
 conditionHour++;
}

//}
// Change the status of the containers
contentContainer.setAttribute('class', ''); // removes the hide class from main
statusContainer.setAttribute('class', 'hide'); // hides the status container

/* ************************************
Get Longitude and Latitude (Current Location)
*********************************** */
// Gets longitude and latitude of current location
function getGeoLocation() {
    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
      
         // Combine the values
         const locale = lat + "," + long;
         locStore.setItem("locale", locale);
         sessStore.setItem("locale", locale);
         console.log(`Lat and Long are: ${locale}.`);
         // Call getLocation function, send locale as a parameter
        getLocation(locale);

        })
       } 
       else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
       if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;

         // Combine the values for use later
         const locale = lat + "," + long;
         console.log(`Locale values are: ${locale}.`);
         // Store the values to session storage
         window.sessionStorage.setItem("locale", locale);
         window.sessionStorage.setItem("latitude", lat);
         window.sessionStorage.setItem("longitude", long);

        })
       } 
       else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
} //end getGeoLocation

/* ********************************
Get Location information
********************************* */
// Gets location information from the NWS API
function getLocation(locale) {
 const URL = "https://api.weather.gov/points/" + locale; 
 console.log(URL);
 locStore.setItem("URL", URL);
 // NWS User-Agent header (built above) is the second parameter 
 fetch(URL, idHeader) 
 .then(function(response){
   if(response.ok){ 
    return response.json(); 
   } 
   throw new ERROR('Response not OK.');
 })
 .then(function (data) { 
   // Let's see what we got back
   console.log('Json object from getLocation function:'); 
   console.log(data);
   // Store data to sessionStorage 
   window.sessionStorage.setItem("locName", data.properties.relativeLocation.properties.city); 
   window.sessionStorage.setItem("locState", data.properties.relativeLocation.properties.state);
   let fullName = data.properties.relativeLocation.properties.city + ", " + data.properties.relativeLocation.properties.state;
   window.sessionStorage.setItem("fullName", fullName); 

   // Store three URL's for stationId's, forecast and hourly forecast
   // The URL's are in the returned location data object
   window.sessionStorage.setItem("hourlyURL", data.properties.forecastHourly);
   window.sessionStorage.setItem("forecastURL", data.properties.forecast);
   let stationsURL = data.properties.observationStations;
   window.sessionStorage.setItem("stationsURL", stationsURL); 

   // Call the function to get the list of weather stations
   // using the URL for the weather station list
   getStationId(stationsURL); 
  }) 
 .catch(error => console.log('There was a getLocation error: ', error)) 
} // end getLocation function

/* ***************************************
Get Station ID
*************************************** */
// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(stationsURL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getStationId function:'); 
    console.log(data);
  
    // Store station ID and elevation (in meters - will need to be converted to feet) 
    let stationId = data.features[0].properties.stationIdentifier; 
    let stationElevation = data.features[0].properties.elevation.value; 
    console.log('Station and Elevation are: ' + stationId, stationElevation); 
    // You may want to convert the elevation to feet before storing the value
    // Store data to sessionStorage 
    window.sessionStorage.setItem("stationId", stationId); 
    window.sessionStorage.setItem("stationElevation", stationElevation); 
 
    // Request the Current Weather for this station 
    getWeather(stationId);
   }) 
  .catch(error => console.log('There was a getStationId error: ', error)) 
 } // end getStationId function

/* *******************************
Get weather info
******************************** */
 // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
  // This is the URL for current observation data 
  const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
  fetch(URL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getWeather function:'); 
    console.log(data);
  
    // Store current weather information to sessionStorage 
    sessStore.setItem("temperature", convertCelcius(data.properties.temperature.value));
    console.log(temperature);
    sessStore.setItem("windGust", data.properties.windGust.value);
    console.log(windGust);
    sessStore.setItem("windSpeed", data.properties.windSpeed.value);
    console.log(windSpeed);
    sessStore.setItem("feelsLike", buildWC(windSpeed, currTemp));
    console.log(feelsLike);

    // Call the getForecast function
    getForecast();
    // Call the getHourly function
    getHourly(storage.getItem('Hourly-URL'));
   }) 
  .catch(error => console.log('There was a getWeather error: ', error)) 
 } // end getWeather function


//GetForecast 
 function getForecast() {

    const foreCastURL = storage.getItem('Forecast-URL');
    console.log(foreCastURL);

    fetch(foreCastURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('Json object from getForecast function:');
            console.log(data);
            // Store data to localstorage 
            if (data.properties.periods[0].isDayTime == true) {
                sessStore.setItem("high", data.properties.periods[0].temperature);
                sessStore.setItem("low", data.properties.periods[1].temperature);
                locStore.setItem("high", data.properties.periods[0].temperature);
                locStore.setItem("low", data.properties.periods[1].temperature);
            } else {
                sessStore.setItem("low", data.properties.periods[0].temperature);
                sessStore.setItem("high", data.properties.periods[1].temperature);
                locStore.setItem("low", data.properties.periods[0].temperature);
                locStore.setItem("high", data.properties.periods[1].temperature);
            }
        })
        .catch(error => console.log('There was a getForecast error: ', error))

}

// converts meters to feet
function metersToFeet(meters) {
    return (meters * 3.281).toFixed(0);
    }
    
    // converts celsius to fahrenheit
    function convertCelcius(celsiusTemp) {
    return ((celsiusTemp * 9 / 5) + 32).toFixed(0);
    }
    
    // converts meters/sec to miles/hour
    function mmpsToMph(speed) {
    return (speed / 2.237).toFixed(1);
    }