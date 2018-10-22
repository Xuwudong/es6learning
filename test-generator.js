// var g = function* () {
//   try {
//     yield;
//   } catch (e) {
//     console.log(e);
//   }
// };

// var i = g();
// i.next();
// i.throw(new Error('出错了！'));

// function* iterTree(tree) {
//     if (Array.isArray(tree)) {
//         for (let i = 0; i < tree.length; i++) {
//             yield* iterTree(tree[i]);
//         }
//     } else {
//         yield tree;
//     }
// }

// let tree = ['1', '2', ['3', '4', ['5', '6']]];
// for (let x of iterTree(tree)) {
//     console.log(x);
// }


// function Tree(left, label, right) {
//   this.left = left;
//   this.label = label;
//   this.right = right;
// }

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
// function* inorder(t) {
//   if (t.left)
//     yield* inorder(t.left);
//   yield t.label;
//   if (t.right)
//     yield* inorder(t.right);
// }

// // 下面生成二叉树
// function make(array) {
//   // 判断是否为叶节点
//   if (array.length == 1) return new Tree(null, array[0], null);
//   return new Tree(make(array[0]), array[1], make(array[2]));
// }
// let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// // 遍历二叉树
// var result = [];
// for (let node of inorder(tree)) {
//   result.push(node);
// }

// for (let a of result) {
//   console.log(a)
// }


// function* gen(){
//   this.a = 1;
//   yield this.b = 2;
//   yield this.c = 3;
// }

// function F(){
//   return gen.call(gen.prototype);
// }

// let f = new F();
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());

// console.log(f.a);
// console.log(f.b);
// console.log(f.c);
// function* gen(x){
//   try {
//     var y = yield x + 2;
//   } catch (e){
//     console.log(e);
//   }
//   return y;
// }

// var g = gen(1);
// g.next();
// g.throw('出错了');
// 出错了

// var fetch = require('node-fetch');

// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   var result = yield fetch(url);
//   console.log(result.bio);
//   console.log(true)

// }

// let g = gen();
// let result = g.next();
// result.value.then((data) => {
//   return data.json();
// }).then((data) =>{
//   g.next(data);
// })


// const Thunk = function(fn) {
//   return function (...args) {
//     return function (callback) {
//       return fn.call(this, ...args, callback);
//     }
//   };
// };

// function f(a, cb) {
//   cb(a);
// }
// const ft = Thunk(f);

// ft(1)(console.log) // 1


// var fs = require('fs');
// var thunkify = require('thunkify');

// var read = thunkify(fs.readFile);
// read('test.js')(function(err, str){
//   // ...
//   if(err){
//     throw new Error(err);
//   }else{
//     console.log(str);
//   }
// });


// function thunkify(fn) {
//   return function() {
//     var args = new Array(arguments.length);
//     var ctx = this;

//     for (var i = 0; i < args.length; ++i) {
//       args[i] = arguments[i];
//     }

//     return function (done) {
//       var called;

//       args.push(function () {
//         if (called) return;
//         called = true;
//         done.apply(null, arguments);
//       });

//       try {
//         fn.apply(ctx, args);
//       } catch (err) {
//         done(err);
//       }
//     }
//   }
// };


// function f(a, b, callback){
//   var sum = a + b;
//   callback(sum);
//   callback(sum);
// }

// var ft = thunkify(f);
// var print = console.log.bind(console);
// ft(1, 2)(print);
// // 3

var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('E:/md5sum.txt');
  var f2 = yield readFile('E:/package-lock.json');
  console.log(f1.toString());
  console.log(f2.toString());
};

// var g = gen();

// g.next().value.then(function(data){
//   g.next(data).value.then(function(data){
//     g.next(data);
//   });
// });

function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

// run(gen);

const co = require('co');

const stream = fs.createReadStream('E:/package-lock.json');
let valjeanCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});