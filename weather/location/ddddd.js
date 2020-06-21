
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

/* ********************************
Get Location information
********************************* */
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
   let locName = data.properties.relativeLocation.properties.city;
   window.sessionStorage.setItem("locName", data.properties.relativeLocation.properties.city); 
   let locState = data.properties.relativeLocation.properties.state;
   window.sessionStorage.setItem("locState", data.properties.relativeLocation.properties.state);
   let fullName = locName + ", " + locState;
   window.sessionStorage.setItem("fullName", fullName); 
   console.log(`getLocation(): value of location: ${fullName}`);

// Create info for localStorage
   let coords = sesStor.getItem("latLong");
   let locationPayload = JSON.stringify({fullName,coords});
   window.localStorage.setItem(location, locationPayload);


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
    let currTemp = convertCelcius(data.properties.temperature.value);
    console.log(`get Weather(): The value of currTemp is: ${currTemp}`);
    window.sessionStorage.setItem("currTemp", currTemp);
    // get windspeed, log & store to session storage
    let windSpeed = mpsToMph(data.properties.windSpeed.value);
    console.log(`getWeather(): the value of windSpeed is: ${windSpeed}`);
    sesStor.setItem("windSpeed", windSpeed);
    let windGust = mpsToMph(data.properties.windGust.value);
    console.log(`getWeather(): the value of windGust is: ${windGust}`);
    window.sessionStorage.setItem("windGust", data.properties.windGust.value);
    window.sessionStorage.setItem("feelsLike", buildWC(windSpeed, currTemp));
    window.sessionStorage.setItem("condition", data.properties.textDescription);

 
    // Call the getForecast function
    getForecast(sesStor.getItem("forecastURL"));
    // Call the getHourly function
    getHourly(sesStor.getItem("forecastHourlyURL"));
   }) 
  .catch(error => console.log('There was a getWeather error: ', error)) 
 } // end getWeather function
 
 function getForecast(URL) {
  fetch(URL, idHeader)
  .then(function(response){
    if(response.ok){
      return response.json();
    }
    throw new ERROR("Response not OK.")
  })
  .then(function (data) {
    console.log("getForecast(): From getForecast function:");
    console.log(data); // log data returned from NWS API

    // Extract & store highTemp
    let highTemp = data.properties.periods[0].temperature;
    console.log(`getForecast(): Value of highTemp is: ${highTemp}`);
    sesStor.setItem("highTemp", highTemp);

    // Extract & store lowTemp
    let lowTemp = data.properties.periods[1].temperature;
    console.log(`getForecast(): Value of lowTemp is: ${lowTemp}`);
    sesStor.setItem("lowTemp", lowTemp);

  })
 }

 // converts meters to feet
function metersToFeet(meters) {
  return (meters * 3.281).toFixed(0);
}

// converts celsius to fahrenheit
function celsiusToFahrenheit(celsiusTemp) {
  return ((celsiusTemp * 9/5) + 32).toFixed(0);
}

// converts meters/sec to miles/hour
function metersPerSecondToMph (speed) {
  return (speed / 2.237).toFixed(1);
}