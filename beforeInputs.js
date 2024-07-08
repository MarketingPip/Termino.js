/**!
 * @license Termino.js - A JavaScript library to make custom terminals in the browser with support for executing your own custom functions!
 * VERSION: 1.0.1 (WIP) / Need to do some tests + add console connector etc... 
 * LICENSED UNDER MIT LICENSE
 * MORE INFO CAN BE FOUND AT https://github.com/MarketingPipeline/Termino.js/
 * Built By Jared Van Valkengoed
 */



/* DEV & CONTRIBUTOR NOTES IE: TODO LIST -

- NEED TO IMPROVE / WRITE DOCUMENTATION FOR LIBRARY - URGENT TASK NEEDS HELP BIG TIME!
  - CREATE DOCUMENATION WEBSITE HOSTED VIA GITHUB PAGES BRANCH
  - REMOVE WIKI FROM REPO.
  
- SUPPORT FOR MULTIPLE KEYBINDS / KEYBOARD SHORT CUTS (VIA MOUSETRAP ON NPM / GITHUB)
-  MAKE SOME COOL PLUGINS. 
  - PLUGIN FOR CREATING TERMINAL ANIMATIONS VIA A TYPEWRITER / TYPING LIBRARY ETC.. 
  - PLUGIN FOR PLAYING PRE-RECORDED TERMINAL ANIMATIONS.
  - ORGANIZE PLUGINS IN REPO / WEBSITE ETC..
  
- MAKE THIS A EXPORT THIS AS WELL & GLOBAL IN SAME SCRIPT....? (DISCUSSION) 

- ADD ANY POLYFILL SUPPORTS NEEDED / UNTHOUGHT OF. 

- CREATE TESTS + ACTION / WORKFLOW
  - BROWSER AUTOMATION TESTS VIA PUPPETEER ETC (CHECK ALL DEVICES / BROWSER COMPABILITY + POSSIBLY SCREENSHOTS). 
  - OTHER TESTS. 
  - CREATE ACTION THAT AUTO TESTS ON PR.
  - IF ANYONE COULD HELP WRITING TESTS / THESE WOULD BE APPRECIATED. 
  
- Text To Speech Functions (WIP)
  - Auto remove HTML / illegal characters? Or up to developers to do this?
  
- Improvements on Command Line Connector (Need feedback from devs for ways to improve)
  - Auto remove HTML / illegal characters? Or up to developers to do this?
  
*/





// POLYFILL SUPPORT (AUTO-DETECTED ON LOAD FOR DEVICE)
if (typeof document != 'undefined') {
  (async function() {
    await import('https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.filter,console,document,JSON,Promise') ;
  })();
}




export function Termino (terminalSelector, keyCodes, settings) {

  
  
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
    let callbackdata = null;
    if (eventListeners) {
       eventListeners.forEach((callback) => {
        callbackdata = callback(data);
      });
    } 
   if(callbackdata){
     return callbackdata
   } 
     
    return data
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

    function termInput(question, callback) {
      return new Promise(function(resolve) {

         const BeforeQuestion = emit('modify:term-input', question)
            
            if(BeforeQuestion){
              //console.log(BeforeInput)
              question = BeforeQuestion
            }
           
        /// add the question value to terminal
        echoHandler(question, callback, null)

        
       
        
        termClearValue()

        scrollTerminalToBottom()
        
        // speak question - if enabled.          
      //  SpeechToText(question)
        
        InputState = true;
//
        function handleCommandForQuestion(event) {

          if (event.keyCode == Command_Key) {
            if (window.event.preventDefault) {
              window.event.preventDefault()
            }
            let value = terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value || terminalSelector.querySelector(DEF_SETTINGS.terminal_input).innerText  || terminalSelector.querySelector(DEF_SETTINGS.terminal_input).textContent
            termClearValue()
 
            const BeforeInput = emit('before:input', value)
            
            if(BeforeInput){
              //console.log(BeforeInput)
              value = BeforeInput
            }
            terminalSelector.querySelector(DEF_SETTINGS.terminal_input).removeEventListener('keypress', handleCommandForQuestion);
            InputState = false;
            
            function getCallBack(val){
              if(callback){
                callback(val)
              }
            }
            
            if (value.length != 0) {
              // echo value to terminal
              echoHandler(value, callback, true)
              emit('data', value)
              getCallBack(value)
              resolve(value)
            } else {
              // return an empty prompt
              echoHandler("", callback, true)
              emit('data', null)
              getCallBack("")
              resolve()
            }

          }
        }

        /// Handle inputs for question state.
        terminalSelector.querySelector(DEF_SETTINGS.terminal_input).addEventListener('keypress', handleCommandForQuestion);


      })
    }




    // FUNCTION TO OUTPUT TO TERMINAL (WITH TERMINAL PROMPT)
    function termEcho(command, callback = null) {
      echoHandler(command, callback, false)
    }
    
    // FUNCTION TO HANDLE TERM ECHOS (REQUIRED TO HANDLE .on(output))
      
      function echoHandler(command, callback, userInput = true){
        
        if(userInput){
         const BeforeInput = emit('after:input', command)
            
            if(BeforeInput){
             // console.log(BeforeInput)
              command = BeforeInput
            }
        } 
        
          terminal_console.innerHTML += `${DEF_SETTINGS.prompt.replace('{{command}}', command)}`
      scrollTerminalToBottom()
      if(callback){
        callback()
      }
       if(!userInput){
         emit("output", command)
       } 
        
      }

    // FUNCTION TO OUTPUT TO TERMINAL (WITHOUT TERMINAL PROMPT)
    function termOutput(command, callback = null) {
       const BeforeQuestion = emit('modify:term-output', command)
            
            if(BeforeQuestion){
              //console.log(BeforeInput)
              command = BeforeQuestion
            }
           
      
      terminal_console.innerHTML += `${DEF_SETTINGS.output.replace('{{command}}', command)}`
      scrollTerminalToBottom()
       if(callback){
        callback()
      }
        emit('output', command)
    //  SpeechToText(command)
    }


    // FUNCTION TO CLEAR TERMINAL CONSOLE OUTPUT
    function termClear() {
      terminal_console.innerHTML = ``
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
          
      
            const BeforeInput = emit('before:input', termValue)
            
            if(BeforeInput){
              termValue = BeforeInput
            }
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
      
      
      
      /// DEFAULT TERMINO FUNCTIONS FOR DEVELOPER USAGE - These can only be used for a (WEB BASED TERMINAL)
    return {
      started:new Date().toLocaleString(),
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



async function test(callbackValue){
  console.log(callbackValue)
 let t =  await term.input("cool2")
 console.log(t)
}

  let term= Termino(document.getElementById("terminal"), null, {
      allow_scroll: true, // allow scroll up & down on terminal 
      prompt: "<pre> > {{command}} </pre>"})

 
  term.on('loggerUpdated', async (data) => {
 console.log(data)  
   // console.log(bb.getLog())
});
  

//





  
   function logPlugin(term, addCommand = false) {
  // Initialize the log output array
  const logOutput = [];
 const logOutputJSON = []
  // Function to organize and log data
  async function organize(data, type = null) {
    // Create a timestamp for the log entry
    const timestamp = new Date().toLocaleString();

    if (!type) {
      type = "Termino.js Input:";
    }
    data = await data
    // Format the log entry with a timestamp
    const logEntry = `[${timestamp}] ${type} ${data?.trim()}`;
    logOutputJSON.push({timestamp, type,data:data?.trim() || null})
    // Append the log entry to the log area
    logOutput.push(logEntry.trim());

    term.emit("loggerUpdated", {raw:logOutput.join("\n"), json:logOutputJSON})
  }

  // Add a "log" command to the Termino.js instance
  if(addCommand){   
  term.addCommand("log", (...args) => {
    const type = args[1]; // The first argument is the log type

    if (args.length > 1) {
      const message = args[0]
      organize(message);
    } else {
      term.echo("Usage: log message");
    }
  });
 }

  // Add event listeners to log data
  term.on('data', (data) => {
    organize(data);
  });

  term.on('output', (data) => {
    organize(data, "Termino.js Output:");
  });

     
  organize(``, "Termino.js started.")
     //
  return logOutput
}
//
function tests(term){
  
 

     //
  return []
}
 term.on('data',  (data) => {
   console.log(data)
 // return data.replace("hello", "bye")
  });
 
let log = logPlugin(term)
 // Add event listeners to log data

 

  term.addCommand("boo", (...args) => {
    console.log("booom")
  })

term.exec("boo")  
let data = await term.input("hello")
