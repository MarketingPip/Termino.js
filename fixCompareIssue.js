/* function to compare two json list key names to make sure they both match. */
function compareKeys(json1, json2) {
  var keys1 = Object.keys(json1);
  var keys2 = Object.keys(json2);
  if (keys1.length != keys2.length) {
    return false;
  }
  for (var i = 0; i < keys1.length; i++) {
    if (keys1[i] != keys2[i]) {
      return false;
    }
  }
  return true;
}
