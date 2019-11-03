'use strict';

// A collection of functions for the weather page
document.addEventListener("DOMContentLoaded", function(){
    //Call the modified date function
    buildModDate();

//Work with small screen menu
const menuButton = document.querySelector("#menuBtn");
menuButton.addEventListener('click', menuButton);

//Use the wind chill function
    let speed = 25;
    let temp = 10;
    let feelTemp = document.getElementById('feelTemps');
    feelTemp.innerHTML = buildWC(speed, temp);

//Implement the time indicator
lethour='6';
timeIndicator(hour);

//Implement the weather backround image
let currCond = ""
changeSummaryImage(currCond);

});
//date
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
    let feelTemp = document.getElementById('feelTemp');

    //Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16)+ 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    //Round the answer down to integer
    wc = Math.floor(wc);

    //If chills is greater than temp, return temp
    wc = (wc < temp) ? temp : wc;

    //Display the windchill
    console.log(wc);
    //wc = 'Feels like '+wc+' °F';
    feelTemp.innerHTML = wc;
}


/* *********************************************
*   Handle Weather Summary Background Image
************************************************ */
function changeSummaryImage(currCond)


