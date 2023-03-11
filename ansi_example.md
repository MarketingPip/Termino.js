Example how to add ansi support to your Termino.js instance! 

```html
<!doctype html>
  <html>
    <head>
    <title>Termino.js Basic Example</title>
    </head>
    <body>
      <script src="
https://cdn.jsdelivr.net/npm/ansi_up@5.1.0/ansi_up.min.js
"></script>
      <div id="terminal">
      <pre><code class="termino-console"></code></pre>
      <textarea class="termino-input" rows="1" wrap="hard"></textarea>
      </div>
      <script type="module">
        import {Termino} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/Termino.js@v1.0.1/dist/termino.min.js';
        let term= Termino(document.getElementById("terminal"))
        var ansi_up = new AnsiUp;

    var html = ansi_up.ansi_to_html(`\x1b[48;5;120mHello from Termino.js using ANSI\x1b[0m`)
        term.echo(html)
      </script>
    </body>
  </html>
```
