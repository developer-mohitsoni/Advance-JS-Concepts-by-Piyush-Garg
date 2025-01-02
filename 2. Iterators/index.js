//! Iterators:-

// Iterators and generators brings the concept of iteration directly into the core language and provide a mechanism for cutsomizing the behaviour of for...of loops.

// Suppose we have an array:-

let arr = [1, 2, 3, 4, 5];

// Looping this array as:-

//* Built-in Iterator
for (const val of arr) {
  console.log(val);
}

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
