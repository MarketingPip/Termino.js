function Termino (terminalSelector, keyCodes, settings, VM_TERMINO = false) {

  
  
  try {
    
    let listeners = {};
    
    function on(eventName, callback) {
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
  }
    
   function emit(eventName, data) {
    const eventListeners = listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }
    
    // ALLOW DEVELOPERS TO CONNECT TO A NODE.JS PROCRESS 
    function isCommandLine() {
    return typeof process !== 'undefined' && process.stdout && process.stdin;
    }
    
    
    
    
    /// FUNCTION TO DELAY TERMINAL OUTPUTS / ECHO ETC (AWAIT / PROMISE BASED) - EXAMPLE : await term.delay(xxx) ...     
    const termDelay = ms => new Promise(res => setTimeout(res, ms));

    
    
    /// FUNCTION TO REMOVE HTML FOR COMMAND LINE CONNECTOR
    function removeHTML(command){
          // REMOVES ALL HTML ELEMENTS
    let HTML_Regex = /(<([^>]+)>)/ig;
    command = command.replace(HTML_Regex, "");
    return command
    }
       
    
    
     
    // DEFAULT TERMINAL SETTINGS (USED FOR BROWSER & COMMAND LINE)  
    let DEF_SETTINGS = {
      allow_scroll: true, // allow scroll up & down on terminal 
      prompt: "<pre> > {{command}} </pre>", // default prompt / echo message -  {{command}} is required
      input: "<pre> {{command}} </pre>", // input message - {{command}} is required
      output: "<pre> {{command}} </pre>", // output message - {{command}} is required
      command_key: 13, // default command key
      terminal_killed_placeholder: "TERMINAL DISABLED", // default terminal input placeholder when killed. 
      terminal_output: ".termino-console", // default output query selector
      terminal_input: ".termino-input", // default input query selector
      disable_terminal_input: false, // disable any user commands / inputs. --- Useful for making terminal animations etc!
      speech_to_text:true, // Enable text to speech on output & inputs.
    }
    
    
    
    /// ALLOW DEVS TO PASS CUSTOM SETTINGS FOR TERMINAL
    // Update state options with user-provided options.
  if (settings) {
    Object.assign(DEF_SETTINGS, settings);
  }

  
   // Check if custom settings include {{command}} in prompt, input, and output
  if (!DEF_SETTINGS.prompt.includes('{{command}}') || !DEF_SETTINGS.input.includes('{{command}}') || !DEF_SETTINGS.output.includes('{{command}}')) {
    throw {
      message: "Custom Termino settings are not valid; {{command}} is required inside prompt, input, and output."
    };
  }
    
    
    
        
    // CHECK IF THIS TERMINO.JS APP IS RUNNING A WEB BASED TERMINAL OR A NODE.JS TERMINAL 
     /* What does this do? 
     ** Termino.js allows functions created for your web based terminal with termino.js to be used in a node.js CLI app!
     */ 
    
    if(!isCommandLine()){
    
    /// WEB BROWSER BASED - TERMINO.JS
    
   function checkElementValueOrContentEditable(element) {
  if (!element) {
    throw new Error("Element is not provided.");
  }

  if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA") ||
    (element.hasAttribute("contenteditable") && element.getAttribute("contenteditable").toLowerCase() !== "false")) {
    return true;
  }

   throw new Error("Element is neither an input element nor content-editable.");
}


      if(!terminalSelector){
  
     if(terminalSelector === null){
        throw {
          message: `Could not find: QuerySelector used for Termino.js not found`
        }
     }
    if(terminalSelector === undefined){
       throw {
          message: "No terminalSelector was provided"
        }
      }
    }
    
    


  
    let terminal_console = terminalSelector.querySelector(DEF_SETTINGS.terminal_output)
   
    let terminal_input = terminalSelector.querySelector(DEF_SETTINGS.terminal_input)  
    
    let termValue = terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value || terminalSelector.querySelector(DEF_SETTINGS.terminal_input).innerText  || terminalSelector.querySelector(DEF_SETTINGS.terminal_input).textContent
    
    
    
    // MAKE SURE QUERY SELECTORS WHERE FOUND!
    if(terminal_console == null){
      throw {
          message: `Could not find ${DEF_SETTINGS.terminal_output} on page used for terminal_output`
        }
    }

       if(terminal_input == null){
      throw {
          message: `Could not find ${DEF_SETTINGS.terminal_input} on page used for terminal_input`
        }
    }
    
    
    checkElementValueOrContentEditable(terminal_input)
      

    /// DEFAULT TERMINAL KEY CODES  
    let KEYCODES = [{
      "id": "SCROLL_UP_KEY", /// DEFAULT SCROLL UP KEY - "SCROLL_UP_KEY" ID NAME IS REQUIRED. 
      "key_code": 38
      // "function": example() // you can add your own custom function to the scroll up button if needed! 
    }, {
      "id": "SCROLL_DOWN_KEY", // DFEAULT SCROLL DOWN KEY - "SCROLL_DOWN_KEY" ID NAME IS REQUIRED. 
      "key_code": 40
      // "function": example() // you can add your own custom function to the scroll down button if needed! 
    }];



    // DEFAULT SCROLL BTNS
    
    
    /// UP ARROW
    let Scroll_Up_Key = KEYCODES[0].key_code

    /// DOWN ARROW
    let Scroll_Down_Key = KEYCODES[1].key_code

   


    // EXAMPLE USAGE JSONLIST + "SCROLL_UP_KEY"
    function isScrollKeySet(jsonList, id) {
        for (var i = 0; i < jsonList.length; i++) {
          if (jsonList[i].id == id && jsonList[i].key_code != undefined) {
            return jsonList[i].key_code
            }
         }
      return false;
     }

    /// ALLOW DEVS TO PASS CUSTOM KEYCODE FUNCTIONS FOR TERMINAL

    if (keyCodes) {
      // Check if scroll up key has been set
      if (isScrollKeySet(keyCodes, "SCROLL_UP_KEY")){
          // set custom scroll up key
          Scroll_Up_Key = isScrollKeySet(keyCodes, "SCROLL_UP_KEY")
        
      }
      // Check if scroll down key has been set
         if (isScrollKeySet(keyCodes, "SCROLL_DOWN_KEY")){
          // set custom scroll up key
          Scroll_Down_Key = isScrollKeySet(keyCodes, "SCROLL_DOWN_KEY")
        
      }
      KEYCODES = keyCodes
    }




    // DEFAULT COMMAND KEY - ie - ENTER BTN
    let Command_Key = DEF_SETTINGS.command_key

     // Handle keyboard events for the Termino.js instance.
    terminalSelector.addEventListener('input', e => {
    emit("input", e)
      
    }); 


    // Handle keyboard events for the Termino.js instance.
    terminalSelector.addEventListener('keydown', e => {
    emit("keydown", e)
      //// DISABLE TERMINAL SCROLL UP / DOWN FOR ANIMATIONS ETC...
      if (DEF_SETTINGS.disable_terminal_input != true) {
        /// HANDLE INPUTS ON COMMAND KEY. 
        checkIfCommand()
      }

      /// SCROLL UP / DOWN TERMINAL FUNCTION - WIP; REMOVE THIS ELSE IF JUNK FUNCTION...
      if (DEF_SETTINGS.allow_scroll === true) {
        if (e.keyCode == Scroll_Up_Key) {
          /// SCROLL TERMINAL UP
           scrollTerminalToTop()
        } else if (e.keyCode == Scroll_Down_Key) {
          /// SCROLL TERMINAL DOWN
         scrollTerminalToBottom()
        }
      }
    });

      
let textToSpeechVoice = null;      
      
function detectSpeechSupport() {
  return new Promise(function(resolve, reject) {
    if ('speechSynthesis' in window) {
      echoHandler("Speech supported")
      resolve();
    } else {
      reject();
    }
  });
}
  
      

let SpeechDetectionTestRan = false
      
if(DEF_SETTINGS.speech_to_text == true){

if(SpeechDetectionTestRan != true){  
  detectSpeechSupport().then(function() {
   DEF_SETTINGS.speech_to_text = true
  }).catch(function() {
   DEF_SETTINGS.speech_to_text = false
 }); 
  SpeechDetectionTestRan = true
 }
  
}  
      
async function SpeechToText(command){
  // WIP FOR NEXT VERSION... :D 
  
if(DEF_SETTINGS.speech_to_text == true){
   
    try{
    command = removeHTML(command.trim())
    command = command.trim()
    if(textToSpeechVoice == null){
      /// USE DEVICE TEXT TO SPEECH VOICE 
    let speechSynthesis = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(command);
    speechSynthesis.speak(utterance);
    } else{
     // USE THE SET TEXT TO SPEECH VOICE.
      
      
    } 
    } catch(error){
     console.error(error)
     disableTextToSpeech() // DISABLE TEXT TO SPEECH TO PREVENT LOOP. 
     throw error
    }
   // REMOVE ALL ILLEGAL CHARACTERS
  //  command =  command.replace(/[^a-zA-Z0-9\s]/g, '')
  
  
    // REMOVES ALL ILLEGAL CHARACTERS - EXCLUDING HREFS..
   // var illegalChars = /[^a-zA-Z0-9\s\:\/\.]/g;
   // command = command.replace(illegalChars, '');

    //console.log(command.trim())
    // SPEAKTEXT(COMMAND)
   }
}  

  function setTextToSpeechVoice(voice) {
  if (voice) {
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name == voice) {
        textToSpeechVoice = voices[i];
        return textToSpeechVoice
      }
    }
  }
  return null;
}    
      
 
    let commands = {};
  

  // Function to add a custom command
   function addCommand(command, handler) {
    // Add the command and its corresponding handler function to the commands object
     if(!commands[command]){
    commands[command] = handler;
     }else{
       console.log(command)
     }
  }

  // Function to handle user input
  async function handleInput(input, executedCommand = false) {
    
    //console.log(input)
    
    if(!executedCommand){
    emit('data', input);
    }
    // Split input by space to get command and arguments
    const [command, ...args] = input.split(' ');
    // Check if the command exists in the commands object
    if (commands.hasOwnProperty(command)) {
      // Call the handler function associated with the command, passing in the arguments
      await commands[command](...args);
      return
    } 
    emit("commandNotFound", command)
  }
    
      
 // FUNCTION TO TURN TEXT TO SPEECH ON     
function enableTextToSpeech(){
  DEF_SETTINGS.speech_to_text = true
}
      
 // FUNCTION TO TURN TEXT TO SPEECH OFF          
function disableTextToSpeech(){
  DEF_SETTINGS.speech_to_text = false
}      
      
      
      
    // TERMINAL INPUT STATE / TERMINAL PROMPT FUNCTION  
let InputState = false;
let termInputResolve, termInputReject; // Initialize the resolve and reject functions.

function termInput(question, callback) {
 InputState = true;
  return new Promise(function (resolve, reject) {  
   
    function resolveInput(val){
      InputState = false
      termInputResolve = null;
      return resolve(val)
    }
    
    function rejectInput(val){
      InputState = false
      termInputReject = null;
      return reject(val)
    }
    
    termInputResolve = resolveInput; // Store the resolve function
    termInputReject = rejectInput;   // Store the reject function
    displayQuestion(question, callback);
    setupInputHandling(question, callback);
  });
}

function displayQuestion(question, callback) {
  echoHandler(question, callback, null);
  termClearValue();
  scrollTerminalToBottom();
}

function handleCommandForQuestion(event, question, callback) {
  const Command_Key = 13; // Replace with the appropriate key code for your use case (e.g., Enter key).

  if (event.keyCode === Command_Key) {
    event.preventDefault();

    const inputElement = terminalSelector.querySelector(DEF_SETTINGS.terminal_input);
    const value = inputElement.value || inputElement.innerText || inputElement.textContent;

    termClearValue();
    inputElement.removeEventListener('keypress', handleCommandForQuestion);


    function getCallBack(val) {
      if (callback) {
        callback(val);
      }
    }

    if (value.length !== 0) {
      // Echo value to terminal
      echoHandler(value, callback, true);
      emit('data', value);
      getCallBack(value);
      termInputResolve(value); // Resolve the promise with the value
    } else {
      // Return an empty prompt
      echoHandler('', callback, true);
      emit('data', null);
      getCallBack('');
      termInputReject("Value cannot be empty"); // Reject the promise with a reason
    }
  }
}

function setupInputHandling(question, callback) {
  terminalSelector.querySelector(DEF_SETTINGS.terminal_input).addEventListener('keypress', (event) => {
    handleCommandForQuestion(event, question, callback);
  });
}

// New function to fulfill the promise with a value
function fulfillTermInput(value) {
  if (termInputResolve) {
    termInputResolve(value);
    
  }
}

// New function to reject the promise with a reason
function rejectTermInput(reason) {
  if (termInputReject) {
    termInputReject(reason);
  }
}




    // FUNCTION TO OUTPUT TO TERMINAL (WITH TERMINAL PROMPT)
    function termEcho(command, callback = null) {
      echoHandler(command, callback, false)
    }
    
    // FUNCTION TO HANDLE TERM ECHOS (REQUIRED TO HANDLE .on(output))
      
      function echoHandler(command, callback, userInput = true){
        if(!VM_TERMINO){
          terminal_console.innerHTML += `${DEF_SETTINGS.prompt.replace('{{command}}', command)}`
      scrollTerminalToBottom()
        }
      if(callback){
        callback()
      }
       if(!userInput){
         emit("output", command)
       } 
        
      }

    // FUNCTION TO OUTPUT TO TERMINAL (WITHOUT TERMINAL PROMPT)
    function termOutput(command, callback = null) {
    if(!VM_TERMINO){
      terminal_console.innerHTML += `${DEF_SETTINGS.output.replace('{{command}}', command)}`
      scrollTerminalToBottom()
    }
       if(callback){
        callback()
      }
        emit('output', command)
    //  SpeechToText(command)
    }


    // FUNCTION TO CLEAR TERMINAL CONSOLE OUTPUT
    function termClear() {
      if(!VM_TERMINO){
      terminal_console.innerHTML = ``
      }
    }



    /// DEFAULT FUNCTION TO KILL TERMINAL - DEVS CAN PROGRAM THEIR OWN IF THEY WANT.   
    function termKill() {
      /// TODO - REMOVE EVENT LISTENERS

      /// clear terminal
      termClear()

      /// set the terminal text values to disabled
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("disabled", "");

      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("placeholder", DEF_SETTINGS.terminal_killed_placeholder);

    }


    /// FUNCTION TO ENABLE TERMINAL INPUT     
    function termEnable() {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).removeAttribute("disabled", "");
    }

    /// FUNCTION TO DISABLE TERMINAL INPUT  
    function termDisable() {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("disabled", "");
    }


    /// FUNCTION TO REMOVE / CLEAR INPUT VALUE
    function termClearValue() {
      let element = terminalSelector.querySelector(DEF_SETTINGS.terminal_input) || terminalSelector.querySelector(DEF_SETTINGS.terminal_input)  || terminalSelector.querySelector(DEF_SETTINGS.terminal_input)
      
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
    element.value = "";
  } else if (element.hasAttribute("contenteditable") && element.getAttribute("contenteditable").toLowerCase() !== "false") {
    element.innerText = "";
  }
    }

    /// FUNCTION TO DELAY TERMINAL OUTPUTS / ECHO ETC (AWAIT / PROMISE BASED) - EXAMPLE : await term.delay(xxx) ...     
    const termDelay = ms => new Promise(res => setTimeout(res, ms));



    /// FUNCTION TO SCROLL TERMINAL TO THE BOTTOM    
    function scrollTerminalToBottom() {
      terminal_console.scrollTop = terminal_console.scrollHeight;
    }

    /// FUNCTION TO SCROLL TERMINAL TO THE TOP    
    function scrollTerminalToTop() {
      terminal_console.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }




    /// DISABLE INPUT IF DEFAULT SETTING IS SET TO TRUE  
    if (DEF_SETTINGS.disable_terminal_input === true) {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input).setAttribute("disabled", "");
    }


    /// ADD ELEMENT TO TERMINAL BY ID (REQUIRED), HTML (OPTIONAL), CLASS NAME (OPTIONAL), ELEMENT TYPE - DEFAULT IS DIV (OPTIONAL).
    function addElementWithID(id, html, class_name, element_type) {
      try{
      if(!id){
        throw {
          message: "No ID was provided when using add_element()"
        }
      }
      let g = null;
      if (element_type){
      g = document.createElement(element_type)
      } else{
      g = document.createElement('div')  
      }
      if (class_name) {
        g.setAttribute("class", class_name);
      }
      g.setAttribute("id", id);
      if (html) {
        g.innerHTML = html
      }
      terminal_console.appendChild(g);
      }catch(error){
        throw(error.message)
      }
    }


    /// REMOVE ADDED ELEMENT FROM TERMINAL BY ID
    function removeElementWithID(id) {
      try {
        terminalSelector.querySelector("#" + id).outerHTML = "";
      } catch (error) {
        throw {
          message: `Error could not find ${error.message}`
        }
      }
    }



    // If the user has pressed COMMAND btn - default btn is enter
    async function checkIfCommand() {

      let key = window.event.keyCode;



      /// RUN ANY FUNCTIONS FOR KEYCODES / KEYBIND SHORTCUTS / BUTTONS. 
       for (var i = 0; i < KEYCODES.length; i++) {
    if (key === KEYCODES[i].key_code) {
     
      try {
      if(KEYCODES[i].function){
        KEYCODES[i].function()
      }
      } catch (error) {
        console.error(`Termino.js: KeyCode Function Error: ${error.message}`)
        throw {
                message: `Termino.js: KeyCode Function Error: ${error.message}`
              }
      }
    }
  }


      /// MAKE SURE USER IS NOT ANSWERING A QUESTION
      if (InputState != true) {


        /// ECHO INPUT VALUE ON COMMAND BUTTON - BY DEFAULT IS ENTER. 
        if (key === Command_Key) {


          /// STOP ENTER FROM GOING DOWN / DOING WEIRD THINGS..
          if (window.event.preventDefault) {
            window.event.preventDefault()
          }

         termValue = terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value || terminalSelector.querySelector(DEF_SETTINGS.terminal_input).innerText  || terminalSelector.querySelector(DEF_SETTINGS.terminal_input).textContent
          
          
          
          echoHandler(termValue, null, true)
          //emit('data', termValue || null)
          
          /// ECHO USER INPUT     
          handleInput(termValue) 

          /// CLEAR OUTPUT  
          termClearValue()


        }

      }

        } 
      
      
        function exec(command){
         handleInput(command, true) 
      }
     
      async function userInputSimulate(val){
        //
     // console.log(InputState)
          if (InputState === false) {
         echoHandler(val,null, true)
        //    console.log("something here")
        return   await handleInput(val)
         }
     //   console.log(val)
         //
        //console.log(InputState)
        if(InputState){
         
          fulfillTermInput(val)
          emit("data", val)
           echoHandler(val,null, true)
          return
        }
        
          return
      }
      
      
      /// DEFAULT TERMINO FUNCTIONS FOR DEVELOPER USAGE - These can only be used for a (WEB BASED TERMINAL)
    return {
      echo: termEcho, // ECHO MESSAGE TO TERM WITH CAROT
      output: termOutput, // ECHO MESSAGE TO TERM WITHOUT CAROT
      clear: termClear, // CLEAR THE TERMINAL
      delay: termDelay, // DELAY FUNCTION BY X VALUE OF SECONDS
      disable_input: termDisable, // DISABLE TERMINAL INPUT
      enable_input: termEnable, // ENABLE TERMINAL INPUT
      input: termInput, // ASK USER QUESTION & RETURN VALUE
      scroll_to_bottom: scrollTerminalToBottom, // SCROLL TERMINAL TO THE BOTTOM
      scroll_to_top: scrollTerminalToTop, // SCROLL TERMINAL TO TOP
      add_element: addElementWithID, // ADD HTML ELEMENT WITH ID TO TERMINAL,
      remove_element: removeElementWithID, // REMOVE HTML ELEMENT WITH ID TO TERMINAL,
      kill: termKill, // KILL THE TERMIMAL - IE.. SET INPUT TO DISABLED & CLEAR THE TERMINAL.
      speak:SpeechToText,
      on:on,
      emit:emit,
      addCommand:addCommand,
       userInputSimulate: userInputSimulate,
      exec:exec /// Execute Command 
    }} else{
    /// THIS IS THE COMMAND-LINE CONNECTOR FOR TERMINO.JS APP - EXECUTED VIA COMMAND LINE - IE NODE.JS ETC..  
      // ie; WRITE YOUR TERMINO.JS APP IN BROWSER & BE ABLE TO USE THEM IN NODE.JS VIA A TERMINAL TOO!
      
      
      // DEFAULT FUNCTION TO ECHO TO TERMINAL (WITH PROMPT)
      function termEcho(value){      
        process.stdout.write(removeHTML(`${DEF_SETTINGS.prompt}`).replace('{{command}}',value) + '\n');
      }
      
      
        // DEFAULT FUNCTION TO ECHO TO TERMINAL (WITHOUT PROMPT)
       function termOutput(value){
        process.stdout.write(removeHTML(`${DEF_SETTINGS.output}`).replace('{{command}}',value) + '\n');
      }
      
      
       /// DEFAULT FUNCTION TO KILL / EXIT TERMINAL
      function termKill(){
        process.exit();
      }
      
      
       // FUNCTION TO ASK QUESTION VIA TERMINAL
      function termInput(question) {
       return new Promise(function(resolve, reject) {
       process.stdin.resume();       
       process.stdout.write(removeHTML(`${DEF_SETTINGS.input}`).replace('{{command}}',question));
       process.stdin.once('data', function(data) {
              // echo value to terminal 
             // termOutput(data.toString().trim()) // DISABLED as of now looks weird... 
             
             // resolve that promise!
              resolve(data.toString().trim());
        });
       });
      } 
      
      /// DEFAULT TERMINO FUNCTIONS FOR DEVELOPER USAGE -  These can only be used for a (NODE.JS TERMINAL APP etc)
      return { 
      echo: termEcho, // ECHO MESSAGE TO TERM WITH CAROT
      output: termOutput, // ECHO MESSAGE TO TERM WITHOUT CAROT
      delay: termDelay, // DELAY FUNCTION BY X VALUE OF SECONDS
      input: termInput, // ASK USER QUESTION & RETURN VALUE
      kill: termKill // KILL / EXIT THE TERMIMAL APP.
    }
      
    }
  } catch (error) {
    // Something went wrong! 
    console.error(`Termino.js Error: ${error.message}`)
    throw {
      message: `Termino.js Error: ${error.message}`
    }
  }
}

function spawn(terminalElement, customSettings = {}) {
  // Initialize Termino with custom settings
  const termino = new Termino(terminalElement, null, customSettings, true);

  // Function to execute a command
  async function input(command) {
    return termino.input(command)
  }

  // Function to output text to the terminal
  function output(text) {
    termino.output(text);
  }

  // Function to clear the terminal
  function clearTerminal() {
    termino.clear();
  }

  // Function to simulate user input
  async function simulateUserInput(input) {
    await termino.userInputSimulate(input, null, true);
  }

    // Event emitter for standard output
  function on(event, listener) {
    termino.on(event, listener);
  }
 
    termino.on('output', (data) => {
    console.log(`Output: ${data}`)
  });
  
  termino.on('data', (data) => {
    console.log(`Input: ${data}`)
  });
  
  return {
    input,
    output,
    clearTerminal,
    simulateUserInput,
    on
  };
}

// Select the terminal element in your HTML
const terminalElement = document.querySelector("#your-terminal-element");

// Create a terminal instance
const terminal = spawn(terminalElement, {
  // Custom settings if needed
  allow_scroll: false,
}, null, true);

// Execute a command
terminal.input("ls").then((result) => {
  terminal.output(`${result}`);
});

//

// Simulate user input
setTimeout(() => {
  terminal.simulateUserInput("echo Hello, Termino 2!");
}, 2000);

