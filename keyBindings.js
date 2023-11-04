    
    
const checkKeynameMatchesKeys = (keyBindings) => {
  for (let i = 0; i < keyBindings.length; i++) {
    const binding = keyBindings[i];

    if (binding) {
      for (let j = 0; j < keyBindings.length; j++) {
        if (i !== j) {
          const otherBinding = keyBindings[j];
          if (otherBinding.keys && otherBinding.keys.length > 0) {
            console.log(binding.keyname)
            console.log(otherBinding.keys[0])
            if (binding.keyname === otherBinding.keys[0]) {
              throw new Error(
                `Keyname '${binding.keyname}' matches the first key in 'keys' for object with id '${otherBinding.id}'`
              );
            }
          }
        }
      }
    }
  }
};


    
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
        keycode:13 , // Delete key
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
     console.log(event.key)
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
