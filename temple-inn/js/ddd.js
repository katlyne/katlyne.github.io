"use strict";

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
var pageNav = $("#page-nav");

var reservationForm = $("#total");

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

buildReservationConfirmation();
function buildReservationConfirmation() {
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
    
  $('#nameconf').innerHTML = "Name: " + sessStore.getItem('firstName: ') + " " + sessStore.getItem('lastName: ');
  $('#confemail').innerHTML = "Email Address: " + sessStore.getItem('emailAddress: ');
  $('#conftel').innerHTML = "Phone Number: " + sessStore.getItem('phoneNumber: ');
  $('#confloc').innerHTML = "City and State: " + sessStore.getItem('location: ');
  $('#confroom').innerHTML = "Type of room: " + sessStore.getItem('room')
  $('#confnumberrooms').innerHTML = "# of Rooms: " + sessStore.getItem('guest: ');
  $('#checkinconf').innerHTML = "Check-in Date: " + sessStore.getItem('checkInDate: ');
  $('#checkoutconf').innerHTML = "Check-out Date: " + sessStore.getItem('checkOutDate: ');
  $('#confwish').innerHTML = "Additional Comments: " + sessStore.getItem('additionalComments: ');

}