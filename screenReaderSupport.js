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






/* function for screen reader support with error handling if support not detected in browser. */
function screenReaderSupport() {
  try {
    var speechSynthesis = window.speechSynthesis;
    var voices = speechSynthesis.getVoices();
    var voice = voices[0];
    var utterance = new SpeechSynthesisUtterance('Hello World');
    utterance.voice = voice;
    speechSynthesis.speak(utterance);
  } catch (e) {
    console.log('Screen reader support not detected in browser.');
  }
}
/* example usage screenReaderSupport() */
screenReaderSupport();









/// taken from https://stackoverflow.com/questions/21513706/getting-the-list-of-voices-in-speechsynthesis-web-speech-api
```
const allVoicesObtained = new Promise(function(resolve, reject) {
  let voices = window.speechSynthesis.getVoices();
  if (voices.length !== 0) {
    resolve(voices);
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", function() {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    });
  }
});

allVoicesObtained.then(voices => console.log("All voices:", voices));

```





/* function to set text to speech with language, voice, country etc. */
function setTextToSpeech(text, lang, voice, country, gender, rate, pitch, volume) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = lang;
  msg.voice = voice;
  msg.voiceURI = 'native';
  msg.volume = volume;
  msg.rate = rate;
  msg.pitch = pitch;
  msg.onend = function(e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
  };
  speechSynthesis.speak(msg);
}
