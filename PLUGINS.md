# Adding Plugins to Termino.js
Termino.js allows you to add your own plugins to extend its functionality. A plugin is a JavaScript function that can be called by the Termino.js instance to perform a specific action. You can add a plugin to Termino.js using the plugin() method provided by the instance.

## Syntax
```js
term.plugin(name, pluginFn);
```
name (string): The name of the plugin.
pluginFn (function): The plugin function that will be called when the plugin is invoked.
Example
Here is a simple example of how to add a plugin to Termino.js:

```javascript
function helloWorld(term) {
  return () => {
    term.echo("Hello, world!");
  };
}
// Add the plugin to Termino.js
term.plugin("hello", helloWorld(term));

// Call the plugin
term.hello();
```
In this example, the helloWorld() function creates a plugin that echoes "Hello, world!" to the terminal. The plugin() method is then used to add this plugin to Termino.js with the name "hello". Finally, the hello() method is called to execute the plugin.

Here is another similar example: 
```js
function myPlugin(term) {
  // Define the function to be used in the plugin
  function hello(x) {
    console.log(x);
  }

  // Add the plugin method to the Termino.js instance
  term.plugin('world', hello);
}

// Example usage:
myPlugin(term);
term.world('Hello, world!'); // Outputs "Hello, world!" in the console
```

### Asynchronous Example
Plugins can also be asynchronous. Here is an example of an asynchronous plugin that waits for a specified amount of time before echoing "Hello, world!":

```javascript
function helloWorldAsync(term) {
  return async (options = {}) => {
    const { delay = 1000 } = options;
    await new Promise(resolve => setTimeout(resolve, delay));
    term.echo("Hello, world!");
  };
}
// Add the plugin to Termino.js
term.plugin("helloAsync", helloWorldAsync(term));

// Call the plugin
term.helloAsync({ delay: 3000 });
```
In this example, the helloWorldAsync() function creates an asynchronous plugin that waits for a specified amount of time before echoing "Hello, world!". The delay option specifies how long to wait before echoing the message. The plugin() method is used to add this plugin to Termino.js with the name "helloAsync". Finally, the helloAsync() method is called with the delay option set to 3000 milliseconds.


### Share your plugins!
Just like any other code you can choose to share with the community - you can share your plugins you have created with other developers that could benefit from them!

Here's a basic example showing how to used a shared plugin for Termino.js!
```js
// Import the Termino.js plugin
import pluginName from '<plugin-name>';

// Register the plugin
term.plugin("coolPlugin", pluginName());

// Call the plugin
term.coolPlugin()
```
You can find a list of shared plugins (here)[f]
