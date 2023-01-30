/* json schema of 4 objects with id, keycode and function. */
var commands = [
  {
    id: 'helloWorld',
    keycode: 'h',
    function: function() {
      var helloWorld = document.createElement('div');
      helloWorld.innerHTML = 'Hello World';
      document.body.appendChild(helloWorld);
    }
  },
  {
    id: 'clear',
    keycode: 'c',
    function: function() {
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    }
  },
  {
    id: 'addImage',
    keycode: 'i',
    function: function() {
      var img = document.createElement('img');
      img.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
      document.body.appendChild(img);
    }
  },
  {
    id: 'addVideo',
    keycode: 'v',
    function: function() {
      var video = document.createElement('video');
      video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
      video.autoplay = true;
      video.loop = true;
      video.controls = true;
      document.body.appendChild(video);
    }
  }
];
/* if key event matches any keycode in commands list run function, with error handling if function does not exist for object. */
document.addEventListener('keydown', function(event) {
  for (var i = 0; i < commands.length; i++) {
    if (event.key === commands[i].keycode) {
      try {
        commands[i].function();
      } catch (err) {
        console.log('Error: ' + err);
      }
    }
  }
});
