/* function to check if a json list contain  "id": "SCROLL_UP_KEY" */
function checkScrollUp(jsonList) {
  for (var i = 0; i < jsonList.length; i++) {
    if (jsonList[i].id == "SCROLL_UP_KEY") {
      return true;
    }
  }
  return false;
}
/* function to check if a json list contains object with "id": "SCROLL_UP_KEY"  & "key_code". Make sure keycode is not undefined / null etc. */
function checkScrollUpKeyCode(jsonList, keyCode) {
  for (var i = 0; i < jsonList.length; i++) {
    if (jsonList[i].id == "SCROLL_UP_KEY" && jsonList[i].key_code == keyCode) {
      return true;
    }
  }
  return false;
}
