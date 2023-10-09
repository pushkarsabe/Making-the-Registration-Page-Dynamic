// Too many promises in life


// const posts = [
//     { title: 'Post One', body: 'This is post one' },
//     { title: 'Post Two', body: 'This is post two' }
// ];
// function getPosts() {
//     setTimeout(() => {
//         let output = ''; posts.forEach((post, index) => {
//             output += `<li>${post.title}</li>`;
//         });
//         document.body.innerHTML = output;
//     }, 1000);
// }

// function createPost(post) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             posts.push(post);

//             const error = false;

//             if (!error) {
//                 resolve();
//             } else {
//                 reject('Error: something went wrong');
//             }
//         }, 2000);//timer

//     });//promise3
// };
// createPost({ title: 'Post three', body: 'This is post three' }).then(getPosts).catch(err => console.log(err))

//promise all
// const promise1 = Promise.resolve('hello world');
// const promise2 = 1;
// const promise3 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000, 'this is timer');
// })

// const promise4 = fetch('https://my-json-server.typicode.com/typicode/demo/posts').then(res => res.json());

// Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
//     console.log(values);
// })

const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' }
];
var userTimings = '';

function getPosts() {
    setTimeout(() => {
        let output = ''; posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}
function printPosts() {
    posts.forEach((post) => {
        console.log(post);
    })
}
function deletePost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost);
            } else
                reject('posts is empty');
        }, 2000);//timer

    });//promise3
};

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;

            if (!error) {
                resolve();
            } else {
                reject('Error: something went wrong');
            }
        }, 2000);//timer

    });//promise3
};
function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            userTimings = new Date();
            resolve(userTimings);
        }, 1000);
    })
}
createPost({ title: 'Post three', body: 'This is post three' }).then(() => {
    updateLastUserActivityTime().then((userTimings) => {
        console.log(userTimings);
        printPosts();

        deletePost().then((deletedposts) => {
            console.log(deletedposts);

        }).catch(err => console.log(err))
    })

}).catch(err => console.log(err))


// Why on Earth do we need promise.all ?
// in normal promise execution , promises get called one after another so the execution time gets added.
// in promise.all all the promises run parallelly and total execution time is reduced by more than half.