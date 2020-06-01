console.log("doomjuiceforum created by Jerry He (bufferjjh) 2020. Made with node.js, socket.io, express, nodemon.");

function adjustMsgBox() {
  textbox1 = document.getElementById('typing-box');
  submitButton = document.getElementById('send-button')
  windowLength = window.innerWidth;
  submitButton.style.left= (windowLength - 160) + 'px';
  textbox1.style.width = (window.innerWidth - 190)  + 'px';
}
function adjustElements() {
  adjustMsgBox();
  windowHeight = window.innerHeight;
  messangingBox = document.getElementById('messanging-area');
  messangingBox.style.height = (windowHeight - 100) + 'px';
}
function appendMessage(user, message) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today1 = mm + '/' + dd + '/' + yyyy
  var time = "[" + today.getHours() + ":" + today.getMinutes() + ' ' + today1 + "]"

  messangingArea = document.getElementById('messanging-area');
  msgBox = document.createElement('div');
  msgBox.className = 'userMessage';
  msgBox.innerHTML = "<a style='color:#4691f2'>" + user + "</a>" +  " " + time + "<br>" + "<center>" + message + "</center>";

  if(messangingArea != null && messangingArea != undefined) {
  messangingArea.appendChild(msgBox)
  }
}
adjustMsgBox();
const socket = io();
var username = 'N/A'

socket.emit('number-request')

function registerUser() {
  username = document.getElementsByClassName('username_getter')[0].value;
  if(username == '' || username == null) {
    var animals = ['rabbit','goat','fish','eagle','vanquisher','master','parrot','conqueror', 'inquisitor','groundhog','bird','robin'];
    var number = Math.floor(Math.random() * 10000);
    var charNum = Math.floor(Math.random() * 12);
    username = animals[charNum] + number;
    alert('Assigned ' + username + " since no name was provided")
  }
  var popUp = document.getElementsByClassName('initial_pop_up')[0];
  window.setTimeout(function() {popUp.style.opacity= 0.9} , 100)
  window.setTimeout(function() {popUp.style.opacity= 0.8} , 140)
  window.setTimeout(function() {popUp.style.opacity= 0.7} , 180)
  window.setTimeout(function() {popUp.style.opacity= 0.6} , 220)
  window.setTimeout(function() {popUp.style.opacity= 0.5} , 260)
  window.setTimeout(function() {popUp.style.opacity= 0.4} , 300)
  window.setTimeout(function() {popUp.style.opacity= 0.3} , 340)
  window.setTimeout(function() {popUp.style.opacity= 0.2} , 380)
  window.setTimeout(function() {popUp.style.opacity= 0.1} , 420)
  window.setTimeout(function() {popUp.style.opacity= 0.0;popUp.remove()} , 280)

  joinAlert = document.createElement('div');
  joinAlert.id = 'joinAlert';
  joinAlert.innerHTML = 'Succesfully Joined as ' + '<strong style="color:green;">' + username + '</strong>';
  document.body.appendChild(joinAlert)

  window.setTimeout(function() {joinAlert.style.height= 25 + 'px'; joinAlert.innerHTML = ''; joinAlert.style.webkitAnimationPlayState = "running"; } , 2200)
  window.setTimeout(function() {joinAlert.remove();
    messangingArea = document.getElementById('messanging-area');
    msgBox = document.createElement('div');
    msgBox.className = 'userMessage';
    msgBox.innerHTML = '<center><strong style="color: #09db28;">You</strong> have joined the DOOMJUICE Forum</center>';

    if(messangingArea != null || messangingArea != undefined) {
    messangingArea.appendChild(msgBox)
    }
  } , 2500)

  //Set up div
  var messangingBox = document.getElementById('messanging-box');
  messangingBox.style.visibility = 'visible';
  document.getElementById('typing-box').placeholder = '@' + username + ' Type your message';
  //server connection >>> Send username to backend
  socket.emit('new-user', username);
  //Add Messanging area
  var messangingArea = document.createElement('div');
  messangingArea.id = 'messanging-area'
  document.body.appendChild(messangingArea);
  adjustElements();



}

var nameInputer = document.getElementsByClassName('username_getter')[0];
nameInputer.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    registerUser()
  }
});

function sendMessage() {
  userMessage = document.getElementById('typing-box').value;
  console.log(username + ': ' + userMessage)

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today1 = mm + '/' + dd + '/' + yyyy
  var time = "[" + today.getHours() + ":" + today.getMinutes() + ' ' + today1 + "]"

messangingArea = document.getElementById('messanging-area');

  if(messangingArea != null && messangingArea != undefined && messangingArea != '') {
    msgBox = document.createElement('div');
    msgBox.className = 'userMessage';
    msgBox.innerHTML = "<a style='color:#09db28'>" + 'You' + "</a>" +  " " + time + "<br>" + "<center>" + userMessage + "</center>";
  }


  if(messangingArea != null && messangingArea != undefined && messangingArea != '') {
  messangingArea.appendChild(msgBox)
  }
  //send shit to server
  socket.emit('sent-message', userMessage);
  userMessage = document.getElementById('typing-box').value = '';
}
var textbox2 = document.getElementById('typing-box');
textbox2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage()
  }
});


socket.on('new-server-user', name => {
  console.log(name + ' has connected');
  messangingArea = document.getElementById('messanging-area');
  msgBox = document.createElement('div');
  msgBox.className = 'userMessage';
  msgBox.innerHTML = "<center style='color:#4691f2;'>" + name + " has connected to the server" + "</center>";

  if(messangingArea != null || messangingArea != undefined) {
  messangingArea.appendChild(msgBox)
  }
})
socket.on('user-sent-message', msg => {
  console.log(msg);
  if(msg[1] != '' && msg[1] != undefined && msg[1] != null) {
    appendMessage(msg[0],msg[1])
  }
})
socket.on('user-disconnected', name => {
  if(name != null) {
    console.log(name + ' has disconnected');
    messangingArea = document.getElementById('messanging-area');
    msgBox = document.createElement('div');
    msgBox.className = 'userMessage';
    msgBox.innerHTML = "<center style='color:red;'>" + name + " has disconnected from the server" + "</center>";

    if(messangingArea != null || messangingArea != undefined) {
    messangingArea.appendChild(msgBox)
    }
  }
})
socket.on('updateUserCount', usersOnline => {
  try {
    if(usersOnline >= 0 && usersOnline != null) {
      document.getElementById('userCounter').innerHTML = usersOnline;
    }
  }
    catch(e) {
      i = 5;
  }
})
