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




//var $ = document.querySelector();
//var $$ = document.querySelectorAll();


// A collection of functions for the weather page
document.addEventListener("DOMContentLoaded", function () {

    //Call the modified date function
    lastModified();

    //Work with small screen menu
    //const menuButton = document.querySelector("#menuBtn");
    // menuButton.addEventListener('click', menuButton);

    //Use the wind chill function
    let speed = 25;
    let temp = 10;
    buildWC(speed, temp);
    console.log(windchill);

    //Implement the time Ball()
    let hour = '10';
    timeBall(hour);
    console.log(timeBall);

    //Implement the weather backround image
    let weather = "clouds";
    console.log(weather);
    changeSummaryImage(weather);

    //Get weather json data
    let weatherURL = "/weather/location/js/idahoweather.json";
    fetchWeatherData(weatherURL);

});

/* ****************************************
 *   Fetch data
 ***************************************** */
function fetchWeatherData(weatherURL) {
    let cityName = 'Preston'; // The data we want from the weather .json file
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
            const latLong = p.properties.relativeLocation.geometry.coordinates[1] + "," + p.properties.relativeLocation.geometry.coordinates[0];
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
            sessStore.setItem("prestontemp", prestontemp)
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
    let contentHeading = document.querySelector('#siteName');
    contentHeading.innerHTML = sessStore.getItem('fullName');
    // The h1 in the main element should now say "Preston, Idaho"                  
    // Get the coordinates container for the location
    let latlon = document.querySelector('#latLon');
    latLon.innerHTML = sessStore.getItem('latLong');
    // The latitude and longitude should match what was stored in session storage.
    // Get the condition keyword and set Background picture
    changeSummaryImage(sessStore.getItem('shortForecast'));
    /* Keep in mind that the value may be different than 
    what you need for your CSS to replace the image. You 
    may need to make some adaptations for it to work.*/

    // **********  Set the current conditions information  **********
    // Set the temperature information
    let highTemp = $('#hiTemp');
    let loTemp = $('#loTemp');
    let currentTemp = $('#currentTemp');
    let feelTemp = $('#feelTemp');
    highTemp.innerHTML = sessStore.getItem('highTemp') + "°F";
    loTemp.innerHTML = sessStore.getItem('lowTemp') + "°F";
    currentTemp.innerHTML = sessStore.getItem('temperature') + "°F";
    // Set the wind information
    let speed = $('#speed');
    let gust = $('#gusting');
    speed.innerHTML = sessStore.getItem('windSpeed');
    gust.innerHTML = sessStore.getItem('windGust');
    // Calculate feel like temp
    feelTemp.innerHTML = buildWC(sessStore.getItem('windSpeed'), sessStore.getItem('temperature')) + "°F";
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
        .catch(error => console.log('There was a getHourly error: ', error))
}

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

// Time Ball Indicator
function timeBall(hour) {
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
    let feelTemp = document.getElementById("windchill");

    //Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(`The wind chill is: ${wc}`); // log wc to console

    //Round the answer down to integer
    wc = Math.floor(wc);

    //If chills is greater than temp, return temp
    wc = (wc < temp) ? temp : wc;
    console.log(`The wind chill is: ${wc}`);
    feelTemp.innerHTML = wc;
    //wc = 'Feels like '+wc+' °F';
    windchill.innerHTML = wc + ' °F';
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