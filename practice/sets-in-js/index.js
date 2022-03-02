const mySet = new Set(); // creating a new set
console.log(mySet);  // prints an empty set

const arr = [1 , 2, 3, 4, 4, 5, 5];
let set = new Set(arr); // creating a new set from an iterable

console.log(set); // logs {1, 2, 3, 4, 5} only unique elements

// adding a value to the set
set.add(6); // returns the set object back
console.log(set);

// can chain the add methods
set.add(7).add(8).add(9);
console.log(set);

// removing a value from the set
set.delete(9);
console.log(set);

// check if some value exists in the set or not
console.log(set.has(8)); // true
console.log(set.has(9)); // false

//clearing a set
set.clear();
console.log(set);

set = new Set([1, 2, 3, 4, 5]);
// get the set length
console.log(set.size);

// converting set to arrays
let myArray = Array.from(set);
console.log(myArray);
// or
myArray = [...set];
console.log(myArray);

// iterating sets
for(const value of set){
    console.log(value);
}
// always returns values in which they were added into the set

// intersection and difference

// to find intersection you need to convert the set to array first and then filter out the array based on the values

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const intersection = new Set([...set1].filter(value=> set2.has(value)));
const difference = new Set([...set2].filter(value => !set1.has(value)));

console.log(intersection);
console.log(difference);
