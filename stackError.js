function logErrorWithStackTrace(error) {
  

  // Create a new Error instance to capture the stack trace
  const stackTraceError = new Error();
  
  // Remove the first line of the stack trace (which points to this function)
  stackTraceError.stack = stackTraceError.stack
 
  console.error(`${error.name}: ${error.message}${stackTraceError.stack.replace("Error", "")}
  `);
}

// Example usage
try {
  // Code that may throw an error
  const result = nonExistentVariable; // This will throw a ReferenceError
} catch (error) {
  logErrorWithStackTrace(error);
}
