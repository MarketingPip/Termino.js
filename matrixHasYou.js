var asciiArtList = ["W", "Wa", "Wak", "Wake", "Wake", "Wake u", "Wake up", "Wake up,", "Wake up,", "Wake up, N", "Wake up, Ne", "Wake up, Neo", "Wake up, Neo.", "Wake up, Neo..", "Wake up, Neo...", "Wake up, Neo...", "Wake up, Neo..", "Wake up, Neo.", "Wake up, Neo", "Wake up, Ne", "Wake up, N", "Wake up,", "Wake up,", "Wake up", "Wake u", "Wake", "Wake", "Wak", "Wa", "W", "T", "Th", "The", "The", "The M", "The Ma", "The Mat", "The Matr", "The Matri", "The Matrix", "The Matrix", "The Matrix h", "The Matrix ha", "The Matrix has", "The Matrix has", "The Matrix has y", "The Matrix has yo", "The Matrix has you", "The Matrix has you.", "The Matrix has you..", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you...", "The Matrix has you..", "The Matrix has you.", "The Matrix has you", "The Matrix has yo", "The Matrix has y", "The Matrix has", "The Matrix has", "The Matrix ha", "The Matrix h", "The Matrix", "The Matrix", "The Matri", "The Matr", "The Mat", "The Ma", "The M", "The", "The", "Th", "T", "F", "Fo", "Fol", "Foll", "Follo", "Follow", "Follow", "Follow t", "Follow th", "Follow the", "Follow the", "Follow the w", "Follow the wh", "Follow the whi", "Follow the whit", "Follow the white", "Follow the white", "Follow the white r", "Follow the white ra", "Follow the white rab", "Follow the white rabb", "Follow the white rabbi", "Follow the white rabbit", "Follow the white rabbit.", "Follow the white rabbit.", "Follow the white rabbit", "Follow the white rabbi", "Follow the white rabb", "Follow the white rab", "Follow the white ra", "Follow the white r", "Follow the white", "Follow the white", "Follow the whit", "Follow the whi", "Follow the wh", "Follow the w", "Follow the", "Follow the", "Follow th", "Follow t", "Follow", "Follow", "Follo", "Foll", "Fol", "Fo", "F", "K", "Kn", "Kno", "Knoc", "Knock", "Knock,", "Knock,", "Knock, k", "Knock, kn", "Knock, kno", "Knock, knoc", "Knock, knock", "Knock, knock,", "Knock, knock,", "Knock, knock, N", "Knock, knock, Ne", "Knock, knock, Neo", "Knock, knock, Neo.", "Knock, knock, Neo..", "Knock, knock, Neo..", "Knock, knock, Neo.", "Knock, knock, Neo", "Knock, knock, Ne", "Knock, knock, N", "Knock, knock,", "Knock, knock,", "Knock, knock", "Knock, knoc", "Knock, kno", "Knock, kn", "Knock, k", "Knock,", "Knock,", "Knock", "Knoc", "Kno", "Kn", "K", ""]


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

playAsciiArt(asciiArtList, false, 100);
