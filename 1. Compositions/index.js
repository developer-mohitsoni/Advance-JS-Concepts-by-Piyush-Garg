//! Compositions in JS:-

function add(a, b) {
  return a + b;
}

function square(val) {
  return val * val;
}

function addTwoAndSquare(a, b) {
  return square(add(a, b));
}

/*
const addResult = add(2, 3);
console.log(addResult); // Output: 5

const squareResult = square(5);
console.log(squareResult); // Output: 25
*/

const addResult = addTwoAndSquare(2, 3);
console.log(addResult); // Output: 25

//! Composition:-

function multiply(...args) {
  let result = 1;
  for (let arg of args) {
    result *= arg;

    if (isNaN(result)) {
      throw new Error("Non-numeric value encountered");
    }
  }
  return result;
}

/*
function composeTwoFunction(fn1, fn2) {
  return function (a, b) {
    return fn2(fn1(a, b));
  };
}
*/

//* Conversion:- ES6 Above Composition Function

/*
const c2f = (fn1, fn2) => (a, b) => fn2(fn1(a, b));
// Composing add and square functions
const addAndSquare = c2f(multiply, square);
console.log(addAndSquare(2, 3));
*/

//! Compose unlimited functions

// ...fns: Yeh ek rest parameter hai, jo multiple functions ko ek array (fns) ke roop mein store karta hai. Example: compose(fn1, fn2, fn3) me fns = [fn1, fn2, fn3].

// ...value: Yeh bhi ek rest parameter hai jo us function ko jo return hota hai, usme pass hone wali values ko array ke roop mein store karta hai.

//! reduce Ka Role:
//* fns.reduce ka use karte hain taaki har function ko ek sequence mein execute kiya ja sake.

// . a (Accumulator): Pehle function ke result ko store karta hai.
// . fn (Current Function): Abhi jo function execute hone wala hai.
// . index: Ye batata hai ki abhi hum kaunsa function execute kar rahe hain (pehla, dusra, etc.).
// . value: Ye initial values hain jo sabse pehle function ko pass ki jati hain.

//* index === 0 Ka Matlab:

// Jab hum reduce mein kaam karte hain, to hume pehla function (fns[0]) ko sabhi arguments ke saath execute karna padta hai (fn(...a)), kyunki wo directly values ka array value accept karta hai.

// Baaki functions (fns[1] se lekar end tak):
// . Inko ek single value pass hoti hai, jo previous function ka result hota hai (fn(a)

/*
function compose(...fns) {
  return function (...value) {
    return fns.reduce(
      (a, fn, index) => (index === 0 ? fn(...a) : fn(a)),
      value
    );
  };
}
*/

//* above function writtern in ES6 as:-

const compose =
  (...fns) =>
  (...value) =>
    fns.reduce((a, fn, index) => (index === 0 ? fn(...a) : fn(a)), value);

const task = compose(multiply, square);

console.log(task(2, 3)); // Output: 25

//! Step-by-Step Execution:

//* 1. compose(add, square):
// fns = [add, square]

//* 2. Return hua function ko call kiya: combined(2, 3):
// value = [2, 3]

//* 3. reduce start karta hai:
// Iteration 1:-
// index === 0: Isliye fn(...a) execute hota hai.
// add(2, 3) → 5

// Iteration 2:-
// index !== 0: Isliye fn(a) execute hota hai.
// square(5) → 25

//* 4. Final result: 25
