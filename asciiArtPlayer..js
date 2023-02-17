/* function to play ascii art from list with option to set infinite loops, time to change each animation frame. */
function playAsciiArt(asciiArtList, infiniteLoop, timeToChange) {
  var asciiArtIndex = 0;
  var asciiArt = document.createElement('div');
  asciiArt.innerHTML = asciiArtList[asciiArtIndex];
  document.body.appendChild(asciiArt);
  var asciiArtInterval = setInterval(function() {
    asciiArtIndex++;
    if (asciiArtIndex >= asciiArtList.length) {
      if (infiniteLoop) {
        asciiArtIndex = 0;
      } else {
        clearInterval(asciiArtInterval);
      }
    }
    asciiArt.innerHTML = asciiArtList[asciiArtIndex];
  }, timeToChange);
}
/* function to remove the element and clear interval if any. */
function removeElement(element, interval) {
  if (element) {
    document.body.removeChild(element);
  }
  if (interval) {
    clearInterval(interval);
  }
}
/* example of play Ascii art with loading bar infinite */
var asciiArtList = [
  'Loading...',
  'Loading..',
  'Loading.',
  'Loading',
  'Loadin',
  'Loadi',
  'Load',
  'Loa',
  'Lo',
  'L',
  '',
  'L',
  'Lo',
  'Loa',
  'Load',
  'Loadi',
  'Loadin',
  'Loading',
  'Loading.',
  'Loading..',
  'Loading...'
];
playAsciiArt(asciiArtList, true, 100);











/* function to play ascii art from list with option to set infinite loops, time to change each animation frame. */
function playAsciiArt(asciiArtList, infiniteLoop, timeToChange) {
  var asciiArtIndex = 0;
  var asciiArt = document.createElement('div');
  asciiArt.innerHTML = asciiArtList[asciiArtIndex];
  document.body.appendChild(asciiArt);
  var asciiArtInterval = setInterval(function() {
    asciiArtIndex++;
    if (asciiArtIndex >= asciiArtList.length) {
      if (infiniteLoop) {
        asciiArtIndex = 0;
      } else {
        asciiArtIndex =  asciiArtList.length - 1
        clearInterval(asciiArtInterval);
      }
    }
    asciiArt.innerHTML = asciiArtList[asciiArtIndex];
  }, timeToChange);
}
/* function to remove the element and clear interval if any. */
function removeElement(element, interval) {
  if (element) {
    document.body.removeChild(element);
  }
  if (interval) {
    clearInterval(interval);
  }
}




/* asciiArtList for Wake Up Neo.. the Martix has you. */
var asciiArtList = [
  'Wake up, Neo...',
  'The Matrix has you...',
  'Follow the white rabbit.',
  'Knock, knock, Neo.x'
];
playAsciiArt(asciiArtList, false, 1000);
