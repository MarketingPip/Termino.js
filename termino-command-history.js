/* Termino.js Plug-in: Command History
Description: Add command history to your Termino.js apps!
Version: 1.0.0
NOTES: THIS DOES NOT WORK WITH THE COMMAND LINE CONNECTOR.
More info about Termino.js can be found here @ https://github.com/MarketingPipeline/Termino.js -
a free, open-source JavaScript library that is great for making command based apps (chatbots, games, terminal emulators & MUCH more!) 
*/

Termino.commandHistory = function(terminalInputSelector, maxCommands) {
try{
  if(document.querySelector(terminalInputSelector) == null){
    throw {message: `${terminalInputSelector} was not found`}
  }

 
let commandHistory = [];
let commandHistoryIndex = 0;
let commandHistoryMax = 10;
let commandHistoryCurrent = '';
  

  
  // ALLOW MAX COMMANDS TO BE SET. - DEFAULT IS 10 COMMANDS.
  if(maxCommands){
    // check if MaxCommands is number
  if(!isNaN(parseFloat(maxCommands)) && isFinite(maxCommands)){
    commandHistoryMax = maxCommands
  }else{
    throw {message: `${maxCommands} must be a NUMBER.`}
  }
  }  
  
  
function addCommandToHistory(command) {
  if (commandHistory.length >= commandHistoryMax) {
    commandHistory.shift();
  }
  commandHistory.push(command);
  commandHistoryIndex = commandHistory.length;
}
function getCommandFromHistory(direction) {
  if (direction === 'up') {
    if (commandHistoryIndex > 0) {
      commandHistoryIndex--;
    }
  } else if (direction === 'down') {
    if (commandHistoryIndex < commandHistory.length - 1) {
      commandHistoryIndex++;
    }
  }
  return commandHistory[commandHistoryIndex];
}

let commandInput = document.querySelector(terminalInputSelector);
commandInput.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    addCommandToHistory(commandInput.value);
  } else if (e.keyCode === 38) {
    commandHistoryCurrent = getCommandFromHistory('up');
     if(commandHistoryCurrent != undefined){
    commandInput.value = commandHistoryCurrent;
     }
  } else if (e.keyCode === 40) {
    commandHistoryCurrent = getCommandFromHistory('down');
    if(commandHistoryCurrent != undefined){
    commandInput.value = commandHistoryCurrent;
    }
  }
});
}catch(error){
  console.error(`Termino.js Command History Plugin Error: ${error.message}`)
  throw {
      message: `Termino.js Command History Plugin Error: ${error.message}`
    }
}  
}

/// EXAMPLE & USAGE

// TERMINO INPUT SELECTOR + MAX COMMANDS (OPTIONAL) - DEFAULT IS 10 COMMANDS
Termino.commandHistory(".termino-input", 3) 
