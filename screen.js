function screenPlugin(term) {
  let storedScreen = '';

  return {
    open: () => {
      // Store the current screen content
      storedScreen = document.querySelector('.termino-console').innerHTML;

      // Clear the console
      term.clear();
    },
    close: () => {
      // Restore the stored screen content
      document.querySelector('.termino-console').innerHTML = storedScreen;

      // Clear the stored screen variable
      storedScreen = '';
    },
  };
}

// Register the screen plugin
term.plugin('screen', screenPlugin(term));


term.addCommand('python', async (arg1, arg2) => {
 term.screen.open()

await term.input("hello world")
term.screen.close()
});

