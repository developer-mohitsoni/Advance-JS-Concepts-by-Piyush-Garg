//! Iterators, Generators and Yield Keyword:-

// Iterators and generators brings the concept of iteration directly into the core language and provide a mechanism for cutsomizing the behaviour of for...of loops.

//* Design own Iterator

function makeIterator(start = 0, end = Infinity, step = 1) {
  let nextStart = start; // 1
  let iterationCount = 0;

  return {
    next() {
      let result;
      if (iterationCount < end) {
        result = {
          value: nextStart,
          done: false,
        };
        nextStart += step;

        iterationCount++;

        return result;
      }

      return { value: iterationCount, done: true };
    },
  };
}

const myIterator = makeIterator(1, 10, 1);

let result = myIterator.next();

while (!result.done) {
  console.log(result.value);
  result = myIterator.next();
}

//! Still you can't use this custom iterator with for loop:-

// So Now we can use the Generator Functions:-

// While custom iterators are a useful took, their creation requires careful programming due to the need of explicitly maintain their internal state. Generator functions provide a powerful alternative: they allow you to define an iterative algorithm by writing a single function whose execution is not continuous. Generator functions are written using the function* syntax.

// When called, generator functions do not initially execute their code. Instead, they return a special type of iterator, called a Generator. When a value is consumed by calling the generator's next() method, the Generator function executes until it encounters the yield keyword.

//! Yield Keyword Example:-

//* NOTE:- You can only use this "yield" keyword with Generator functions only.

// Using this Yeild keyword you can use for loop loop with your custom iterators.

function* count() {
  yield 2;
  yield 4;
  yield 6;
  yield 8;
  yield 10;
  yield 12;
}

const even = count();

for (const v of even) {
  console.log(v);
}

//! Generator functions

function* makeMyIteratorNew(start, end, stepSize = 1) {
  for (let i = start; i <= end; i += stepSize) {
    yield i;
  }
}

// Now you can use this custom iterator with for loop:-
const myIteratorNew = makeMyIteratorNew(1, 10);

for (const v of myIteratorNew) {
  console.log(v);
}
