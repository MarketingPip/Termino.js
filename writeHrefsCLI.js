/* function to write links to process.stdout */
function writeLinks() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    process.stdout.write(links[i].href + '\n');
  }
}
/* function to write clickable links to process.stdout */
function writeClickableLinks() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    process.stdout.write('<a href="' + links[i].href + '">' + links[i].href + '</a>\n');
  }
}
/* function to remove all html from string except for href urls. */
function removeHtml(str) {
  var re = /<a href="(.*?)">/g;
  var match;
  var result = '';
  while (match = re.exec(str)) {
    result += match[1] + '\n';
  }
  return result;
}
/* example usage of removeHtml and show results in html. */
var html = '<a href="http://www.google.com">Google</a> <a href="http://www.yahoo.com">Yahoo</a>';
var result = removeHtml(html);
var resultDiv = document.createElement('div');
resultDiv.innerHTML = result;
document.body.appendChild(resultDiv);
