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

// const map = new Map([
//   ['a',1],['b',2]
// ]);
// console.log(map);
// console.log(map.size);
//
// map.set('rafer','35').set('lebron','james').set('rafer','xu');
// console.log(map);
//
// console.log(map.get('rafer'));
// console.log(map.get('kevin'));
//
// console.log(map.delete('a'));
// console.log(map);
// console.log(map.delete('a'));
//
// console.log(map.has('lebron'));
// console.log(map.has('neal'));

// map.clear();
// console.log(map);

// console.log(map.keys());
// console.log(map.values());
// console.log(map.entries());
//
// map.forEach(function (value, key, map) {
//   console.log(value+' : '+key);
// });
//
// map.set(NaN,111).set(NaN,222);
// console.log(map);
//
// map.set({},'x').set({},'y');
// console.log(map);
// console.log({} === {});





// iterator和for-of循环

// const arr = [1, 2, 3];
// function iterator(arr) {
//   let index = 0;
//   return {
//     next: function () {
//       return index < arr.length ?
//         {value: arr[index++], done: false} :
//         {value: undefined, done: true}
//     }
//   }
// }
// const it = iterator(arr);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// const arr = [1, 2, 3];
// const set = new Set(['a', 'b', 'c']);
// const map = new Map([['a',1]]);
// const itArr = arr[Symbol.iterator]();
// const itSet = set[Symbol.iterator]();
// const itMap = map[Symbol.iterator]();
// console.log(itArr);
// console.log(itSet);
// console.log(itMap);
//
// console.log(itMap.next());
// console.log(itMap.next());

// const obj = {};
// console.log(obj[Symbol.iterator]);
// const arr = [];
// console.log(arr[Symbol.iterator]);
//
// const set = new Set(['a', 'b', 'c']);
// let [x, y] = set;
// console.log(x, y);

// let str = 'rafer';
// let arrStr = [...str];
// console.log(arrStr);
//
// const arr2 = [{}, 1, 'a', 1, 'a', 'b', []];
// console.log([...new Set(arr2)]);

// const ofArr = [1, 2, 3, 4];
// for(let i of ofArr){
//   console.log(i);
// }
//
// const m = new Map();
// m.set('a', 1).set('b', 2).set('c', 3);
// // for(let data of m){
// //   console.log(data);
// // }
// for(let [key, value] of m){
//   console.log(key,value);
// }





// class的基本使用

// const Rafer = function (a, b) {
//   this.a = a;
//   this.b = b;
//   return this;
// };
// Rafer.prototype = {
//   constructor: Rafer,
//   print: function () {
//     console.log(this.a + ' ' + this.b);
//   }
// };
// const rafer = new Rafer('xu','qunhai').print();

// class Rafer{
//   constructor(a, b){
//     this.a = a;
//     this.b = b;
//     return this;
//   }
//   print(){
//     console.log(this.a + ' ' + this.b);
//   }
// }
// const rafer = new Rafer('qunhai','xu').print();
// console.log(typeof Rafer);
//
// console.log(Rafer.prototype);
//
// console.log(Object.keys(Rafer.prototype));  //定义在类中的方法都是不可枚举的
//
// class P {};
// const p = new P();
// console.log(p);

// P();  //如果忘记加new，像函数一样调用Clss，将会报错





// class的继承






// Symbol数据类型






// 内置对象的扩展






// 函数的扩展






// 异步操作之Promise





