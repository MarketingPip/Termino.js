/* json{hello:"world {{message}}"} */
var json = {
  hello: "world {{message}}"
};
/* let variable "Message" with "hello world" */
var message = "hello world";
/* replace {{message}} in json.hello with let variable and show output in html. */
var helloWorld = document.createElement('div');
helloWorld.innerHTML = json.hello.replace("{{message}}", message);
document.body.appendChild(helloWorld);
/* function to replace {{message}} in json.hello with let variable and show output in html with error handling if hello does not contain {{message}}. */
function replaceMessage(json, message) {
  if (json.hello.indexOf("{{message}}") > -1) {
    var helloWorld = document.createElement('div');
    helloWorld.innerHTML = json.hello.replace("{{message}}", message);
    document.body.appendChild(helloWorld);
  } else {
    var helloWorld = document.createElement('div');
    helloWorld.innerHTML = "Error: {{message}} not found in json.hello";
    document.body.appendChild(helloWorld);
  }
}
