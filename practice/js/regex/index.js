// flags

/*
    g: global. all matches
    m: multiline. matches line breaks as well
    i: insensitive. case insensitive
    u: unicode. treated as UTF16 string
    y: sticky. 
*/
let re = new RegExp("test", 'g'); // matches all the instances of test
let s = "this is a test, there is some test that needs to be done.!";
console.log(re.test(s));


// also define regex as below
let re2 = /test/g ; // same as re

console.log(re2.test(s));


// global and insensitive
let re3 = /test/gi;
console.log(re3.test(s));

// match with an optional character
let re4 = /te?/g; // in this character e is optional
console.log(re4.test(s));

// match with as many characters as possible
let re5 = /t+/g;
console.log(re5.test(s));

// matching with .exec
re = /([0-9]+)[a-z]+/; // select numbers as much as possible and also select lowercase characters as much as possible
let match = re.exec("foo123bar");
console.log(match[0]); // returns the full match string
console.log(match[1]); // returns the text corresponding to first captured group

// using RegExp with strings

console.log("string".match(/[i-n]+/)); // searches for 'in' in the string and + denotes search for as long as possible

console.log("string".match(/(r)[i-n]+/)); // searches for pattern starting with r and then i to n as long as possible

// replace with .replace

console.log("string".replace(/[i-n]+/, 'foo')); // in will be replaced with foo

// split in strings .split
console.log("string".split(/[i-n]/)); // string will be split at 'in'
console.log("strings are awesome".split(' ')); // string will be split at space

// index search with .search

console.log("stringstring".search(/[i-n]+/)); // search for index of 'in'
console.log("string".search(/[o-q]+/)); // will return -1


// check if email is valid or not
let re_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;  // RFC2822 compliant email validation

let email = 'karan.bhatia@searce.com';
let invalid = 'karan.bhatia@Searce.com';
console.log(re_email.test(email)); // valid email
console.log(re_email.test(invalid)); // invalid email
 




