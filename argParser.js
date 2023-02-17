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











////////

/* function to parse argument and values for commands in strings like "python -h -V -add 1" */
function parseArgs(str) {
  var args = {};
  var re = /\s*-([^\s]+)\s+([^\s]+)/g;
  var match;
  while (match = re.exec(str)) {
    args[match[1]] = match[2];
  }
  return args;
}
/* create a list with  python command that on "python" console log hello. And on python -h console log help. Add support for multiple Args used.   Add option to set value required for arg. */
var python = function(args) {
  if (args.h) {
    console.log('Help');
  } else if (args.V) {
    console.log('Version');
  } else if (args.add) {
    console.log(parseInt(args.add) + 1);
  } else {
    console.log('Hello');
  }
};
/* example usage of python add 1. */
python(parseArgs('python add 1'));
/* similar python list but with multiple argument required for a function. */
var python = function(args) {
  if (args.h) {
    console.log('Help');
  } else if (args.V) {
    console.log('Version');
  } else if (args.add) {
    console.log(parseInt(args.add) + 1);
  } else if (args.sub) {
    console.log(parseInt(args.sub) - 1);
  } else {
    console.log('Hello');
  }
};
