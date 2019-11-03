'use strict';

// $ = document.querySelector();
// $$ = document.querySelectorAll();


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

    //Implement the time Ball()
    let hour='4';
    timeBall(hour);

    //Implement the weather backround image
    let currweather= "clouds"
    changeSummaryImage(currweather);

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
function changeSummaryImage(currweather){
    let w = document.getElementById('currweather');
    console.log(currweather);
    switch(currweather) {
        case "clear":
            w.className += 'clear';
        break;
        case "fog":
             w.className += 'fog';
        break;
        case "rain":
             w.className += 'rain';
        break;
        case "snow":
             w.className += 'snow';
        break;
        case "clouds":
             w.className += 'clouds';
        break;
    }

}


