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





