

        let term= Termino(document.getElementById("terminal"))
        term.echo("print('hello')")



function errorPlugin(term, querySelector, customStyles) {
  // Define the error message styles
    let errorStyles = {
    backgroundColor: '#FF5733',
    color: 'white',
    fontWeight: 'bold',
    padding: '5px',
    class:'terminal-error',
    borderRadius: '3px',
    htmlElement:'pre'
  };
  
  
  if(customStyles){
    errorStyles = customStyles
  }

  // Define the error function
  function error(message) {
    // Create a new div to hold the error message
    const errorDiv = document.createElement(errorStyles.htmlElement);
    errorDiv.textContent = message;
    // Add the error styles to the div
    Object.assign(errorDiv.style, errorStyles);
    // Append the error div to the terminal element
    
    
    document.querySelector( querySelector).innerHTML += errorDiv.outerHTML;
    // Return the term object to allow chaining
    return term;
  }

  // Return the error function as the plugin
  return error;
}


const errorStyles = {
    backgroundColor: '#FFFFFF',
    color: 'white',
    fontWeight: 'bold',
    padding: '5px',
    class:'terminal-error',
    borderRadius: '3px',
    htmlElement:'div'
  };

// Register the plugin with Termino.js
term.plugin('error', errorPlugin(term, ".termino-console", errorStyles));

// Now you can use the error method directly on the term object like this:
term.error("hello");

// Define commands and their corresponding functions
term.addCommand('/wiki', async (args) => {
try{
  
  if(!args){
    throw{message:"No query arg was provided"}
  }
  
  // Make a request to Wikipedia API to fetch article summary
  let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${args}`);//

  // Extract and display article summary from response data
  
  response = await response.json()
  term.output(response.extract);
}catch(error){
  term.output(error.message)
}
});

term.addCommand('/chucknorris', async () => {
  // Make a request to Chuck Norris API to fetch a joke
  const response = await fetch('https://api.chucknorris.io/jokes/random');

  // Extract and display Chuck Norris joke from response data
  const joke = await response.json()
  term.echo(joke.value);
});

term.error("> test 2")
