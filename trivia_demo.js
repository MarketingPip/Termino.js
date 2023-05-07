/* TERMINO.JS: CUSTOM CSS / STYLING DEMO.
* NOTE: VERSION 1.0.1 USED IN THIS DEMO.
* THIS IS A DEMO SHOWING HOW TO CUSTOM STYLE / DESIGN YOUR TERMINO.JS INSTANCE
* More info about Termino.js can be found at - https: //github.com/MarketingPipeline/Termino.js
*/

import {Termino} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.1/dist/termino.min.js';
// initialize a Terminal via Termino.js


let term = Termino(document.getElementById("Example_Terminal_CSS_Demo"))


/// THIS MIRRORS THE TEXT FROM INPUT BOX. 
document.addEventListener("click", (event) => {
  document.getElementById("hidden_termino_input").focus()
});

let mirror = document.getElementById('mirror');

document.getElementById("hidden_termino_input").focus() // focus / click the text input (BY DEFAULT - WHEN OPENING PAGE)


// handle your events for your hidden input!
document.getElementById("hidden_termino_input").addEventListener('keyup', function(event) {
  if (event.keyCode === 13) { // Clear the Text On Your Command Key! (should match your Termino Command Key)
    mirror.innerText = `> `
  } else {
    mirror.innerText = `>  ${event.target.value}` // Mirror the text in your Termino!
  }

});
//// END OF MIRROR FUNCTION. 


/// BASIC EXAMPLE HOW TO ASK A QUESTION VIA TERMINO.JS

let term2value = await term.input("What would you like to do?")
term.output(`You said ${term2value}`)

async function trivia() {
  const response = await fetch("https://opentdb.com/api.php?amount=1");
  const data = await response.json();
  const question = data.results[0].question;
  const category = data.results[0].category;
  const incorrect_answers = data.results[0].incorrect_answers
  const correct_answer = data.results[0].correct_answer
  term.echo(`Category: ${category}`);
  term.echo(`Question: ${question}`);
  term.output(incorrect_answers + correct_answer)
  
  const guess = await term.input("")
  
  if(guess.toLowerCase() === correct_answer.toLowerCase()){
  term.echo("Correct answer! Good job")
  }else{
  term.echo(`That was incorrect the answer was ${question}`)
  
  }
}
try{
trivia()
}catch(error){
console.log(error)
}
