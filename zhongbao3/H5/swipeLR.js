/**
 * Created by raferxu on 17/6/30.
 */
//返回角度
function GetSlideAngle(dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI;
}

//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
  var dy = startY - endY;
  var dx = endX - startX;
  var result = 0;

  var angle = GetSlideAngle(dx, dy);
  if (angle >= 45 && angle < 135) {
    result = 1;
  } else if (angle >= -135 && angle < -45) {
    result = 2;
  } else if ((angle >= 150 && angle <= 180) || (angle >= -180 && angle < -150)) {  //向左
    if(Math.abs(dx)>5){
      result = 3;
    }
  } else if (angle >= -60 && angle < 60) {  //向右
    if(Math.abs(dx)>5){
      result = 4;
    }
  }
  console.log('result: '+result);
  return result;
}