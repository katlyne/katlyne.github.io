"use strict";

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
var pageNav = $("#page-nav");

var reservationForm = $("#reservation-form-container");
var reservationStatus = $("#reservation-status");
var reservationConfirmation = $("#reservation-confirmation");
var collapsibleElement = $$(".collapsible")
var currentPage = $("#page-title").getAttribute("data-currentpage");

// DOM event listner
document.addEventListener("DOMContentLoaded", function(){

  //functions to run go here!
  if (currentPage == "confirmation") {
    buildReservConf();
  }
  if (currentPage == "temples") {
  let URL = "/temple-inn/js/temple.json";
  fetchClosureData(URL);
  }

});
function getContactFormData() {
    let Name = $("#name");
    let emailAddress = $("#emailaddress");
    let subject = $("#subject");
    let message = $("#message");
    sesStor.setItem("contact-fullName", fullName.value);
    sesStor.setItem("contact-emailAddress", emailAddress.value);
    sesStor.setItem("contact-subject", subject.value);
    sesStor.setItem("contact-message", message.value);
    console.log(`getContactFormData(): Successfully stored the contact form data into session storage.`);
  }
  
  function processReservationData() {
    let reservation = {
      location: $("#").value,
      checkInDate: $("#checkin").value,
      checkOutDate: $("#checkout").value,
      roomType: $("#res-room-type").value,
      numberOfRooms: $("#res-num-of-rooms").value,
      additionalComments: $("#res-additional-comments").value,
      firstName: $("#res-first-name").value,
      lastName: $("#res-last-name").value,
      emailAddress: $("#res-email-address").value,
      phoneNumber: $("#res-phone-number").value,
      country: $("#res-country").value,
      state: $("#res-state").value
    }
    console.log(`Value of reservation object:`);
    console.log(reservation);
  
    sesStor.setItem("reservation", JSON.stringify(reservation)); // store to session storage
  }
  
  function buildReservConf() {
    let reservation = JSON.parse(sesStor.getItem("reservation"));
    console.log("Value of JSON parsed from session storage: ");
    console.log(reservation);
  
    // build confirmation
    let roomType;
    switch (reservation.roomType) {
      case "bed1":
        roomType = "One King Bed, Regular room";
        break;
      case "bed2":
        roomType = "Two Queen Beds, Regular room";
        break;
      case "suite1":
        roomType = "One Queen Bed, Suite with Kitchenette";
        break;
      case "suite2":
        roomType = "One King Bed, Suite with Kitchenette";
        break;
        case "suite3":
        roomType = "One King Bed, Suite with Kitchenette and balcony";
        case "suite4":
        roomType = "One Queen Bed, Suite with Kitchenette and balcony";     
    }
    console.log(`Reserved room type: ${roomType}`);
  
    $("#conf-name").innerHTML = "Name: " + reservation.firstName + " " + reservation.lastName;
    $("#conf-email-address").innerHTML = "Email Address: " + reservation.emailAddress;
    $("#conf-phone-number").innerHTML = "Phone Number: " + reservation.phoneNumber;
    $("#conf-country-state").innerHTML = "Country and State: " + reservation.state + ", " + reservation.country;
    $("#conf-location").innerHTML = "Hotel Location: " + reservation.location;
    $("#conf-check-in").innerHTML = "Check-in Date: " + reservation.checkInDate;
    $("#conf-check-out").innerHTML ="Check-out Date: " + reservation.checkOutDate;
    $("#conf-room-type").innerHTML = "Room type: " + reservedRoomType;
    $("#conf-number-of-rooms").innerHTML = "Number of Rooms: " + reservation.numberOfRooms;
    $("#conf-additional-comments").innerHTML = "Additional Comments: " + reservation.additionalComments;
  
    console.log("Set value of reservation confirmation");
  
    reservationStatus.classList.add("hide");
    reservationConfirmation.classList.remove("hide");
  
    console.log("Hid reservation status, showing confirmation.");
  
  }
  
  function fetchClosureData(URL) {
    fetch(URL)
    .then(function(response){
      if (response.ok){
        return response.json();
      }
      throw new ERROR("Response not OK.");
    })
    .then(function(data){
      console.log("getClosureData(): Data returned from URL:");
      console.log(data);
      
      // identify data
      let rexburgClosures = JSON.stringify(data.rexburg.closureList);
      let provoClosures = JSON.stringify(data.provo.closureList);
      let atlantaClosures = JSON.stringify(data.atlanta.closureList);
      let dallasClosures = JSON.stringify(data.dallas.closureList);
  
      // store to session storage
      sesStor.setItem("rexburgClosures", rexburgClosures);
      sesStor.setItem("provoClosures", provoClosures );
      sesStor.setItem("atlantaClosures", atlantaClosures);
      sesStor.setItem("dallasClosures", dallasClosures);
      displayClosureData(); // run displayClosureData function
    })
    .catch(error => console.log("fetchClosureData(): There was an errro: ", error));
  }
  
  function displayClosureData() {
    let provoClosures = JSON.parse(sesStor.getItem("provoClosures"));
    let rexburgClosures = JSON.parse(sesStor.getItem("rexburgClosures"));
    let atlantaClosures = JSON.parse(sesStor.getItem("atlantaClosures"));
    let dallasClosures = JSON.parse(sesStor.getItem("dallasClosures"));
    
    makeULFromArray(provoClosures, "provo-closure-schedule");
    makeULFromArray(rexburgClosures, "rexburg-closure-schedule");
    makeULFromArray(atlantaClosures, "atlanta-closure-schedule");
    makeULFromArray(dallasClosures, "dallas-closure-schedule");
    console.log("Completed building lists of closure data.");
  }
  
  function makeULFromArray (sourceArray, destination) {
    let containerId = "#" + destination; // build query selector for destination
    let listContainer = $(containerId); // set list container
    console.log(`List container is:`);
    console.log(listContainer);
    // create li with contents of array for every element in sourceArray
    for (let i = 0; i < sourceArray.length; i++) {
      let item = document.createElement("li");
      item.appendChild(document.createTextNode(sourceArray[i]));
      listContainer.appendChild(item);
      console.log(`Appended ${item} to ${listContainer}`);
    }
  }