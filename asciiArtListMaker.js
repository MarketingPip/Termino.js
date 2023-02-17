/* function to create ascii animation list of strings from provided text. Example output ["H","He","Hell","Hello"] */
function createAsciiAnimationList(text) {
  var asciiAnimationList = [];
  for (var i = 0; i < text.length; i++) {
    asciiAnimationList.push(text.substring(0, i + 1));
  }
  return asciiAnimationList;
}
/* example of usage and show results in html with wake up neo. */
var wakeUpNeo = createAsciiAnimationList('Wake up, Neo...');
for (var i = 0; i < wakeUpNeo.length; i++) {
  var wakeUpNeoDiv = document.createElement('div');
  wakeUpNeoDiv.innerHTML = wakeUpNeo[i];
  document.body.appendChild(wakeUpNeoDiv);
}
/* similar function to create animation list but reverse from string backwards. */
function createAsciiAnimationListReverse(text) {
  var asciiAnimationList = [];
  for (var i = text.length; i > 0; i--) {
    asciiAnimationList.push(text.substring(0, i));
  }
  return asciiAnimationList;
}
/* example of reverse and show results in html. */
var theMatrixHasYou = createAsciiAnimationListReverse('The Matrix has you...');
for (var i = 0; i < theMatrixHasYou.length; i++) {
  var theMatrixHasYouDiv = document.createElement('div');
  theMatrixHasYouDiv.innerHTML = theMatrixHasYou[i];
  document.body.appendChild(theMatrixHasYouDiv);
}
/* function to create list and then create list reverse and join lists. */
function createAsciiAnimationListJoin(text) {
  var asciiAnimationList = createAsciiAnimationList(text);
  var asciiAnimationListReverse = createAsciiAnimationListReverse(text);
  return asciiAnimationList.concat(asciiAnimationListReverse);
}
/* example of usage with hello world with joined list. */
var helloWorldJoin = createAsciiAnimationListJoin('Hello World');
for (var i = 0; i < helloWorldJoin.length; i++) {
  var helloWorldJoinDiv = document.createElement('div');
  helloWorldJoinDiv.innerHTML = helloWorldJoin[i];
  document.body.appendChild(helloWorldJoinDiv);
}
