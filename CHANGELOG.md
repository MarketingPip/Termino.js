# Changelog

All notable changes to Termino.js will be documented in this file.

## [1.0.1] - (Dec 6, 2022)

This version has some major improvements & changes added to Termino.js - (including bugfixes for poor code in V1 / fixes for non working functions in V1).


### Added 
- Command Line Connector (You can now execute your Termino.js apps/ games / chatbots etc on a computer too!)
- Features to customize input, output & echo messages! 
- Fixes for some non-working functions (Options to use custom keycodes & settings was not working - due to some half-baked code making it's way into V1...) 😫


### Notes

This version requires a new JSON schema with the input & output key added. 

**New valid schema**: 
```js
      allow_scroll: true, // allow scroll up & down on terminal 
      prompt: "<pre> > {{command}} </pre>", // default prompt / echo message -  {{command}} is required inside.
      input: "<pre> {{command}} </pre>", // input message - {{command}} is required inside.
      output: "<pre> {{command}} </pre>", // output message - {{command}} is required inside. 
      command_key: 13, // default command key
      terminal_killed_placeholder: "TERMINAL DISABLED", // default terminal input placeholder when killed. 
      terminal_output: ".termino-console", // default output query selector
      terminal_input: ".termino-input", // default input query selector
      disable_terminal_input: false, // disable any user commands / inputs. --- Useful for making terminal animations etc!
```




## [1.0.0] - (Dec 6, 2022)

Initial release of Termino.js. 


<!--
These Markdown anchors provide a link to the diff for each release. They should be
updated any time a new release is cut.
-->
[1.0.0]: /v1.0.0
