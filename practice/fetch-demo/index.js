// ----------SYNTAX --------------//
// fetch(url, options)


// options = {
//     method: 'GET'/'POST'/'DELETE'/'PUT',
//     headers: {
//         'Content-type': 'application/json'/'mutlipart/form-data'/'text/html'
//     },
//     body: {
//         'id': 1,
//         'name': 'dummy'
//     },
//     mode: 'cors/no-cors/same-origin',
//     keepalive : true/false
// }


// --------- GET ALL POSTS ------------ //
const url = 'http://localhost:9000';
// const url = 'https://jsonplaceholder.typicode.com';
// demonstrate json as a promise
fetch(url + '/posts/').then(response => console.log(response.json()));
fetch(url + '/posts/').then(response => response.json()).then(json => console.log(json));


// ------- GET 1st POST ------------- //
// get 1st post
fetch(url + '/posts/1').then(response => response.json()).then(json => console.log(json));

// ------ GET 1st photo and append to UI ----//
fetch(url + '/photos/1').then(response => response.json()).then(json => {
    const image = document.createElement('img');
    image.src = json.url;
    document.querySelector('ul').append(image);
});

// ------- CREATE A POST ------------ //
let obj = {
    "userID" : 10,
    "id" : 10,
    "title" : 'My title',
    "body": "This is a new post!"
}
fetch(url + '/posts/', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(obj)
}).then(response => response.json()).then(json => console.log(json));
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



// ------- UPDATE A POST ------------ //
obj = {
    "userId": 1,
    "id": 1,
    "title": "Updated new post!",
    "body": "This is my latest post!"
}
// post method takes more time than put
fetch(url + '/posts/' + obj.id, {
    method: 'PUT',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(obj)
}).then(response => response.json()).then(json => console.log(json));


fetch(url + '/post/').then(res => res.json()).then(json => console.log(json)).catch(err => console.log(err));
// -------- DELETE A POST --------------- // 
fetch(url + '/posts/' + obj.id, {
    method: 'DELETE',
}).then(response => response.json()).then(json => console.log(json));

// does not return any object but some apis can!


// -------- GET DATA FROM OUTSIDE ORIGIN ------//
const currency_convert_url = 'https://currency-converter-free.herokuapp.com/convert/';
const currency_obj = {
    "from_currency": "INR",
    "to_currency": "USD"
}
fetch(currency_convert_url, {
    method: 'POST',
    // mode: 'same-origin', // to allow only same origin requests/ cut off third party requests
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(currency_obj)
}).then(response => response.json()).then(json=> console.log(json));



// ----------- KEEP LIVE DEMO ------------ //
const obj = {
    "id": 5000,
    "userID": 5000,
    "title": "Added when app was closed!!!",
    "body": "This post was added after the app was closed. The fetch ran in the background!"
}
window.onunload = function(){
    fetch('http://localhost:9000/posts/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        keepalive: true,
        body: JSON.stringify(obj)
    })
}