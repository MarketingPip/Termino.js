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
