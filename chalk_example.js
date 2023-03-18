```
import {default as chalk} from 'https://cdn.skypack.dev/@nightmarebot/chalk';
import ansiUp from "https://cdn.skypack.dev/ansi_up@5.1.0"


 const txt  = "\n\n\x1B[1;33;40m 33;40  \x1B[1;33;41m 33;41  \x1B[1;33;42m 33;42  \x1B[1;33;43m 33;43  \x1B[1;33;44m 33;44  \x1B[1;33;45m 33;45  \x1B[1;33;46m 33;46  \x1B[1m\x1B[0\n\n\x1B[1;33;42m >> Tests OK\n\n"
let t = new ansiUp


const miles = 18;
const calculateFeet = miles => miles * 5280;

document.body.innerHTML = t.ansi_to_html((chalk`
  {blue.bgRed.bold  ss ss sss s.s . }.
`))
```
