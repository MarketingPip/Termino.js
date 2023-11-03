import { Termino } from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.0/dist/termino.min.js';

function createTerminal() {
  const terminalDiv = document.getElementById('terminal');
  const term = Termino(terminalDiv);

  const queue = [];

  // Custom function to handle the termination of the terminal
  function terminalClosed() {
    console.log('Terminal Closed');
    // You can perform any additional actions here when the terminal is closed.
  }

  // Custom function to process the queue
  async function processQueue() {
    while (queue.length > 0) {
      const item = queue.shift();

      if (item.type === 'echo') {
        term.echo(item.message);
      } else if (item.type === 'input') {
        if (queue.length === 0) {
        const userInput = await term.input(item.message);
       if(item.callback){
         item.callback(userInput)
       }
       }
      }
    }

    if (queue.length === 0) {
      terminalClosed();
    }
  }

  // Custom function to add echo items to the queue
  function echo(message) {
    queue.push({ type: 'echo', message });
  }

  // Custom function to add input items to the queue
  function input(message, callback) {
   
      queue.push({ type: 'input', message, callback });
        
 
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
  };
}

const terminal = createTerminal();


function t(a, b, c){
  console.log(a, b, c)
}

function bb(b){
  terminal.kill(t('hello', 'world', 'dude'), false)
}

// Example usage
(async () => {
  terminal.echo('Hello world from https://github.com/MarketingPipeline');
  const userInput = await terminal.input('enter something',bb );
 
})();
terminal.processQueue();
