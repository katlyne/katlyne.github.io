//'use strict';
var pageNav = document.querySelector('#page-nav');
var sessStore = window.sessionStorage;

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}



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

/*
function storeContact(){
    console.log("Im being read");
    sessStore.setItem("firstNameContact: ", document.querySelector('#firstNameC').value);
    sessStore.setItem("lastNameContact: ", document.querySelector('#lastNameC').value);
    sessStore.setItem("emailContact: ", document.querySelector('#emailC').value);
    sessStore.setItem("PhoneNumberContact: ", document.querySelector('#phoneNumberC').value);
    sessStore.setItem("LocationContact: ", document.querySelector('#locationC').value);
    sessStore.setItem("ReasonForContact: ", document.querySelector('#reasonForContactC').value);
    sessStore.setItem("CommentsContact: ", document.querySelector('#commentsC').value);
    
}
*/


