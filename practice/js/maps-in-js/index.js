// Map is basically a key-value pair container

// to construct or declare a map

let map = new Map();
// or 
map = new Map([ [new Date(), 1], ["hello", "world"] ]); // map contains an iterable object i.e in this case an array of key value pairs
// NOTE: Objects in JS are not iterable.! for you to access elements present in object you need to use Object.entries or Object.keys


// map = new Map({"1":[new Date(), 1], "2": ["hello", "world"]}); // will throw an error that objects are not iterable

// clearing a map
// map.clear();
console.log(map.entries()); // to print the entries
// get values by keys from map
console.log(map.get("hello")); // prints world

// delete element from the map 
map.delete("hello"); // will delete the entry ["hello" , "world"]; .delete returns 1 or 0 depending upon successful deletion
console.log(map.get("hello")); // will print undefined

// check if the key is present in the map or not
console.log(map.has("hello")); // will return false since key "hello" has been deleted

// iterating over map
map = new Map ([ [1, 1], [2, 2], [3, 3], [4, 4], [5, 5] ]); // replaced the map with another map to demonstrate iteration

for( const [key, value] of map){ // in this of map is basically map.entries() by default
    console.log("key: " + key + " value: " + value); // logs all the values present in the map
}
console.log(); // just a divider
for (const key of map.keys()){ // to print all the keys of the map
    console.log("key: " + key);
}

console.log(); // divider

for(const value of map.values()){
    console.log("value: " + value);
}

// map also has forEach method which has two parameters passed 
// one is a callback function and second is the this parameter.
// callback function will be called for each element of the map
// callback has three parameters passed to it: key, value and the map object
console.log();
map.forEach((key, value, theMap) => {
    console.log("key: " + key + " value: " + value);
});

// setting values to the map
map.set(1, 2); // returns a map object as well. sets value at key 1 as 2

console.log();

for (const [key, value] of map){
    console.log(key, value);
}
// can also chain set since it returns the map object

map.set(1, 2).set(1, 1);

console.log();
for (const [key, value] of map){
    console.log(key, value);
}

// get the number of elements of the map
// .size property is used to get the number of elements from the map
console.log();
console.log("number of elements: " + map.size);

// Map VS Object

// In case of object the values are not accessed in the order they were entered in it. 
// In case of a map the values are accessed in the order they were entered in the map.

// Map provides with the delete, get and set methods that are absent in objects
// Main feature that a map serves is the iterability order that a map provides in place of an object!
// Also the keys can be of any data type for maps whereas for objects it is limited to numbers, strings and symbols.
// Map can be said to be an instance of object whereas the object cannot be said to be a Map

// Downside of Map is they are slower compared to Objects.
// There is Json support directly for objects but not to maps