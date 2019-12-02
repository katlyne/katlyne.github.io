"use strict";
//
// Geolocation Script
// 

var locStore = window.localStorage;
var sessStore = window.sessionStorage;
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

/* ************************************
Get Longitude and Latitude (Current Location)
*********************************** */
// Gets longitude and latitude of current location
function getGeoLocation() {
  const status = document.getElementById('status');
  status.innerHTML = 'Getting Location...';
  // Check if geolocation API is supported
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const locale = lat.toFixed(4) + "," + long.toFixed(4); // combine into locale 
       // Combine the values
       const locale = lat + "," + long;
       locStore.setItem("locale", locale);
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