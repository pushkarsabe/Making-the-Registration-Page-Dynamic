// Why do we even want DOMContentLoaded
// because when we want to perform some dom manipulation then the html Elements has to be loaded hence 
// we need DOMContentLoaded



//Saving the user Details on Crud Crud

const myForm = document.querySelector('#my-form');
const nameInput = document.getElementById('name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const itemList = document.getElementById('items');
myForm.addEventListener('submit', onSubmit);

function showNewUserOnScreen(res) {
    console.log('res.name = ' + res.name);
    console.log('res.email = ' + res.email);

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${res.name}: ${res.email}`));
    userList.appendChild(li);

    //for adding delete button functionality 
    const delBtn = document.createElement('input');
    delBtn.setAttribute('type', 'button');
    delBtn.setAttribute('value', 'Delete');
    //setting id as an email of user so we can pass the value
    delBtn.id = res.email;
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
    editBtn.id = res.email;
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
    axios.get('https://crudcrud.com/api/418f9a4f2374485d941d0149c01475e6/appointmentData')
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

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
        userList.appendChild(li);

        //for adding delete button functionality 
        const delBtn = document.createElement('input');
        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('value', 'Delete');
        //setting id as an email of user so we can pass the value
        delBtn.id = emailInput.value;
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
        editBtn.id = emailInput.value;
        editBtn.setAttribute('onclick', 'editUser(this)');
        li.appendChild(editBtn);
        editBtn.style.margin = '10px';
        editBtn.style.marginLeft = '10px';
        editBtn.style.padding = '5px';
        editBtn.style.fontSize = '15px';
        editBtn.style.backgroundColor = '#333';
        editBtn.style.color = 'white';

        msg.classList.add('success');
        msg.innerHTML = 'Successfully loged in';
        setTimeout(() => msg.remove(), 2000);

        let obj = {
            name: nameInput.value,
            email: emailInput.value
        };

        //store the data on the server
        axios.post('https://crudcrud.com/api/418f9a4f2374485d941d0149c01475e6/appointmentData', obj)
            .then(res => {
                console.log(res);
            }).catch(err => console.log(err + ' error'));

        nameInput.value = '';
        emailInput.value = '';
    }

}//onSubmit

function editUser(val) {
    //remove user details from local storage and edit the user details
    //to featch name and email 
    let stringJSON = localStorage.getItem(val.id);
    let obj = JSON.parse(stringJSON);
    // console.log('obj = ' + JSON.stringify(obj));
    let userEmail = obj.email;
    let userName = obj.name;
    console.log('userName = ' + userName);
    console.log('userEmail = ' + userEmail);

    //this will only remove the user from local and the list
    localStorage.removeItem(val.id);
    let parentEle = document.getElementById(val.id).parentElement;
    userList.removeChild(parentEle);

    //to edit the user details
    nameInput.value = userName;
    emailInput.value = userEmail;
}

function deleteUser(val) {
    //get a parent node element and delete the user details from the list

    if (confirm('Are You Sure?')) {
        // console.log('val = ', val);
        localStorage.removeItem(val.id);
        let parentEle = document.getElementById(val.id).parentElement;
        userList.removeChild(parentEle);
    }
}






