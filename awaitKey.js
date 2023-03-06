/* function to await any key input. */
function awaitKey() {
  return new Promise(function(resolve, reject) {
    document.addEventListener('keydown', function(event) {
      resolve(event);
    });
  });
}

/* similar function but to await provided key code. */
function awaitKeyCode(keyCode) {
  return new Promise(function(resolve, reject) {
    document.addEventListener('keydown', function(event) {
      if (event.keyCode == keyCode) {
        resolve(event);
      }
    });
  });

///

/* function to await any key input  for procress based node.js app */
function waitForKey() {
  process.stdin.setRawMode(true);
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false);
    resolve();
  }));
}
/* similar function but for keycode for node.js procress based app */
function waitForKeyCode(keyCode) {
  process.stdin.setRawMode(true);
  return new Promise(resolve => process.stdin.once('data', data => {
    process.stdin.setRawMode(false);
    if (data[0] === keyCode) {
      resolve();
    }
  }));
}
