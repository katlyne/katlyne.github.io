'use strict';

//New Functions
var pagenav = document.querySelector('#nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-container');

// We also could have write it like this:

// var pagenav = document.getElementById('nav');
// var statusContainer = document.getElementById('status');
// var contentContainer = document.getElementById('main-container');




//var $ = document.querySelector();
//var $$ = document.querySelectorAll();


// A collection of functions for the weather page
document.addEventListener("DOMContentLoaded", function(){
    
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
    let hour='10';
    timeBall(hour);
    console.log(timeBall);

    //Implement the weather backround image
    let weather= "clouds";
    console.log(weather);
    changeSummaryImage(weather);

    //Get weather json data
    let weatherURL = "/weather/location/js/idahoweather.json";
    fetchWeatherData(weatherURL);

});


//date
function lastModified() {
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthArray = ["January", "February", "March", "Arpil", "May", "June", "July", "August", "September", "October", "November", "December"];
    let lastMod = new Date(document.lastModified);
    const dayName = dayArray[lastMod.getDay()];
    const monthName = monthArray[lastMod.getMonth()];
    const formattedDate = dayName+", "+lastMod.getDate() + " "+monthName+', '+lastMod.getFullYear();
    document.querySelector("#lastModified").innerText = formattedDate;
    console.log(lastModified);
};
// menu button
function toggleMenu() {
	document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

   // Time Ball Indicator
   function timeBall(hour){
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
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16)+ 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(`The wind chill is: ${wc}`); // log wc to console

    //Round the answer down to integer
    wc = Math.floor(wc);

    //If chills is greater than temp, return temp
    wc = (wc < temp) ? temp : wc;
    console.log(`The wind chill is: ${wc}`);
    feelTemp.innerHTML = wc;
    //wc = 'Feels like '+wc+' °F';
    windchill.innerHTML = wc+' °F';
}



/* *********************************************
*   Handle Weather Summary Background Image
************************************************ */
function changeSummaryImage(weather){
    let w = document.getElementById('currweather');
    weather = weather.toLowerCase();
    console.log(weather);
    switch(weather) {
        case "clear":
            w.className ="";
            w.className += 'clear';
        break;
        case "fog":
            w.className ="";
            w.className += 'fog';
        break;
        case "rain":
            w.className ="";
            w.className += 'rain';
        break;
        case "snow":
            w.className ="";
            w.className += 'snow';
        break;
        case "clouds":
            w.className ="";
            w.className += 'clouds';
        break;
    }

}

/* ****************************************
*   Fetch data
***************************************** */
function fetchWeatherData(weatherURL) {
    let cityName = 'Preston'; // The data we want from the weather .json file
    fetch(weatherURL)
    .then(function(response) {
        if(response.ok) {
            return response .json();
        }
        throw new ERROR('Network response was not OK.');
    })
    .then(function(data){
        //Check the data objet that was retrieved
        console.log(data);
        // data is the full JavaScript object, but we only want the preston part
        //shorten the variable and focus only on the data we want to reduce typing
        let p = data[cityName];

        // ***********  Get the location information    **************
        let cityName = p.City
        let currState = p.State;
        // Put them togather
        let fullName = cityName+', '+currState;
        // See if it worked, using ticks around the content in the log
        console.log('fullName is: ${fullName}');
        // Get the longitude and latitude and combine them to a comma separated single string
        const latLong = p.properties.relativeLocation.geometry.coordinate[1] + ","+p.properties.relativeLocation.geometry.coordinates[0];
        console.log(latLong);
        // Create a JSON object containing the full name, latitude and longitude and store it into local storage.

        // ********** Get the current conditions information    ***********
        // As the data is extracted from the JSON, store it into session storage
        const prestonDatoa = JSON.stringify({fullName, latLong});
        locStore.setItem("Preston, ID", prestonData);
        // Get the temperature data


        // Get the wind data


        // Get the hourly data using another function - should include the forecast temp, condition icons and wind speeds. The data will be stored into seesion storage.
    })
    .catch(function(error){
        console.log('There was a fetch problem: ', error.message);
        statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
}

