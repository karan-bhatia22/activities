// get all posts
const url = 'https://jsonplaceholder.typicode.com/posts/';
// demonstrate promise in json
fetch(url).then(response => response.json()).then(json => console.log(json));

// get 1st post
fetch(url + '1').then(response => response.json()).then(json => console.log(json));

//create a post
let obj = {
    "userId": 10,
    "id": 10,
    "title": "My title",
    "body": "This is my new post!"
}
fetch(url, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json' // need to specify content-type header
    },
    body: JSON.stringify(obj)
}).then(response => response.json()).then(json => console.log(json));

// update a post
obj = {
    "userId": 25,
    "id": 25,
    "title": "My new title",
    "body": "This is my latest post!"
}
// post method takes more time than put
fetch(url + obj.id, {
    method: 'PUT',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(obj)
}).then(response => response.json()).then(json => console.log(json));

//delete a post 
fetch(url + obj.id, {
    method: 'DELETE',
}).then(response => response.json()).then(json => console.log(json));

// does not return any object but real apis can!


// get data from api outside origin or current domain
const currency_convert_url = 'https://currency-converter-free.herokuapp.com/convert';
const currency_obj = {
    "from_currency": "INR",
    "to_currency": "USD"
}
fetch(currency_convert_url, {
    method: 'POST',
    mode: 'cors', // to allow cross origin requests/ third party requests
    // mode: 'same-origin',
    // mode: 'no-cors',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(currency_obj)
}).then(response => response.json()).then(json=> console.log(json));



// keep live
const statistics = {
    "user_id": "",
    "engage_rate": "80%"
}
window.onunload = function(){
    fetch('/analytics', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        keepalive: true,
        body: JSON.stringify(statistics)
    })
}