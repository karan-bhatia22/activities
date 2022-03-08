let s1 = "Hello World";

console.log(typeof (s1)); // typeof s1 is string
console.log(s1.length); // length of string

//use of escape character
console.log("use of \"escape character\"");
console.log("Hello \
World");

let s2 = new String("Hello World");  // another way of declaring strings

console.log(typeof (s2));
console.log(s2.length);

console.log(s1 == s2);
console.log(s1 === s2);

let temp = "This is a string.";

//Slice certain part of the string
console.log(temp.slice(2, 4))
console.log(temp.slice(-4, -2))
console.log(temp.slice(2))
console.log(temp.slice(-2))

//Same as slice
//Can not take negative inputs
console.log(temp.substring())
console.log(temp.substring(2, 4))
console.log(temp.substring(2))

//Replace
console.log(temp.replace("string", "new string"))

let input = "this string is created so you can learn String";
console.log(input.replace("string", "new string"))
console.log(input.replace(/STRING/i, "new string"))
console.log(input.replace(/string/g, "new string"))

//To lower case
console.log(input.toLowerCase())
//To upper case
console.log(input.toUpperCase())

//concat
console.log(temp.concat(temp, temp, temp))
console.log(temp.concat(temp, [
    input,
    input,
    input
]))

temp = "           abcdefgh          ";
console.log(temp.trim())
console.log(temp.trimStart())
console.log(temp.trimEnd())

temp = "abcdefgh"
console.log(temp.padStart(5, 'a'))
console.log(temp.padStart(12, 'a'))
console.log(temp.padEnd(12, 'a'))
console.log(temp.padEnd(4, 'a'))

temp = "Hello World"
console.log(temp.charAt(0))
console.log(temp.charCodeAt(5))

console.log(temp.split(" "))
console.log(temp.split(""))

input = "this string is created so you can learn string";
console.log(input.indexOf('string'))
console.log(input.indexOf('string', 13))
console.log(input.lastIndexOf('string'))
console.log(input.lastIndexOf('string', 13))
//search can take input as regex
console.log(input.search('string'))
//you can check for regex
console.log(input.match(/string/g))

//check if only exists or not
console.log(input.includes('string'))
console.log(input.includes('is', 13))

let a = 'output'
let b = String("output")
console.log(a === b)
console.log(a.localeCompare(b))
console.log((a + 'a').localeCompare(b))
console.log((a).localeCompare(b + 'a'))

console.log(typeof("abcdefgh"))
console.log(typeof(new String("xyzabc")))


console.log("Hello" === "Hello")
console.log((new String("Hello")) === (new String("Hello")))