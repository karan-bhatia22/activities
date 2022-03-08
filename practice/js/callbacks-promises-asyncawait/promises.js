const posts = [
    {"title": "Post one", "body": "This is post one"},
    {"title": "Post two", "body": "This is post two"},
];

function getPosts(){
    setTimeout(()=>{
        let output = "";
        posts.forEach((post) => {
            output += `<li>${post.title}</li>`
        });

        document.body.innerHTML = output;
    }, 1000); // if nothing is passed as the time then it takes in 0 as the default value
}
function createPost(post){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            posts.push(post);
            const error = false;
            error? reject("Some Error occurred!") : resolve();
        }, 2000);
    });
    
}

// createPost({"title": "Post three", "body": "This is post three"}).then(getPosts).catch(err=>{
//     console.error(err);
// });


//Async Await
// async function init(){
//    await createPost({"title": "Post three", "body": "This is post three"}); // waiting for this to be done and then call the next function
//    getPosts();
// }
// // NOTE: Async-Await only works with Promise return types! If the function does not return a promise then await will have no effect on it.
// init();



// Async await with fetch
async function fetchData(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users/');
    const data = await res.json();
    console.log(data);
}
// async await is a cleaner way of dealing with promises
fetchData();
// Promise.all

// const promise1 = Promise.resolve("Hello world!");
// const promise2 = 10;
// const promise3 = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve('Goodbye');
//     }, 2000);
// });
// const promise4 = fetch('https://jsonplaceholder.typicode.com/posts/').then(res => res.json());
// Promise.all([promise1, promise2, promise3, promise4]).then((values)=>console.log(values));