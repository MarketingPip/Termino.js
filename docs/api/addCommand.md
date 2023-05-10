# addCommand()
The addCommand() function allows you to define custom commands in Termino.js, which can be used by the user in the terminal. You can define any number of custom commands, each with its own function handler.

## Syntax
```javascript
terminal.addCommand(command, handler);
```
## Parameters
command - The name of the custom command to be added (string).
handler - The function that will be executed when the custom command is called (function).

## Return Value
This function does not return any value.

## Example
Here's an example of how to use the addCommand() function to create a custom command:

```javascript
// Define a custom command
terminal.addCommand('/greet', () => {
  console.log('Hello, world!');
});
```
This will create a new command called /greet that will log Hello, world! to the console when executed by the user in the terminal. You can define any number of custom commands in the same way.

## Asynchronous Commands
If your command handler function is asynchronous, you can use the async keyword before the function declaration to make it work properly with the await keyword in the handleInput() function:

```javascript
// Define an asynchronous custom command
terminal.addCommand('/async', async () => {
  const result = await myAsyncFunction();
  console.log(result);
});
```
This will create an asynchronous command called /async that will wait for myAsyncFunction() to complete before logging the result to the console.
