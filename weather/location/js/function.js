'use strict';
var pageNav = document.querySelector('#nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-container');
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
var body = document.querySelector('#body');
let feelTemp = document.getElementById('feelTemp');
let title = document.getElementById('page-title')
/* *************************************
*  Weather Site JavaScript Functions
************************************* */

 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);

// Listen for the DOM to finish building
/*document.addEventListener("DOMContentLoaded", function(){
    /*buildModDate();
    const menuButton = document.querySelector("#menuBtn");
  menuButton.addEventListener('click',toggleMenu);*/
//variables for wind chill
/*let temp = 31;
let speed = 5;
buildWC(speed,temp);*/


console.log('My javascript is being read.');


//Function for showing the date//

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

document.getElementById("todaysdate").innerHTML=day + ", " + date + " " + month + " " +
    year;


console.log(day + month + date + year);

//Last Modified//
document.addEventListener("DOMContentLoaded", function(){
    let lastMod = document.lastModified;
    document.getElementById("modDate").innerHTML = lastMod;
    // The Time Indictor function
/*let hour="7";
timeBall(hour);
*/

//Changing the background
/*let currCond= "clear";
changeSummaryBackground(currCond);*/

//Get weather json data
let weatherURL = "/weather/js/idahoweather.json";
fetchWeatherData(weatherURL);

});
    /*WebFont.load({
        google: {
          families: [
             'Montserrat'
          ]
        }
      });*/

       // Calculate the Windchill
function buildWC(speed, temp) {
    
   
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
   
    // Round the answer down to integer
    wc = Math.floor(wc);
   
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
   
    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    return wc;
    }

    // Time Indicator Function
    function timeIndicator(hour){
    // Find all "ball" classes and remove them
    let x = document.querySelectorAll(".ball");
    for (let item of x) {
        console.log(item);
        item.classList.remove("ball");
    }
    
    // Find all hours that match the parameter and add the "ball" class
    let hr = document.querySelectorAll(".i"+hour);
    for (let item of hr){
        item.classList.add("ball");
    }
}

//Changing the background function
function changeSummaryImage(currCond) {
    console.log(`Value of currCond: ${currCond}`);
  let condition = (currCond.toLowerCase()).trim(); // standardize input
  console.log(`Value of condition: ${condition}`);
  let conditionIndex = 0; // set condition index to 0
  console.log(`Value of conditionIndex: ${conditionIndex}`);
  // determine available width
  let width = window.innerWidth;
  console.log(`Screen Width: ${width}`);
   // check if screen is tablet or desktop widths and adjust starting point for condition index
   if (width > 475 && width <= 800) {
    conditionIndex += 5;
    console.log(`Updated value of conditionIndex: ${conditionIndex}`);
  /*else if (width > 800) {
    conditionIndex += 10*/
  }

  // store paths to specific width images
  const imgURLS = ["/clear400.jpg", "/clouds400.jpg", "/fog400.jpg", "/rain400.jpg", "/snow400.jpg",
                  "/clear600.jpg", "/clouds600.jpg", "/fog600.jpg", "/rain600.jpg", "/snow600.jpg", 
                   ];
  // rest of directory structure
  const imgDirPrefix = "url(/weather/images";
  const imgDirPostfix = ")"

  // update condition index based on weather status
  let weather = "";
  if (condition.includes("sun")|| condition.includes("clear")){weather = "clear";}
  else if (condition.includes("cloud")) {weather="cloudy";console.log(weather);}
  else if (condition.includes("fog")) {weather="fog";}
  else if (condition.includes("rain")) {weather="rain";}
  else if (condition.includes("snow")) {weather="snow";}
  console.log(weather);
  switch (weather) {
    case "clear":
      body.classList.add("clear");
      break;
    case "cloudy":
        body.classList.add("cloud");
      break;
    case "fog":
        body.classList.add("fog");
      break;
    case "rain":
        body.classList.add("rain");
      break;
    case "snow":
        body.classList.add("snow");
      break;
    default:
      console.log("Error: Weather type is invalid.")
      break;
  }
  console.log(`Value of conditionIndex: ${conditionIndex}`);
  
  // build image url() CSS variable
  /*let imageURL = imgDirPrefix + imgURLS[conditionIndex] + imgDirPostfix;
  console.log(`imageURL is: ${imageURL}`);*/

  // set background image
  //const backgroundImg = document.body.style; // used to access css
  // console.log(`backgroundImg: ${backgroundImg}`);
 // backgroundImg.setProperty("--dynamic-weather-background", `${imageURL}`); 
  //console.log(`${imageURL} has been set as the background.`);
}


/* *************************************
*  Fetch Weather Data
************************************* */
function fetchWeatherData(weatherURL){
  let cityName = title.dataset.city // "soda-springs"'Preston'; // The data we want from the weather.json file
  console.log(cityName);
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the preston part
    // shorten the variable and focus only on the data we want to reduce typing
    let p = data[cityName];


    // **********  Get the location information  **********
    let locName = p.properties.relativeLocation.properties.city;
    let locState = p.properties.relativeLocation.properties.state;
    let highTemp = p.properties.relativeLocation.properties.highTemp;
    let lowTemp = p.properties.relativeLocation.properties.lowTemp;
    let windGust = p.properties.relativeLocation.properties.windGust;
    let windSpeed = p.properties.relativeLocation.properties.windSpeed;
    let temperature = p.properties.relativeLocation.properties.temperature;



    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked, using ticks around the content in the log
    console.log(`fullName is: ${fullName}`);
    // Get the longitude and latitude and combine them to
    const latLong = p.properties.relativeLocation.geometry.coordinates[1] + ","+ p.properties.relativeLocation.geometry.coordinates[0];
    console.log(latLong);
    // a comma separated single string
    const prestonData = JSON.stringify({fullName,latLong});
    locStore.setItem("Preston,ID", prestonData);
    // Create a JSON object containing the full name, latitude and longitude
    // and store it into local storage.


    // **********  Get the current conditions information  **********
    // As the data is extracted from the JSON, store it into session storage
    sessStore.setItem("fullName",fullName);
    sessStore.setItem("latLong",latLong);
    // Get the temperature data
    sessStore.setItem("temperature",temperature);
    sessStore.setItem("highTemp",highTemp);
    sessStore.setItem("lowTemp",lowTemp);
    // Get the wind data 
    sessStore.setItem("windGust",windGust);
    sessStore.setItem("windSpeed",windSpeed);

    // Get the hourly data using another function - should include the forecast temp, condition icons and wind speeds. The data will be stored into session storage.
    getHourly(p.properties.forecastHourly);

  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}
var weatherURL="../js/idahoweather.json";
fetchWeatherData(weatherURL);

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
 /* ************************************
*  Build the Weather page
************************************* */
function buildPage() {
// Set the title with the location name at the first
 // Gets the title element so it can be worked with
 let pageTitle = document.querySelector('#page-title');
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
 let latLon = document.querySelector('#latLon');
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
console.log(buildWC(39,5.1));
feelTemp.innerHTML = buildWC(sessStore.getItem('windSpeed'), sessStore.getItem('temperature')) + "°F";
// **********  Set the Time Indicators  **********
let thisDate = new Date();
var currentHour = thisDate.getHours();
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
 console.log(`Start container is: #temps o.${tempHour}`);
 $('#temps .o' + tempHour).innerHTML = currentData[i][0];
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
 $('#winds .o' + windHour).innerHTML = windArray[i][0];
 windHour++;
}
// **********  Condition Component Icons  **********
let conditionHour = currentHour;
// Adjust counter based on current time
for (let i = 0, x = 12; i < x; i++) {
 if (conditionHour >= 13) {
  conditionHour = conditionHour - 12;
 }
 $('#condition .o' + conditionHour).innerHTML = 
 '<img src="' + currentData[i][2] + '" alt="hourly weather condition image">';
 conditionHour++;
}
// Change the status of the containers
contentContainer.setAttribute('class', ''); // removes the hide class from main
statusContainer.setAttribute('class', 'hidden'); // hides the status container
}