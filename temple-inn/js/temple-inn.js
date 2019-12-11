'use strict';
/********************************
 Navigation
 ****************************** */
// menu button
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
    }

    var slideIndex = 0;
    showSlides();
    
    function showSlides() {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}
      slides[slideIndex-1].style.display = "block";
      setTimeout(showSlides, 4000); // Change image every 2 seconds
    }

    //Work with small screen menu
const menuButton = document.querySelector("#menuBtn");
menuButton.addEventListener('click', menuButton);

/* *********************************************
    Reservation page
  ******************************************** */
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector('#submit').addEventListener("click", processData);
})

let reservations = [];
let processData = (event) => {
  // stop the form from submitting
  event.preventDefault();
  let reservation = {
  guests: document.querySelector('#guests').value,
  resDate: document.querySelector('#resDate').value
  }
// adds reservation to the end of the array of all reservations
reservations.push(reservation);
// reset the first, and only, form
document.forms[0].reset;
// see results in console
console.log('newRes', {reservations});


  // Store to session Storage
  window.sessionStorage.setItem("reservations", JSON.stringify(reservations));
  // Retrieve from session storage
  let resList = JSON.parse(window.sessionStorage.getItem("reservations"));
  console.log(resList);
  
  // inject to the page
const resDetails = document.querySelector("#resResult pre");
resDetails.textContent = "\n" + JSON.stringify(reservations, "\t", 2);
  
// display the results
document.querySelector("#resResult").classList.remove("hide");

}