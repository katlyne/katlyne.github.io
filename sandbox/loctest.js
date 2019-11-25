'use strict';

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
     "User-Agent": "Student Learning Project - yourschoolemailaddress@byui.edu"
    }
   };

// Call the function to get our location
getGeoLocation();
var sessStore = window.sessionStorage;
var storage = window.localStorage;


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
         storage.setItem("locale", locale);
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

      // Gets location information from the NWS API
function getLocation(locale) {
 const URL = "https://api.weather.gov/points/" + locale; 
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