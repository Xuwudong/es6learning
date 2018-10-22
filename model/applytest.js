class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
}

console.log([1, 2, 3] instanceof new MyClass()); // true