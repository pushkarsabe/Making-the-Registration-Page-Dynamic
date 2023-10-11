//Saving the user Details on Crud Crud
//Update the user Details = 

const myForm = document.querySelector('#my-form');
const nameInput = document.getElementById('name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const itemList = document.getElementById('items');
myForm.addEventListener('submit', onSubmit);
var idOfUsersUpdatingDetails;

function showNewUserOnScreen(res) {
    console.log('res.name = ' + res.name);
    console.log('res.email = ' + res.email);
    console.log('id = ' + res._id);

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${res.name}: ${res.email}`));
    userList.appendChild(li);

    //for adding delete button functionality 
    const delBtn = document.createElement('input');
    delBtn.setAttribute('type', 'button');
    delBtn.setAttribute('value', 'Delete');
    //setting id as an email of user so we can pass the value
    delBtn.id = res._id;
    delBtn.setAttribute('onclick', 'deleteUser(this)');
    li.appendChild(delBtn);
    delBtn.style.margin = '10px';
    delBtn.style.marginLeft = '10px';
    delBtn.style.padding = '5px';
    delBtn.style.fontSize = '15px';
    delBtn.style.backgroundColor = '#333';
    delBtn.style.color = 'white';

    //for adding edit button functionality 
    const editBtn = document.createElement('input');
    editBtn.setAttribute('type', 'button');
    editBtn.setAttribute('value', 'Edit');
    editBtn.id = res._id;
    editBtn.setAttribute('onclick', 'editUser(this)');
    li.appendChild(editBtn);
    editBtn.style.margin = '10px';
    editBtn.style.marginLeft = '10px';
    editBtn.style.padding = '5px';
    editBtn.style.fontSize = '15px';
    editBtn.style.backgroundColor = '#333';
    editBtn.style.color = 'white';
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/b077c957e09b462fae3d62ada9d66da5/appointmentData')
        .then(res => {
            //this will print array collection with data output of get request
            // console.log(res);

            //res is an object of array 
            for (let i = 0; i < res.data.length; i++) {
                showNewUserOnScreen(res.data[i]);
            }
        })
        .catch(err => {
            console.log(err)
        });
})

function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value === '' || emailInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {

        //if valu of this idOfUsersUpdatingDetails variable is set then update otherwise submit new details
        if (idOfUsersUpdatingDetails != undefined) {
            console.log('idOfUsersUpdatingDetails = ' + idOfUsersUpdatingDetails);
            let nameInputUpdate = document.getElementById('name').value;
            let emailInputUpdate = document.querySelector('#email').value;

            //update values on BE 
            axios.put('https://crudcrud.com/api/b077c957e09b462fae3d62ada9d66da5/appointmentData/' + idOfUsersUpdatingDetails, {
                name: nameInputUpdate,
                email: emailInputUpdate,
            })
                .then(res => {
                    console.log(res);
                    //keeping this undefined will help you submit the data instead of updating
                    idOfUsersUpdatingDetails = undefined;
                    //after submiting will remove the details inside the input bosex
                    nameInput.value = '';
                    emailInput.value = '';
                    //old name and email values in the li tags will be removed
                    location.reload();
                    // location.replace('https://www.w3schools.com/howto/howto_js_redirect_webpage.asp');
                }).catch(err => console.log(err + ' error'));

        }
        //add the new user details to the BE server
        else {
            msg.classList.add('success');
            msg.innerHTML = 'Successfully loged in';
            setTimeout(() => msg.remove(), 2000);

            let obj = {
                name: nameInput.value,
                email: emailInput.value
            };

            //store the data on the server
            axios.post('https://crudcrud.com/api/b077c957e09b462fae3d62ada9d66da5/appointmentData', obj)
                .then(res => {
                    console.log(res);
                    //to set the data of list with required details
                    const li = document.createElement('li');
                    li.appendChild(document.createTextNode(`${res.data.name}: ${res.data.email}`));
                    userList.appendChild(li);

                    //for adding delete button functionality 
                    const delBtn = document.createElement('input');
                    delBtn.setAttribute('type', 'button');
                    delBtn.setAttribute('value', 'Delete');
                    //setting id as an email of user so we can pass the value
                    delBtn.id = res.data._id;
                    delBtn.setAttribute('onclick', 'deleteUser(this)');
                    li.appendChild(delBtn);
                    delBtn.style.margin = '10px';
                    delBtn.style.marginLeft = '10px';
                    delBtn.style.padding = '5px';
                    delBtn.style.fontSize = '15px';
                    delBtn.style.backgroundColor = '#333';
                    delBtn.style.color = 'white';

                    //for adding edit button functionality 
                    const editBtn = document.createElement('input');
                    editBtn.setAttribute('type', 'button');
                    editBtn.setAttribute('value', 'Edit');
                    editBtn.id = res.data._id;
                    editBtn.setAttribute('onclick', 'editUser(this)');
                    li.appendChild(editBtn);
                    editBtn.style.margin = '10px';
                    editBtn.style.marginLeft = '10px';
                    editBtn.style.padding = '5px';
                    editBtn.style.fontSize = '15px';
                    editBtn.style.backgroundColor = '#333';
                    editBtn.style.color = 'white';

                }).catch(err => console.log(err + ' error'));

            nameInput.value = '';
            emailInput.value = '';
        }//submit
    }//else

}//onSubmit

//remove user details and to fetch name and email from BE server
function editUser(val) {
    console.log('val = ' + val.id);

    //to get all the details neccessary for editing
    axios.get('https://crudcrud.com/api/b077c957e09b462fae3d62ada9d66da5/appointmentData/' + val.id)
        .then(res => {
            console.log(res);
            //to set the user details in the input boxes
            nameInput.value = res.data.name;
            emailInput.value = res.data.email;


            //global value of this var will help for updating
            idOfUsersUpdatingDetails = val.id;

        }).catch(err => console.log(err + ' error'));

}

function deleteUser(val) {
    if (confirm('Are You Sure?')) {
        //this will delete the record from BE server    
        // console.log('val = ' + val.id);
        axios.delete('https://crudcrud.com/api/b077c957e09b462fae3d62ada9d66da5/appointmentData/' + val.id)
            .then(res => {
                console.log(res);
            }).catch(err => console.log(err + ' error'));

        //get a parent node element and delete the user details from the list
        let parentEle = document.getElementById(val.id).parentElement;
        userList.removeChild(parentEle);
    }
}






