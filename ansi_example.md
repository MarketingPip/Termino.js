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


```js
import ansiUp from "https://cdn.skypack.dev/ansi_up@5.1.0"


 const txt  = "\n\n\x1B[1;33;40m 33;40  \x1B[1;33;41m 33;41  \x1B[1;33;42m 33;42  \x1B[1;33;43m 33;43  \x1B[1;33;44m 33;44  \x1B[1;33;45m 33;45  \x1B[1;33;46m 33;46  \x1B[1m\x1B[0\n\n\x1B[1;33;42m >> Tests OK\n\n"
let t = new ansiUp
console.log(t.ansi_to_html(txt))
```
