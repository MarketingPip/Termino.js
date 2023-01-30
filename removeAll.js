/* function to remove any html & unicode & emojis in string. */
function removeHTML(str) {
  var regex = /(<([^>]+)>)/ig;
  var result = str.replace(regex, "");
  return result;
}
/* function to remove all unicode from string. */
function removeUnicode(str) {
  var regex = /[^\x00-\x7F]/g;
  var result = str.replace(regex, "");
  return result;
}
/* function to remove all emojis from string. */
function removeEmojis(str) {
  var regex = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
  var result = str.replace(regex, "");
  return result;
}
/* function to remove any html and unicode and emojis - using all three functions. */
function removeAll(str) {
  var result = removeHTML(str);
  result = removeUnicode(result);
  result = removeEmojis(result);
  return result;
}


/* function to remove all ascii from string. */
function removeAscii(str) {
  return str.replace(/[^\x00-\x7F]/g, "");
}
/* function to replace all ansi from string. */
function removeAnsi(str) {
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
