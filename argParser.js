/* function to extract arguments from strings like example "python -h -V -add 1" */
function extractArgs(str) {
  var args = str.split(' ');
  var result = [];
  for (var i = 0; i < args.length; i++) {
    if (args[i].length > 0) {
      result.push(args[i]);
    }
  }
  return result;
}
/* example of usage and show results in html. */
var args = extractArgs('python -h -V -add 1');
var argsDiv = document.createElement('div');
argsDiv.innerHTML = 'args: ' + args;
document.body.appendChild(argsDiv);
/* create a list with  python command that on "python" console log hello. And on python -h console log help. Add support for multiple Args used. */
var commands = [
  {
    name: 'python',
    args: [],
    action: function() {
      console.log('hello');
    }
  },
  {
    name: 'python',
    args: ['-h'],
    action: function() {
      console.log('help');
    }
  }
];
/* a similar this with object with multiple args example -h -v and option to return parsed arg value */
var commands = [
  {
    name: 'python',
    args: ['-h', '-v'],
    action: function(args) {
      console.log('help');
      console.log('version');
      console.log('args: ' + args);
    }
  }
];
/* create a input */
var input = document.createElement('input');
input.type = 'text';
document.body.appendChild(input);
/* create a function to use commands in json list if match on enter key to input. with support to check if command has arg to choose the correct command. */
function runCommand(command) {
  var args = extractArgs(command);
  var commandName = args[0];
  var commandArgs = args.slice(1);
  for (var i = 0; i < commands.length; i++) {
    if (commands[i].name === commandName && commands[i].args.length === commandArgs.length) {
      commands[i].action(commandArgs);
      return;
    }
  }
  console.log('command not found');
}
/* on enter key on input run command with value. */
input.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    runCommand(input.value);
  }
});
