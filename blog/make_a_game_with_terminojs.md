# How to build a game using Termino.js

## Introduction
Termino.js is a powerful JavaScript library that enables you to build command based app that works in a web application & in a non browser based enviroment. It's highly customizable and easy to use, making it an ideal choice for building things such as text-based adventure games & more. In this article, we'll explore how to build a game using Termino.js.



## How to build a game using Termino.js
Building a game using Termino.js is a fun and engaging way to learn about the library. 

Here's an example of building a simple guessing game using Termino.js:

```js
let term= Termino(document.getElementById("terminal"))

// generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// define a function to handle the user's guess
async function guessNumber(guess) {
  const num = parseInt(guess, 10);
  
  if (isNaN(num)) {
    term.echo('Please enter a valid number.');
  } else if (num < randomNumber) {
    term.echo('Too low! Guess again.');
  } else if (num > randomNumber) {
    term.echo('Too high! Guess again.');
  } else {
    term.echo('Congratulations, you guessed the number!');
    return true // return a win!
  }
}

// add a command for the user to make a guess
term.addCommand('guess', {
  description: 'Guess a number between 1 and 100.',
  action: async (guess) => guessNumber(guess),
});

// start the game
async function startGame() {
  let win = await guessNumber(await term.input("Guess a number between 1 and 100."))
  if(!win){
    startGame() // repeat the game
  }
}

startGame();
```

In this example, we first create a new Termino instance. We then generate a random number between 1 and 100 that the user will try to guess. We define a function guessNumber to handle the user's guess, which takes the user's input as an argument.

Finally, we define a startGame function that displays the initial prompt and waits for the user's input using await term.input(). This will wait for the user to type a command (such as a guess example "42") and then call the guessNumber function(). We also are repeating the game until the user guesses the correct number.
