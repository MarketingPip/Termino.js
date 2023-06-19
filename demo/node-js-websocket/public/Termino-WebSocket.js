// Import Termino.js
import {Termino} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.2/dist/termino.min.js';

// Create the Termino.js instance
let term= Termino(document.getElementById("terminal"))
term.echo("Hello world from https://github.com/MarketingPipeline/Termino.js")
term.echo("This is a demo that sends Termino.js inputs through a web socket connection!")

// get the server URL from the window.location:
// change 'wss' to 'ws' for running without SSL):
let serverURL = 'ws://' + window.location.host;
// the webSocket connection:
let socket;
// variables for the DOM elements:
let incomingSpan;
let outgoingText;
let connectionSpan;
let connectButton;

function setup() {
  // get all the DOM elements that need listeners:
  incomingSpan = document.getElementById('incoming');
  outgoingText = document.getElementById('outgoing');
  connectionSpan = document.getElementById('connection');
  connectButton = document.getElementById('connectButton');
  connectButton.addEventListener('click', changeConnection);
  openSocket(serverURL);
   sendMessage();
}

function openSocket(url) {
  // open the socket:
  socket = new WebSocket(url);
  socket.addEventListener('open', openConnection);
  socket.addEventListener('close', closeConnection);
  socket.addEventListener('message', readIncomingMessage);
}


function changeConnection(event) {
  // open the connection if it's closed, or close it if open:
  if (socket.readyState === WebSocket.CLOSED) {
    openSocket(serverURL);
  } else {
    socket.close();
  }
}

function openConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "true";
  connectButton.value = "Disconnect";
}

function closeConnection() {
  // display the change of state:
  connectionSpan.innerHTML = "false";
  connectButton.value = "Connect";
}

function readIncomingMessage(event) {
  // display the incoming message:
  term.output(event.data);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let isConnected = false

let isConnectedMSG = false

async function sendMessage() {
  //if the socket's open, send a message:
  if (socket.readyState === WebSocket.OPEN) {
    
    if(isConnected != true){
     isConnected = true
     term.echo("You are connected to the websocket server.") 
     }
    // Get input from Termino.js to send to web socket server
    socket.send(await term.input(""));
    await sendMessage();
  }else{
     // Server is not connected yet
     if(isConnectedMSG != true){
     isConnectedMSG = true
     term.echo("Trying to connect to websocket server.") 
     }
    
    await sleep(3000)
    await sendMessage();
  }
   // Loop forerver.... - hacky workaround but!
    await sendMessage();
}

// add a listener for the page to load:
document.addEventListener('DOMContentLoaded', setup);
