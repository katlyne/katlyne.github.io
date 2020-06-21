"use strict";

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
var pageNav = $("#page-nav");

var reservationForm = $("#total");
var resresult = $("#resresult");
var reservationConfirmation = $("#reservation-confirmation");


// DOM event listner
document.addEventListener("DOMContentLoaded", function () {

  //functions to run go here!
  let URL = "/temple-inn/js/temple.json";
  fetchClosureData(URL);


});

function getcontact() {
  let name = $("#name");
  let email = $("#mail");
  let subject = $("#subject");
  let message = $("#msg");
  sessStore.setItem("name", name.value);
  sessStore.setItem("mail", mail.value);
  sessStore.setItem("subject", subject.value);
  sessStore.setItem("msg", message.value);
  console.log(`getContact(): Successfully stored the contact form data into session storage.`);
}

/* ********************************
      Reservation
********************************** */

function processReservationData() {
  let reservation = {
    temple: $("#chosetemple").value,
    checkIn: $("#inDate").value,
    checkOut: $("#outDate").value,
    roomType: $("#room").value,
    numberRooms: $("#numberroom").value,
    wish: $("#wish").value,
    firstName: $("#fname").value,
    lastName: $("#lname").value,
    emailAddress: $("#emailaddress").value,
    phoneNumber: $("#phonenumber").value,
    country: $("#country").value,
    state: $("#state").value
  }
  console.log(`Value of reservation object:`);
  console.log(reservation);

  sessStore.setItem("reservation", JSON.stringify(reservation)); // store to session storage
}
/*
function storage() {
  sessStore("temple: ", $("#chosetemple").value);
  sessStore("checkIn: ", $("#inDate").value);
  sessStore("checkOut: ", $("#outDate").value);
  sessStore("roomType: ", $("#room").value);
  sessStore("numberRooms: ", $("#numberroom").value);
  sessStore("wish: ", $("#wish").value);
  sessStore("firstName: ", $("#fname").value);
  sessStore("lastName: ", $("#lname").value);
  sessStore("emailAddress: ", $("#emailaddress").value);
  sessStore("phoneNumber: ", $("#phonenumber").value);
  sessStore("country: ", $("#country").value);
  sessStore("state: ", $("#state").value);
}
*/
function buildReservConf() {
  let reservation = JSON.parse(sessStore.getItem("reservation"));
  console.log("Value of JSON parsed from session storage: ");
  console.log(reservation);

  // build confirmation
  let roomType;
  switch (reservation.roomType) {
    case "bed1":
      roomType = "Regular room & one King Bed";
      break;
    case "bed2":
      roomType = "Regular room & One Queen Bed";
      break;
    case "room1":
      roomType = "Room with Kitchenette & One King Bed";
      break;
    case "room2":
      roomType = "Room with Kitchenette & One Queen Bed";
      break;
    case "suite1":
      roomType = "Suite with Kitchenette, One King Bed & balcony";
    case "suite2":
      roomType = "Suite with Kitchenette, One Queen Bed & balcony";
  }
  console.log(`Reserved room type: ${roomType}`);
  $("#reservation").innerHTML = reservation;
  $("#nameconf").innerHTML = "Name: " + reservation.sessStore.getItem("firstName") + " " + sessStore.getItem("lastName");
  $("#confemail").innerHTML = "Email Address: " + sessStore.getItem("emailAdress");
  $("#conftel").innerHTML = "Phone Number: " + reservation.phoneNumber;
  $("#confloc").innerHTML = "Country and State: " + reservation.state + ", " + reservation.country;
  $("#conftemple").innerHTML = "Hotel Location: " + reservation.location;
  $("#checkinconf").innerHTML = "Check-in Date: " + reservation.checkIn;
  $("#checkoutconf").innerHTML = "Check-out Date: " + reservation.checkOut;
  $("#confroom").innerHTML = "Room type: " + reservation.RoomType;
  $("#confnumberrooms").innerHTML = "Number of Rooms: " + reservation.numberRooms;
  $("#confwish").innerHTML = "Special Accomodations/Comments: " + reservation.wish;

  console.log("Set value of reservation confirmation");

  resresult.classList.add("hide");
  reservationConfirmation.classList.remove("hide");

  console.log("Hid reservation status, showing confirmation.");

}

function fetchClosureData(URL) {
  fetch(URL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR("Response not OK.");
    })
    .then(function (data) {
      console.log("getClosureData(): Data returned from URL:");
      console.log(data);

      // identify data
      let tahitiClosures = JSON.stringify(data.tahiti.closure);
      let parisClosures = JSON.stringify(data.paris.closure);
      let frankfurtClosures = JSON.stringify(data.frankfurt.closure);
      let bernClosures = JSON.stringify(data.bern.closure);

      // store to session storage
      sessStore.setItem("tahitiClosures", tahitiClosures);
      sessStore.setItem("parisClosures", parisClosures);
      sessStore.setItem("frankfurtClosures", frankfurtClosures);
      sessStore.setItem("bernClosures", bernClosures);
      displayClosureData(); // run displayClosureData function
    })
    .catch(error => console.log("fetchClosureData(): There was an errro: ", error));
}

function displayClosureData() {
  let tahitiClosures = JSON.parse(sessStore.getItem("tahitiClosures"));
  console.log(`Tahiti closures are:`);
  console.log(tahitiClosures);
  let parisClosures = JSON.parse(sessStore.getItem("parisClosures"));
  console.log(`Paris closures are:`);
  console.log(parisClosures);
  let frankfurtClosures = JSON.parse(sessStore.getItem("frankfurtClosures"));
  console.log(`Frankfurt closures are: `);
  console.log(frankfurtClosures);
  let bernClosures = JSON.parse(sessStore.getItem("bernClosures"));
  console.log(`Bern closures are: `);
  console.log(bernClosures);
  /*
  makeULFromArray(tahitiClosures, "tahiti-closure-schedule");
  makeULFromArray(parisClosures, "paris-closure-schedule");
  makeULFromArray(frankfurtClosures, "frankfurt-closure-schedule");
  makeULFromArray(bernClosures, "bern-closure-schedule");
  console.log("Completed building lists of closure data.");
  */
}

/*
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
  */