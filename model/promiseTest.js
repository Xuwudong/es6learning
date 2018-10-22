const Promise = require('bluebird');
const f = () => console.log('now');
// Promise.resolve().then(f);
/*(
    () => new Promise(resolve =>{
        resolve(f());
    })
)();*/

/*(async () => f())();*/
/*
Promise.try(f);
console.log('next');

Promise.delay(500).then(function() {
    console.log("500 ms passed");
    return "Hello world";
}).delay(500).then(function(helloWorldString) {
    console.log(helloWorldString);
    console.log("another 500 ms passed") ;
});*/

var name = "The Window";

var object = {
    name : "My Object",

    getNameFunc : function(){
        return function(){
            return this.name;
        };

    }

};

console.log(object.getNameFunc()());



var data = [];

for (var i = 0; i < 3; i++) {
    (data[i] = function () {
        console.log(arguments.callee.i)
    }).i = i;
}

data[0]();
data[1]();
data[2]();
