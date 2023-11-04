<!DOCTYPE html>
<html>
<head>
  <title>Key Press Event Example</title>
</head>
<body>
  <input type="text" id="inputField">
  <script>

const keyCodeMapping = {
    "8": "backspace",
    "9": "tab",
    "13": "enter",
    "16": "shift",
    "17": "control",
    "18": "alt",
    "19": "pause",
    "20": "capslock",
    "27": "escape",
    "32": "space",
    "33": "pageup",
    "34": "pagedown",
    "35": "end",
    "36": "home",
    "37": "arrowleft",
    "38": "arrowup",
    "39": "arrowright",
    "40": "arrowdown",
    "45": "insert",
    "46": "delete",
    "48": "0",
    "49": "1",
    "50": "2",
    "51": "3",
    "52": "4",
    "53": "5",
    "54": "6",
    "55": "7",
    "56": "8",
    "57": "9",
    "65": "a",
    "66": "b",
    "67": "c",
    "68": "d",
    "69": "e",
    "70": "f",
    "71": "g",
    "72": "h",
    "73": "i",
    "74": "j",
    "75": "k",
    "76": "l",
    "77": "m",
    "78": "n",
    "79": "o",
    "80": "p",
    "81": "q",
    "82": "r",
    "83": "s",
    "84": "t",
    "85": "u",
    "86": "v",
    "87": "w",
    "88": "x",
    "89": "y",
    "90": "z",
    "91": "metaleft",
    "92": "metaright",
    "93": "contextmenu",
    "96": "numpad0",
    "97": "numpad1",
    "98": "numpad2",
    "99": "numpad3",
    "100": "numpad4",
    "101": "numpad5",
    "102": "numpad6",
    "103": "numpad7",
    "104": "numpad8",
    "105": "numpad9",
    "106": "numpadmultiply",
    "107": "numpadadd",
    "109": "numpadsubtract",
    "110": "numpaddecimal",
    "111": "numpaddivide",
    "112": "f1",
    "113": "f2",
    "114": "f3",
    "115": "f4",
    "116": "f5",
    "117": "f6",
    "118": "f7",
    "119": "f8",
    "120": "f9",
    "121": "f10",
    "122": "f11",
    "123": "f12"
}
    
function getKeynameFromKeyCode(keyCode, keyCodeMapping) {
  // Iterate through the mapping object
    if (keyCodeMapping[parseInt(keyCode)]) {
      return String(keyCodeMapping[parseInt(keyCode)]).toLowerCase();
    }
  return false;
}

    
    
const checkKeynameMatchesKeys = (keyBindings) => {
  for (let i = 0; i < keyBindings.length; i++) {
    const binding = keyBindings[i];

    if (binding) {
      for (let j = 0; j < keyBindings.length; j++) {
        if (i !== j) {
          const otherBinding = keyBindings[j];
          if (otherBinding.keys && otherBinding.keys.length > 0) {
          
            if (String(binding.keyname).toLowerCase() === otherBinding.keys[0].toLowerCase()) {
              throw new Error(
                `Keyname '${binding.keyname}' matches the first key in 'keys' for object with id '${otherBinding.id}'`
              );
            }
           
          if(binding.keycode && String(getKeynameFromKeyCode(binding.keycode, keyCodeMapping)) === otherBinding.keys[0].toLowerCase()){
           
            throw new Error(
                `Keyname '${binding.keycode}' matches the first key in 'keys' for object with id '${otherBinding.id}'`
              );
            
            }
          }
        }
      }
    }
  }
};

//
    
    function validateKeyBinding(keyBindings) {
  keyBindings.forEach((binding) => {
    if (
      (binding.keycode && binding.keys) || // Either keycode or keys, but not both
      (binding.keycode && typeof binding.keycode !== 'number') || // Keycode should be a number
      (binding.keys && (!Array.isArray(binding.keys) || binding.keys.length === 0)) 
    ) {
      throw new Error(`Invalid key binding: ${JSON.stringify(binding)}`);
    }
  });
      checkKeynameMatchesKeys(keyBindings);
}
    // Define an array of key binding objects
    const keyBindings = [
      {
        id: "CLEAR_TERM",
        function: termClear,
        keycode:17 , // Delete key
      },
      {
        id: "CUSTOM_ACTION",
        function: function(){
        console.log("g")
        },
        keyname:"v", // Ctrl+Shift+A
        preventEventDefault:true
      },
      {
        id: "CUSTOM_ACTION",
        function: function(){
        console.log("gbb")
        },
        keys: ['Alt', 'KeyV'], // Ctrl+Shift+A
        preventEventDefault:true
      },
      {
        id: "ANOTHER_ACTION",
        function: anotherAction,
        keys: ['Control', 'Shift', 'KeyV'], // Ctrl+Shift+V
      },
      // Add more key binding objects as needed
    ];

validateKeyBinding(keyBindings)

    // Define the input field
    const inputField = document.getElementById('inputField');

    // Track pressed keys
    const pressedKeys = new Set();

    // Add event listeners for keydown and keyup events to track pressed keys
    document.addEventListener('keydown', (event) => {
      pressedKeys.add(event.key);
    });

    document.addEventListener('keyup', (event) => {
      pressedKeys.delete(event.key);
    });

    // Add an event listener to the input field
    inputField.addEventListener('keydown', function(event) {
      event.preventDefault()
      const keyname = event.code;
      const keycode = event.keyCode;
     console.log(keyname)
      const keyBindingsWithKeys = keyBindings.filter(binding => binding.keys);
      let keyBinding = null;

      const keyCombination = [...pressedKeys, keyname].sort().join('+');
      keyBinding = keyBindingsWithKeys.find(binding => binding.keys.sort().join('+') === keyCombination);

      if (!keyBinding) {
        const keyBindingsWithoutKeys = keyBindings.filter(binding => !binding.keys);
        
       keyBinding = keyBindingsWithoutKeys.find(binding => binding.keyname && binding.keyname === event.key || binding.keycode === keycode);
         ////
   
      }

      if (keyBinding && typeof keyBinding.function === 'function') {
        keyBinding.function();
      }
    });

    // Define the functions associated with the key bindings
    function termClear() {
      console.log('Clearing the term');
      // You can replace this console.log with your custom logic
    }

    function customAction() {
      console.log('Performing custom action');
      // You can replace this console.log with your custom logic
    }

    function anotherAction() {
      console.log('Performing another action');
      // You can replace this console.log with your custom logic
    }
  </script>
</body>
</html>
