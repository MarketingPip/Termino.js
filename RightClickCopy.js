function handleRightClick(selector) {
  const area = document.querySelector(selector);

  area.addEventListener('contextmenu', (event) => {
    if (window.getSelection().toString()) {
      // If there is highlighted text, copy it to the clipboard
      copyToClipboard(window.getSelection().toString());
    } else {
      // If there is no highlighted text, paste the value from the clipboard
      pasteFromClipboard().then((value) => {
        // Do something with the pasted value (e.g., update a form field)
        document.querySelector(".termino-input").value = value;
      });
    }
  });
}

function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function pasteFromClipboard() {
  return new Promise((resolve) => {
  let t = navigator.clipboard.readText()
    resolve(t);
  
  });
}

// Example usage:
handleRightClick('#myTextArea');


    import {Termino} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.2/dist/termino.min.js';
        let term= Termino(document.getElementById("terminal"))
        term.echo("Hello world from https://github.com/MarketingPipeline")
