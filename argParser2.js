/* create arg parse function with  supports for positional arguments, options that accept values, and on/off flags for terminal emulator. */
function parseArgs(args) {
  var parsed = {};
  var currentOption = null;
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg.startsWith('-')) {
      currentOption = arg.substring(1);
      parsed[currentOption] = true;
    } else {
      if (currentOption) {
        parsed[currentOption] = arg;
      } else {
        parsed[arg] = true;
      }
      currentOption = null;
    }
  }
  return parsed;
}
/* example of usage and show results in html. */
var args = parseArgs(['-a', '-b', '-c', 'd', '-e', 'f', 'g']);
var html = '<pre>' + JSON.stringify(args, null, 2) + '</pre>';
document.body.innerHTML = html;
/* json list of with 3 functions, for python console log hello, for python -h console log help for python -p ARG, console log(parsed arg) */
var commands = [
  {
    name: 'python',
    description: 'Runs a Python script.',
    options: [
      {
        name: '-h',
        description: 'Prints help.',
        action: function(args) {
          console.log('Help for Python.');
        }
      },
      {
        name: '-p',
        description: 'Prints the given argument.',
        action: function(args) {
          console.log(args.p);
        }
      }
    ],
    action: function(args) {
      console.log('Hello from Python!');
    }
  }
];
/* create a input. */
var input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter a command...';
document.body.appendChild(input);
/* create a function to run any commands, if argument is required and no match return argument no found for arg. */
function runCommand(command, args) {
  var parsed = parseArgs(args);
  var options = command.options || [];
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (parsed[option.name]) {
      option.action(parsed);
      return;
    }
  }
  command.action(parsed);
}
/* create a function to extract args from string for run command. */
function extractArgs(command) {
  var args = command.split(' ');
  var commandName = args.shift();
  return {
    commandName: commandName,
    args: args
  };
}
/* on input enter key extractArgs and run command and show results in html. */
input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    var command = extractArgs(input.value);
    for (var i = 0; i < commands.length; i++) {
      var c = commands[i];
      if (c.name === command.commandName) {
        runCommand(c, command.args);
        break;
      }
    }
    var html = '<pre>' + JSON.stringify(command, null, 2) + '</pre>';
    document.body.innerHTML = html;
  }
});
