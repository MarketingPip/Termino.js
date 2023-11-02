   document.addEventListener('DOMContentLoaded', function() {
  const terminalElement = document.getElementById('terminal');
  const term = {
    inputQueue: [],
    isOpen: false,
    closeCallback: null,

    open: function() {
      if (!this.isOpen) {
        this.isOpen = true;
        this.processInputQueue();
        this.fireEvent('open');
      }
    },

    close: function() {
      if (this.isOpen) {
        this.isOpen = false;
        this.processInputQueue();
        this.fireEvent('close');
      }
    },

    input: function(prompt, callback) {
      this.inputQueue.push({ prompt, callback });
      this.processInputQueue();
    },

    echo: function(output) {
      if (this.isOpen) {
        const divElement = document.createElement('div');
        divElement.textContent = output;
        terminalElement.appendChild(divElement);
      } else {
        // Terminal is closed, so save the output for later
        this.inputQueue.push({ output });
      }
    },

    processInputQueue: function() {
      if (this.isOpen) {
        while (this.inputQueue.length > 0) {
          const item = this.inputQueue.shift();
          if (item.prompt) {
            const input = prompt(item.prompt);
            if (item.callback) {
              item.callback(input);
            }
          } else if (item.output) {
            const divElement = document.createElement('div');
            divElement.textContent = item.output;
            terminalElement.appendChild(divElement);
          }

          if (this.inputQueue.length === 0) {
            this.close();
          }
        }
      }
    },

    on: function(event, callback) {
      if (event === 'open' || event === 'close') {
        this.closeCallback = callback;
      }
    },

    fireEvent: function(event) {
      if (event === 'open' && this.isOpen) {
        if (this.closeCallback) {
          this.closeCallback();
        }
      } else if (event === 'close' && !this.isOpen) {
        if (this.closeCallback) {
          this.closeCallback();
        }
      }
    },
  };

  term.on('open', function() {
    console.log('Terminal is open');
  });

  // Usage
  term.open();

  term.on('close', function() {
    console.log('Terminal is closed');
  });

  term.input('Enter your name:', async function(name) {
    term.echo(`Hello, ${name}!`);
    term.echo("test");
    function d(v) {
      console.log(v + " cool");
       term.echo(v);
    }
    term.input("hello", d);
    // console.log(d)
  });
});
