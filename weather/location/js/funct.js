'use strict';

//New Functions
var pagenav = document.querySelector('#nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-container');
var locStore = window.localStorage;
var sessStore = window.sessionStorage;

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
    let weatherURL = "/weather/location/js/idahoweather.json";
    fetchWeatherData(weatherURL);

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

/* ****************************************
 *   Fetch data
 ***************************************** */
function fetchWeatherData(weatherURL) {
    let cityName = title.dataset.city // "soda-springs"'Preston'; // The data we want from the weather.json file
    console.log(cityName);
    fetch(weatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            //Check the data objet that was retrieved
            console.log(data);
            // data is the full JavaScript object, but we only want the preston part shorten the variable and focus only on the data we want to reduce typing
            let p = data[cityName];

            // ***********    Get the location information    **************
            let locName = p.properties.relativeLocation.properties.city;
            console.log(locName);
            let locState = p.properties.relativeLocation.properties.state;
            // Put them togather
            let fullName = locName + ', ' + locState;
            // See if it worked, using ticks around the content in the log
            console.log(`fullName is: ${fullName}`);
            // Get the longitude and latitude and combine them to a comma separated single string
            let latLong = p.properties.relativeLocation.geometry.coordinates[1] + "," + p.properties.relativeLocation.geometry.coordinates[0];
            console.log(latLong);
            // Create a JSON object containing the full name, latitude and longitude and store it into local storage.
            const prestonData = JSON.stringify({
                fullName,
                latLong 
            });
            locStore.setItem("Preston, ID", prestonData);
            // ********** Get the current conditions information  ***********
            // As the data is extracted from the JSON, store it into session storage
            sessStore.setItem("fullName", fullName);
            sessStore.setItem("latLong", latLong);
            console.log(latLong);
            // Get the temperature data
            const prestontemp = p.properties.relativeLocation.properties.temperature;
            console.log(prestontemp);
            const phightemp = p.properties.relativeLocation.properties.highTemp;
            console.log(phightemp);
            sessStore.setItem("phightemp", phightemp);
            const plowtemp = p.properties.relativeLocation.properties.lowTemp;
            console.log(plowtemp);
            sessStore.setItem("plowtemp", plowtemp);
            //const prestontemp = JSON.stringify({temperature});
            sessStore.setItem("prestontemp", prestontemp);
            // Get the wind data
            const pwindspeed = p.properties.relativeLocation.properties.windSpeed;
            console.log(pwindspeed);
            sessStore.setItem("pwindspeed", pwindspeed);
            const pwindgust = p.properties.relativeLocation.properties.windGust;
            console.log(pwindgust);
            sessStore.setItem("pwindgust", pwindgust);
            // Get the hourly data using another function - should include the forecast temp, condition icons and wind speeds. The data will be stored into seesion storage.
            getHourly(p.properties.forecastHourly);
        })
        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
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
    latlon.innerHTML = sessStore.getItem('latLong');
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
    highTemp.innerHTML = sessStore.getItem('phightemp') + "°F";
    console.log(highTemp);
    loTemp.innerHTML = sessStore.getItem('plowtemp') + "°F";
    console.log(loTemp);
    currentTemp.innerHTML = sessStore.getItem('prestontemp') + "°F";
    console.log(currentTemp);
    // Set the wind information
    let speed = $('#speed');
    let gust = $('#gusts');
    speed.innerHTML = "Wind Speed: " + sessStore.getItem('pwindspeed');
    console.log(speed);
    gust.innerHTML = "Gust: " + sessStore.getItem('pwindgust');
    console.log(gust);
    // Calculate feel like temp
    console.log(buildWC(39,5.1));
    feelTemp.innerHTML = "Feel like: " + buildWC(sessStore.getItem('pwindspeed'), sessStore.getItem('prestontemp')) + "°F";
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



