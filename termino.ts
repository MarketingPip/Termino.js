/**
 * @license Termino.js - A JavaScript library to make custom terminals in the browser with support for executing your own custom functions!
 * VERSION: 1.0.2
 * LICENSED UNDER MIT LICENSE
 * MORE INFO CAN BE FOUND AT https://github.com/MarketingPipeline/Termino.js/
 */

import 'https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.filter,console,document,JSON,Promise'

export function Termino(terminalSelector: HTMLElement, keyCodes: { id: string, key_code: number, function?: Function }[], settings?: { allow_scroll: boolean, prompt: string, command_key: number, terminal_killed_placeholder: string, terminal_output: string, terminal_input: string, disable_terminal_input: boolean }) {

  try {
    if (!terminalSelector) {
      throw ({ message: "No Query Selector was provided." })
      return;
    }

    let DEF_SETTINGS: { allow_scroll: boolean, prompt: string, command_key: number, terminal_killed_placeholder: string, terminal_output: string, terminal_input: string, disable_terminal_input: boolean } = {
      allow_scroll: true,
      prompt: "> ",
      command_key: 13,
      terminal_killed_placeholder: "TERMINAL DISABLED",
      terminal_output: ".termino-console",
      terminal_input: ".termino-input",
      disable_terminal_input: false
    }

    if (settings) {
      function compare(json1: object, json2: object) {
        let keys1 = Object.keys(json1);
        let keys2 = Object.keys(json2);
        if (keys1.length != keys2.length) {
          return false;
        }
        for (var i = 0; i < keys1.length; i++) {
          if (keys1[i] != keys2[i]) {
            return false;
          }
        }
        return true;
      }
      if (compare(DEF_SETTINGS, settings) != true) {
        throw {
          message: "Settings Error: Your overwritten Termino settings are not valid"
        }
      } else {
        DEF_SETTINGS = settings
      }
    }

    let terminal_console = terminalSelector.querySelector(DEF_SETTINGS.terminal_output) as HTMLElement

    let KEYCODES = [{
      "id": "SCROLL_UP_KEY",
      "key_code": 38
    }, {
      "id": "SCROLL_DOWN_KEY",
      "key_code": 40
    }];

    let Scroll_Up_Key = KEYCODES[0].key_code

    let Scroll_Down_Key = KEYCODES[1].key_code

    if (keyCodes) {
      if (keyCodes.filter(x => x.id === "SCROLL_UP_KEY").length != 0) {
        if (keyCodes.filter(x => x.id === "SCROLL_UP_KEY")[0].key_code != undefined) {
          Scroll_Up_Key = keyCodes.filter(x => x.id === "SCROLL_UP_KEY")[0].key_code
        }
      }
      if (keyCodes.filter(x => x.id === "SCROLL_DOWN_KEY").length != 0) {
        if (keyCodes.filter(x => x.id === "SCROLL_DOWN_KEY")[0].key_code != undefined) {
          Scroll_Down_Key = keyCodes.filter(x => x.id === "SCROLL_DOWN_KEY")[0].key_code
        }
      }
      KEYCODES = keyCodes
    }

    let Command_Key = DEF_SETTINGS.command_key

    terminalSelector.addEventListener('keydown', e => {
      if (DEF_SETTINGS.disable_terminal_input != true) {
        checkIfCommand()
      }
      if (DEF_SETTINGS.allow_scroll === true) {
        if (e.keyCode == Scroll_Up_Key) {
          terminal_console.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else if (e.keyCode == Scroll_Down_Key) {
          terminal_console.scrollTop = terminal_console.scrollHeight;
        }
      }
    });

    let InputState = false;

    function termInput(question: string): Promise<string | undefined> {
      return new Promise(function (resolve) {
        terminal_console.innerHTML += question
        termClearValue()
        scrollTerminalToBottom()
        InputState = true;
        function handleCommandForQuestion(event: KeyboardEvent) {
          if (event.keyCode == Command_Key) {
            if (window.event.preventDefault) {
              window.event.preventDefault()
            }
            let value = (terminalSelector.querySelector(DEF_SETTINGS.terminal_input) as HTMLInputElement).value
            termClearValue()
            (terminalSelector.querySelector(DEF_SETTINGS.terminal_input) as HTMLInputElement).removeEventListener('keypress', handleCommandForQuestion);
            InputState = false;
            if (value.length != 0) {
              termEcho(value)
              resolve(value)
            } else {
              termEcho("")
              resolve()
            }
          }
        }
        terminalSelector.querySelector(DEF_SETTINGS.terminal_input)?.addEventListener('keypress', handleCommandForQuestion);
      })
    }

    function termEcho(command: string) {
      terminal_console.innerHTML += `<pre>${DEF_SETTINGS.prompt} ${command}</pre>`
      scrollTerminalToBottom()
    }

    function termOutput(command: string) {
      terminal_console.innerHTML += `<pre>${command}</pre>`
      scrollTerminalToBottom()
    }

    function termClear() {
      terminal_console.innerHTML = ``
    }

    const termDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

    function termDisable() {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input)?.setAttribute("disabled", "");
    }

    function termEnable() {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input)?.removeAttribute("disabled", "");
    }

    function termClearValue() {
      (terminalSelector.querySelector(DEF_SETTINGS.terminal_input) as HTMLInputElement).value = ""
    }

    function scrollTerminalToBottom() {
      terminal_console.scrollTop = terminal_console.scrollHeight;
    }

    function scrollTerminalToTop() {
      terminal_console.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    if (DEF_SETTINGS.disable_terminal_input === true) {
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input)?.setAttribute("disabled", "");
    }

    function addElementWithID(id: string, html: string, class_name: string) {
      let g = null;
      g = document.createElement('div');
      if (class_name) {
        g.setAttribute("class", class_name);
      }
      g.setAttribute("id", id);
      if (html) {
        g.innerHTML = html
      }
      terminal_console.appendChild(g);
    }

    function removeElementWithID(id: string) {
      try {
        terminalSelector.querySelector("#" + id)?.outerHTML = "";
      } catch (error) {
        throw {
          message: `Error could not find ${error.message}`
        }
      }
    }

    function termKill() {
      termClear()
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input)?.setAttribute("disabled", "");
      terminalSelector.querySelector(DEF_SETTINGS.terminal_input)?.setAttribute("placeholder", DEF_SETTINGS.terminal_killed_placeholder);
    }

    
    async function checkIfCommand(): Promise<void> {

  let key: number = window.event.keyCode;
console.log(key)
  /// RUN ANY FUNCTIONS FOR KEYCODES / KEYBIND SHORTCUTS / BUTTONS. 
  for (let i: number = 0; i < KEYCODES.length; i++) {
    if (key === KEYCODES[i].key_code) {
      try {
        if (KEYCODES[i].function) {
          KEYCODES[i].function();
        }
      } catch (error) {
        console.error(`Termino.js: KeyCode Function Error: ${error.message}`);
        throw {
          message: `Termino.js: KeyCode Function Error: ${error.message}`,
        };
      }
    }
  }

  /// MAKE SURE USER IS NOT ANSWERING A QUESTION
  if (InputState !== true) {

    /// ECHO INPUT VALUE ON COMMAND BUTTON - BY DEFAULT IS ENTER. 
    if (key === Command_Key) {

      /// STOP ENTER FROM GOING DOWN / DOING WEIRD THINGS..
      if (window.event.preventDefault) {
        window.event.preventDefault();
      }

      termEcho(terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value);
 /// CLEAR OUTPUT  
      termClearValue();
      
      /// ECHO USER INPUT     
      handleInput(terminalSelector.querySelector(DEF_SETTINGS.terminal_input).value);

     
    }
  }
}
    
    return {
      echo: termEcho,
      output: termOutput,
      clear: termClear,
      delay: termDelay,
      disable_input: termDisable,
      enable_input: termEnable,
      input: termInput,
      scroll_to_bottom: scrollTerminalToBottom,
      scroll_to_top: scrollTerminalToTop,
      add_element: addElementWithID,
      remove_element: removeElementWithID,
      kill: termKill
    };
  } catch (error) {
    console.error(`Termino.js Error: ${error.message}`)
    throw {
      message: `Termino.js Error: ${error.message}`
    }
  }
}

if (typeof document === 'undefined') {
  console.error("Termino.js is only supported for the browser")
}

// made with https://js2ts.com/
        let term= Termino(document.getElementById("terminal"))
        term.echo("Hello world from https://github.com/MarketingPipeline")
