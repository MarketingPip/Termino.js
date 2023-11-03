import { Termino } from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.0/dist/termino.min.js';

function createTerminal() {
 

  const queue = [];
 let term = null;
  const terminalPrompt = document.getElementById('terminal-prompt');
   let processingInput = false; // Flag to indicate if input is being processed

  // Custom function to handle the termination of the terminal
  function terminalClosed() {
    console.log('Terminal Closed');
    // You can perform any additional actions here when the terminal is closed.
  }

  // Custom function to process the queue
  async function processQueue() {
     const terminalDiv = document.getElementById('terminal');
     term = Termino(terminalDiv);
    while (queue.length > 0) {
      const item = queue.shift();

      if (item.type === 'echo') {
        term.echo(item.message);
      } else if (item.type === 'input') {
      
          let userInput = null;
        
        if(item?.sameLine === true){  
         let promptValue = terminalPrompt.innerHTML 
        terminalPrompt.innerHTML = item.message
        userInput = await term.input("");
        terminalPrompt.innerHTML = promptValue
        }
        //
         if(item?.sameLine != true){  
         userInput = await term.input(item.message);
        }  
          
          
       if(item.callback){
         item.callback(userInput)
       }
       }
      
    }//

    if (queue.length === 0) {
      terminalClosed();
    }
  }
//
  // Custom function to add echo items to the queue
  function echo(message) {
    queue.push({ type: 'echo', message });
  }

  // Custom function to add input items to the queue
  function input(message, callback = null) {
   
      
    
   queue.push({ type: 'input', message, callback });
      
 
  }
 
  
  function sameLineInput(message, callback = null){
    queue.push({ type: 'input', message, callback, sameLine:true });
  }
  
  
  function kill(callback =null, clear=true){
    
    if(callback){
      callback()
    }
    
    if(clear){
      term.clear()
    }
    
    queue.length = 0;

  }

  
  
  return {
    echo,
    input,
    kill,
    processQueue,
    sameLineInput
  };
}

const terminal = createTerminal();


async function t(a, b, c){
  console.log("called")
 terminal.input('Enter your name again:', async function(name) {
    terminal.echo(`Hello, ${name}!`);
  });
}

function bb(b){
  terminal.kill(t('hello', 'world', 'dude'), false)
}


 function d(v) {
      console.log(v + " cool");
    }
// Example usage
(async () => {
  terminal.echo('Hello world from https://github.com/MarketingPipeline');
 terminal.input('Enter your name:', async function(name) {
    terminal.echo(`Hello, ${name}!`);
    terminal.echo("test");
   
    terminal.input("hello agaom 2", d);
   
   
  // t()//
   //
    terminal.input("hello agaom", d);
    // console.log(d)
  });
 
})();
terminal.processQueue();
