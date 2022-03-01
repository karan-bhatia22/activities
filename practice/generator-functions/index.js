// A generator function is basically a function that generates a bunch of values upon request depending upon the iterator

function* nums(){ // declared with function* 
    console.log("Starting"); // will be printed at the start or when function is called without iterator
    yield 1; // gives back value 1; 
    console.log('yielded 1');
    yield 2;
    console.log("yielded 2");
    yield 3;
    console.log("yielded 3");
    yield 4;
    console.log("yielded 4");
}

let generator = nums(); // returns an iterator that can be used to execute lines one after another inside the function

let value = generator.next(); // logs first line and yields 1
console.log(value); // prints {value : 1, done: false}
value = generator.next();  // logs yielded 1 and returns { value : 2, done: false}
console.log(value);
value = generator.next();
console.log(value);
value = generator.next();
console.log(value);
value = generator.next(); // after the final yield it will return done : true
console.log(value);


// early iteration exit can be done using generator.return(value)
console.log();
let gen = nums();
value = gen.next();
console.log(value);
value = gen.next();
console.log(value);
value = gen.next();
console.log(value);
value = gen.return(3);
console.log(value);
value = gen.next();
console.log(value); // this will be undefined since we have completed the iteration early on using return

// sending values to the generator

function * adds(){
    let sum = 0, value;
    while(true){
        value = yield;
        if(value === null) break;
        // aggregate values
        sum += value;
    }
    return sum;
}
console.log();
generator = adds();
generator.next(); // proceeds untill the first yield expression 

generator.next(1);
generator.next(2);
generator.next(3);

let sum = generator.next(null).value; // once it gets the value as null it will break from the loop and return the sum
console.log("Sum : " + sum);


// create a range function for js as present in Python

function * range(n){
    for(let i = 0; i < n; i +=1)
    {
        yield i;
    }
}

console.log();

for(let i of range(10)){
    console.log(i);
}

let arr = [...range(10)]; // one can also spread the range 
console.log(arr);