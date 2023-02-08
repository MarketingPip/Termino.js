// Example of a Termio.js app that works via Node.js CLI or in the browser! 
let T;
async function init(){
if (typeof process !== 'undefined'){
  // Node.js based Termino.js app. 
   T = Termino()
} else{
 // Browser based Termino.js app.
  let {Termino} = await import('https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.0/dist/termino.min.js') 
   T = Termino(document.getElementById("terminal"))
  
}
}
init()
