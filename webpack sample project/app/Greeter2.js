/**
 * Created by raferxu on 17/5/28.
 */
var config = require('./config.json');
module.exports = function () {
  var greet = document.createElement('div');
  greet.textContent = config.greetText;
  return greet;
};