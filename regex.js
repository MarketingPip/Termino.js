/* check if array includes values that look like this example '(dsa)' */
var array = ['fgfg(dsa)', 'dsa', 'dsa(dsa)', 'dsa(dsa(dsa))'];
var regex = /\(dsa\)/;
var result = array.filter(function(value) {
  return regex.test(value);
});
console.log(result);
