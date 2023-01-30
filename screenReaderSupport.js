/* terminal with Screen reader and minimum contrast ratio support . */
var terminal = document.createElement('div');
terminal.innerHTML = '<div class="terminal"><div class="terminal-header"><div class="terminal-header-button terminal-header-button-close"></div><div class="terminal-header-button terminal-header-button-minimize"></div><div class="terminal-header-button terminal-header-button-maximize"></div><div class="terminal-header-title">Terminal</div></div><div class="terminal-body"><div class="terminal-body-prompt">$</div><div class="terminal-body-content"><div class="terminal-body-content-line">Hello World</div></div></div></div>';
document.body.appendChild(terminal);
/* function for minimum contrast ratio support */
function contrastRatio(color1, color2) {
  var l1 = luminance(color1);
  var l2 = luminance(color2);
  var ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio;
}
function luminance(color) {
  var rgb = color.match(/\d+/g);
  var r = parseInt(rgb[0], 10) / 255;
  var g = parseInt(rgb[1], 10) / 255;
  var b = parseInt(rgb[2], 10) / 255;
  var a = parseFloat(rgb[3]) || 1;
  var l = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  return l;
}
/* function for Screen reader support */
function screenReader() {
  var elements = document.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var elementStyle = window.getComputedStyle(element);
    var elementColor = elementStyle.getPropertyValue('color');
    var elementBackgroundColor = elementStyle.getPropertyValue('background-color');
    var elementContrastRatio = contrastRatio(elementColor, elementBackgroundColor);
    if (elementContrastRatio < 4.5) {
      element.style.color = '#ffffff';
    }
  }
}
/* example usage of screenReader. */
screenReader();