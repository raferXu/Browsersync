/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// {
//   let a = 1;
//   var b = 2;
//   console.log(a);
// }
// console.log(a);
// console.log(b);

// console.log(a);
// var a = 1;

// console.log(b);
// let b = 2;

// typeof c;
// let c = 10;

// let f = 1;
// function fn() {
//   f = 2;
// }
// fn();

// let f = 1;
// function fn() {
//   f = 2;
//   let f = 3;
// }
// fn();

// var a = 1;
// let a;

// let a = 1;
// let a = 2;

// var btns = document.querySelectorAll('button');
// for(var i=0;i<btns.length;i++){
//   btns[i].onclick = function () {
//     console.log(i);
//   }
// }

// var btns = document.querySelectorAll('button');
// for(var i=0;i<btns.length;i++){
//   btns[i].index = i;
//   btns[i].onclick = function () {
//     console.log(this.index);
//   }
// }

// var btns = document.querySelectorAll('button');
// for(var i=0;i<btns.length;i++){
//   (function (i) {
//     btns[i].onclick = function () {
//       console.log(i);
//     };
//   })(i);
// }

// var btns = document.querySelectorAll('button');
// for(let i=0;i<btns.length;i++){
//   btns[i].onclick = function () {
//     console.log(i);
//   }
// }

// for(let i=0;i<3;i++){
//   let i = 10;
//   console.log(i);
// }
// console.log(i);


// var a;
// let b;
// const c;

// const a = 1;
// a = {};

// const obj = {a: 20};
// obj.a = 2;
// console.log(obj);





// 解构赋值
// let [a, b, c] = [1, 2, 3];
// console.log(a, b, c);

// let [a, [[b], c]] = [1, [[2], 3]];
// console.log(a, b, c);

// let[, , c] = [1, 2, 3];
// console.log(c);

// let [x] = [];
// console.log(x);

// let [y=1] = [];
// console.log(y);

// let {a, b} = {b: 'bbb', a: 'aaa'};
// console.log(a, b);

// let {a: b} = {a: 1};
// console.log(b);
// console.log(a);

// let [a, b, c, d] ='1234';
// console.log(a, b, c, d);

// let {length: len} = 'rafer';
// console.log(len);

// let {toString: ts} = 1;
// let {toString: bs} = true;
// console.log(ts === Number.prototype.toString);
// console.log(bs === Boolean.prototype.toString);

// null和undefined不能进行解构赋值
// let [a] = null;





// 数据结构Set
// 特点：key和value相同，没有重复的value

// const s = new Set([1, 2, 3]);
// console.log(s);

// console.log(s.size);

// s.add('a').add('b').add('c');
// console.log(s);

// console.log(s.delete('a'));
// console.log(s);

// console.log(s.delete('a'));
//
// console.log(s.has('a'));
// console.log(s.has(1));
//
// // s.clear();
// // console.log(s);
//
// console.log(s.keys());
//
// console.log(s.values());
//
// console.log(s.entries());
//
// s.forEach(function (value, key, set) {
//   console.log(value + ' rafer');
// });
// console.log(s);
//
// s.add(1);  //Set不允许有重复的数据，可以用来数组去重
// console.log(s);





// 数据结构Map,      键的范围不限于字符串.
// JS对象只能用字符串当作键，所以遇到非字符串当作键的自动调用toString方法
// var data1 = {a: 1}, data2 = {b: 2}, obj = {};
// obj[data1] = 1;
// obj[data2] = 2;
// console.log(obj);  //{[object Object]: 2}
// console.log(data1.toString());
// console.log(data1.toString() === data2.toString());

const map = new Map([
  ['a',1],['b',2]
]);
console.log(map);
console.log(map.size);

map.set('rafer','35').set('lebron','james').set('rafer','xu');
console.log(map);

console.log(map.get('rafer'));
console.log(map.get('kevin'));

console.log(map.delete('a'));
console.log(map);
console.log(map.delete('a'));

console.log(map.has('lebron'));
console.log(map.has('neal'));

// map.clear();
// console.log(map);

console.log(map.keys());
console.log(map.values());
console.log(map.entries());

map.forEach(function (value, key, map) {
  console.log(value+' : '+key);
});

map.set(NaN,111).set(NaN,222);
console.log(map);

map.set({},'x').set({},'y');
console.log(map);
console.log({} === {})





// iterator和for-of循环






// class的基本使用






// class的继承






// Symbol数据类型






// 内置对象的扩展






// 函数的扩展






// 异步操作之Promise







/***/ })
/******/ ]);