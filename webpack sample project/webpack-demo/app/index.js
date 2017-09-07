/**
 * Created by raferxu on 17/9/6.
 */
import _ from 'lodash';
function component () {
  var element = document.createElement('div');

  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}
var moment = require('moment');
console.log(moment().format());
document.body.appendChild(component());