//3 hours JS Project (Integrating REST API) = Stock Mangement Tool 

const myForm = document.querySelector('#my-form');
const priceInput = document.getElementById('price');
const chooseDishInput = document.getElementById('chooseDish');
var option = document.querySelector('#tableOption');
const msg = document.querySelector('.msg');
const table1 = document.querySelector('#table1');
const table2 = document.querySelector('#table2');
const table3 = document.querySelector('#table3');

myForm.addEventListener('submit', addItemsToServer);

function showNewUserOnScreen(res) {
    console.log('id = ' + res._id);
    console.log('res.price = ' + res.price);
    console.log('res.dish = ' + res.dish);
    console.log('res.table = ' + res.table);

    if (res.table === 'Table 1') {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(` ${res.price}: ${res.table} : ${res.dish}`));
        table1.appendChild(li);
        //delete button
        const delBtn = document.createElement('input');
        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('value', 'Delete Order 1');
        delBtn.id = res._id;
        delBtn.setAttribute('onclick', 'deleteOrder(this)');
        li.appendChild(delBtn);
        delBtn.style.padding = '8px';
        delBtn.style.backgroundColor = 'floralwhite';
        delBtn.style.marginLeft = '40px';
    }
    else if (res.table === 'Table 2') {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(` ${res.price}: ${res.table} : ${res.dish}`));
        table2.appendChild(li);
        //delete button
        const delBtn = document.createElement('input');
        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('value', 'Delete Order 2');
        delBtn.id = res._id;
        delBtn.setAttribute('onclick', 'deleteOrder(this)');
        li.appendChild(delBtn);
        delBtn.style.padding = '8px';
        delBtn.style.backgroundColor = 'floralwhite';
        delBtn.style.marginLeft = '40px';
    }
    else if (res.table === 'Table 3') {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(` ${res.price}: ${res.table} : ${res.dish}`));
        table3.appendChild(li);
        //delete button
        const delBtn = document.createElement('input');
        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('value', 'Delete Order 3');
        delBtn.id = res._id;
        delBtn.setAttribute('onclick', 'deleteOrder(this)');
        li.appendChild(delBtn);
        delBtn.style.padding = '8px';
        delBtn.style.backgroundColor = 'floralwhite';
        delBtn.style.marginLeft = '40px';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/b7b977f588c449fcafe596747a25efff/BookTable')
        .then(res => {
            //this will print array collection with data output of get request
            console.log(res);

            //res is an object of array 
            for (let i = 0; i < res.data.length; i++) {
                showNewUserOnScreen(res.data[i]);
            }
        })
        .catch(err => {
            console.log(err)
        });
})

function addItemsToServer(e) {
    e.preventDefault();
    console.log('option = ' + option.value);
    let obj = {
        price: priceInput.value,
        dish: chooseDishInput.value,
        table: option.value,
    };

    axios.post('https://crudcrud.com/api/b7b977f588c449fcafe596747a25efff/BookTable', obj)
        .then(res => {
            console.log('after post = ');
            console.log(res);

            if (res.data.table === 'Table 1') {
                console.log('Table 1');
                console.log('id = ' + res.data._id);
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(` ${res.data.price}: ${res.data.table} : ${res.data.dish}`));
                table1.appendChild(li);
                //button
                const delBtn = document.createElement('input');
                delBtn.setAttribute('type', 'button');
                delBtn.setAttribute('value', 'Delete Order 1');
                delBtn.id = res.data._id;
                delBtn.setAttribute('onclick', 'deleteOrder(this)');
                li.appendChild(delBtn);
                delBtn.style.padding = '8px';
                delBtn.style.backgroundColor = 'floralwhite';
                delBtn.style.marginLeft = '40px';

            }
            else if (res.data.table === 'Table 2') {
                console.log('Table 2');
                console.log('id = ' + res.data._id);
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(` ${res.data.price}: ${res.data.table} : ${res.data.dish}`));
                table2.appendChild(li);
                // button
                const delBtn = document.createElement('input');
                delBtn.setAttribute('type', 'button');
                delBtn.setAttribute('value', 'Delete Order 2');
                delBtn.id = res.data._id;
                delBtn.setAttribute('onclick', 'deleteOrder(this)');
                li.appendChild(delBtn);
                delBtn.style.padding = '8px';
                delBtn.style.backgroundColor = 'floralwhite';
                delBtn.style.marginLeft = '40px';

            } else if (res.data.table === 'Table 3') {
                console.log('Table 3');
                console.log('id = ' + res.data._id);
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(` ${res.data.price}: ${res.data.table} : ${res.data.dish}`));
                table3.appendChild(li);
                //button
                const delBtn = document.createElement('input');
                delBtn.setAttribute('type', 'button');
                delBtn.setAttribute('value', 'Delete Order 3');
                delBtn.id = res.data._id;
                delBtn.setAttribute('onclick', 'deleteOrder(this)');
                li.appendChild(delBtn);
                delBtn.style.padding = '8px';
                delBtn.style.backgroundColor = 'floralwhite';
                delBtn.style.marginLeft = '40px';
            }

            priceInput.value = '';
            chooseDishInput.value = '';
            option.value = '';
        }).catch(err => console.log(err));

}//onSubmit

function deleteOrder(val) {
    // console.log('val = ' + val.id);
    axios.delete('https://crudcrud.com/api/b7b977f588c449fcafe596747a25efff/BookTable/' + val.id)
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err + ' error'));

    //get a parent node element and delete the user details from the list
    let parentEle = document.getElementById(val.id).parentElement;
    if (val.value === 'Delete Order 1') {
        console.log('delete from Table 1');
        table1.removeChild(parentEle);
    }
    else if (val.value === 'Delete Order 2') {
        console.log('delete from Table 2');
        table2.removeChild(parentEle);
    } else if (val.value === 'Delete Order 3') {
        console.log('delete from Table 3');
        table3.removeChild(parentEle);
    }
}//delete



