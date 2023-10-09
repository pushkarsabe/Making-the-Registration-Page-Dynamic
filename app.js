// Async Await

//promise mess
// console.log('person1 : shows ticket');
// console.log('person2 : shows ticket');

// const promiseWifeBring = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('ticket');
//     }, 3000);
// })

// const getPopcorn = promiseWifeBring.then((t) => {
//     console.log('husband : we should go in');
//     console.log('wife : no i am hungry');

//     return new Promise((resolve, reject) => {
//         resolve(`${t} : popcorn`);
//     })
// });

// const getButter = getPopcorn.then((t) => {
//     console.log('husband: i got some popcorn');
//     console.log('husband: we should go in');
//     console.log('wife: I need butter on my popcorn');

//     return new Promise((resolve, reject) => resolve(`${t} butter`))
// });
// getButter.then((t) => console.log(t));
// // getPopcorn.then((t) => console.log(t));

// console.log('person4 : shows ticket');
// console.log('person5 : shows ticket');


//Async Await 
// console.log('person1 : shows ticket');
// console.log('person2 : shows ticket');

// const preMovie = async () => {

//all the promises are reolved
// const promiseWifeBring = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('ticket');
//     }, 3000);
// })

// const getPopcorn = new Promise((resolve, reject) => resolve(`popcorn`));

// const getButter = new Promise((resolve, reject) => resolve(`butter`));

// const getColdDrinks = new Promise((resolve, reject) => resolve(`cold-drinks`));

// const getCoke = new Promise((resolve, reject) => resolve(`candy`));

// const getCandy = new Promise((resolve, reject) => resolve(`coke`));

//this will resolve promises one after another
// let ticket = await promiseWifeBring;
// let popcorn = await getPopcorn;
// let butter = await getButter;
// let coldDrink = await getColdDrinks;
// let coke = await getCoke;
// let candy = await getCandy;

//toresolve promises parallelly use promise all
// let [ticket, popcorn, butter, coldDrink, coke, candy] = await Promise.all([promiseWifeBring, getPopcorn, getButter, getColdDrinks, getCoke, getCandy])
// console.log(`${ticket},${popcorn},${butter},${coldDrink},${coke},${candy}`);

//reject promises 
//     const getPopcorn = new Promise((resolve, reject) => reject(`popcorn`));
//     let ticket;
//     try {
//         ticket = await getPopcorn;
//     } catch (e) {
//         ticket = 'sad face';
//     }

//     return ticket;
// }

// preMovie().then((m) => console.log(`person3: shows ${m}`));

// console.log('person4 : shows ticket');
// console.log('person5 : shows ticket');

// const testUserForm = async () => {
//     const loadUserForm = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('page loaded'), 3000);
//     });
//     const enterUserName = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('user entered'), 3000);
//     });
//     const verifyUserDetails = () => {
//     }
//     await loadUserForm;
//     await enterUserName;
//     const testResult = verifyUserDetails();

//     return testResult;
// }
// testUserForm().then((m) => console.log(`Result: ${m}`));



const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' }
];
var userTimings = '';

function printPosts() {
    posts.forEach((post) => {
        console.log(post);
    })
}

async function getEveryThingAsynch() {
    const updateTheDetails = new Promise((resolve, reject) => {
        setTimeout(() => {
            userTimings = new Date();
            resolve(userTimings);
        }, 1000);
    })
    let update = await updateTheDetails;
    console.log(update);

    const deletePost = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost.title);
            } else
                reject('posts is empty');
        }, 2000);//timer
    });//promise3
    let del = await deletePost;
    console.log(del);

    const createNewPost = new Promise((resolve, reject) => {

        setTimeout(() => {
            posts.push({ title: 'Post three', body: 'This is post third' });
            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('Error: something went wrong');
            }
        }, 2000);//timer
    });//promise3
    let create = await createNewPost;
    console.log(create);
    printPosts();
}

getEveryThingAsynch();
