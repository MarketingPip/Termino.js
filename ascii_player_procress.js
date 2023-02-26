/* function to play ascii animations in procress based app. */
function playAnimation(animation) {
  var animationFrame = 0;
  var animationInterval = setInterval(function() {
    if (animationFrame < animation.length) {
      console.log(animation[animationFrame]);
      animationFrame++;
    } else {
      clearInterval(animationInterval);
    }
  }, 100);
}


/* function to output to process based using stout. node js process app */
function output(text) {
  process.stdout.write(text);
}
/* similar function but to stdout value and remove it after. */
function outputAndRemove(text) {
  var div = document.createElement('div');
  div.innerHTML = text;
  document.body.appendChild(div);
  setTimeout(function() {
    document.body.removeChild(div);
  }, 1000);
}
/* similar function but for node js procress app */
function outputAndRemoveNode(text) {
  process.stdout.write(text);
  setTimeout(function() {
    process.stdout.write('\b \b');
  }, 1000);
}
/* similar function for node.js based app but remove string from procress from provided variable. */
function outputAndRemoveNode(text) {
  process.stdout.write(text);
  setTimeout(function() {
    process.stdout.write('\b \b');
  }, 1000);
}
