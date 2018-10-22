const _ = require('lodash');

/*
var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        console.log(typeof fnName);
        funcStack.push(eval(fnName));
        return oproxy;
      }
    });

    return oproxy;
  }
}());

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

console.log(pipe(3).double.pow.reverseInt.get); // 63*/


/*
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: true,
    // configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.foo);
*/


/*
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
console.log(myObj.foo === myObj); // true*/

/*console.log(+0 === -0); //true
console.log(NaN === NaN); // false

console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true)*/

var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['barney']

// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']

// The `_.matchesProperty` iteratee shorthand.
console.log(_.dropRightWhile(users, ['active', false]));
// => objects for ['barney']

// The `_.property` iteratee shorthand.
console.log(_.dropRightWhile(users, 'active'));
// => objects for ['barney', 'fred', 'pebbles']