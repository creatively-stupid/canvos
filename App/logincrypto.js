/**
@callback ValidateCallback
@param {Boolean} valid - token is valid
*/

/**
@desc validates token
@param {string} token - token to valdate
@param {ValidateCallback} valid - token is valid
*/
function validate(cookieVal, yey) {
  if (cookieVal) {
    var parts = cookieVal.split(":");
    if (parts && parts[0] && parts[1]) {
      $.post("", JSON.stringify({"r":"auth","d": cookieVal}), (data) => {
        console.log(data);
        if (data && data.loggedin && data.loggedin === "true") {
          token = cookieVal;
          yey(true);
        } else {
          yey(false);
        }
      });
    } else {
      yey(false);
    }
  } else {
    yey(false);
  }
}
