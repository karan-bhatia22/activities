// Suppose you want to store the sum of all ids of posts fetched from some api to your server and also show it on the ui

const counts = [0];
async function getPosts(){ // real api to fetch the posts
    // fetch("https://jsonplaceholder.typicode.com/posts").then(res=> res.json()).then(posts => {
        // return posts;
    //}).catch(err => {
        // console.error(err);
        // return [];
    // });
    // NOT A CLEAN WAY TO DO STUFF

    try{
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await res.json();
        return posts;
    }
    catch(err){
        console.error(err);
        return [];
    }

}

function updateCount(value){ // mock api to update the count
    console.log("inside update api call");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            counts[0] = value;
            const error = false;
            error ? reject("Some Error Occurred!") : resolve();
        }, 2000);
    });
}

function addNewCount(value){ // mock api to add new count
    console.log("inside add api call");
    return new Promise((resolve, reject)=>{
        setTimeout( ()=> {
            counts.push(value);
            const error = false;
            error? reject("Some error occurred while adding new count!"): resolve();
        }, 3000);
    });

    // try{
    //     const res = await fetch('http://localhost:9000/add', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({"count": count})
    //     });
    //     const data = await res.json();
    //     console.log(data);
    // }
    // catch(err){
    //     console.error(err);
    // }
}
function deleteCount(value){ // mock api to delete the count
    console.log("inside delete api call");
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            counts.splice(counts.indexOf(value), 1);
            const error = false;
            error? reject("Some error occurred while deleting count"):resolve();
        }, 1000);
    });
}
async function sumOfId(posts, callback){ // function to add the sum of ids of all posts
    try{
        const sum = posts.reduce((total, post)=>{
            return total + post.id;
        }, 0);
        console.log(sum);
        callback ? await callback(sum) : null;
    }
    catch(err){
        console.error(err);
    }    
    
}
async function multiplicationOfId(posts, callback){ // function to multiply the ids of all posts
    try{
        const INF = Number.MAX_SAFE_INTEGER;
        const product = posts.reduce((product, post)=>{
            return (product * post.id) > INF ? INF : (product * post.id);
        }, 1);
        console.log(product);
        callback? await callback(product) : null;
    }
    catch(err){
        console.error(err);
    }
}
function showOnDOM(){
    let output = "";
    counts.forEach((value)=>{
        output += `<li>${value}</li>`;
    });
    document.body.innerHTML = output;   
}

async function main(){
    const posts = await getPosts(); // fetching all the posts
    await sumOfId(posts, addNewCount); // calling function
    await sumOfId(posts, deleteCount); // calling function
    await multiplicationOfId(posts, updateCount); // calling function
    await addNewCount(1234); // making api call
    await sumOfId(posts, (sum)=> console.log("From callback " + sum)); // calling function
    showOnDOM(); // calling function
}
main();
