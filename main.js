//3 hours JS Project (Integrating REST API) = Stock Mangement Tool 

const myForm = document.querySelector('#my-form');
const candyNameInput = document.getElementById('candyName');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const itemList = document.getElementById('items');
myForm.addEventListener('submit', addItemsToServer);
var total;

function addItemsToServer(e) {
    e.preventDefault();

    if (candyNameInput.value === '' || descriptionInput.value === '' || priceInput.value === '' ||
        quantityInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {


        msg.classList.add('success');
        msg.innerHTML = 'Successfully loged in';
        setTimeout(() => msg.remove(), 2000);

        let obj = {
            candyName: candyNameInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            quantity: quantityInput.value,
        };

        //store the data on the server
        axios.post('https://crudcrud.com/api/7645be9a89af49deb84478d0948d333b/SaveStock', obj)
            .then(res => {
                console.log('post = ');
                console.log(res);
                //to set the data of list with required details
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(` name = ${res.data.candyName}, description = ${res.data.description}, price = ${res.data.price}`));
                userList.appendChild(li);
                const h1 = document.createElement('h2');
                h1.appendChild(document.createTextNode('Quantity = '));
                li.appendChild(h1);
                h2.style.marginTop = '-25px';

                const h2 = document.createElement('h2');
                h2.id = 'quantityID';
                h2.appendChild(document.createTextNode(`${res.data.quantity}`));
                li.appendChild(h2);
                h2.style.marginBottom = '-10px';
                h2.style.marginTop = '-40px';
                h2.style.marginLeft = '130px';

                //for user buy1 input
                const buy1INPUT = document.createElement('input');
                buy1INPUT.setAttribute('type', 'text');
                buy1INPUT.id = 'buy1inputID';
                li.appendChild(buy1INPUT);
                buy1INPUT.style.width = '60px';
                buy1INPUT.style.marginLeft = '235px';
                buy1INPUT.style.padding = '5px';
                buy1INPUT.style.marginBottom = '45px';
              

                //for user buy1 button
                const buy1Btn = document.createElement('input');
                buy1Btn.setAttribute('type', 'button');
                buy1Btn.setAttribute('value', 'Buy1');
                buy1Btn.id = res.data._id;
                buy1Btn.setAttribute('onclick', 'buy1Items(this)');
                li.appendChild(buy1Btn);
                buy1Btn.style.margin = '10px';
                buy1Btn.style.padding = '5px';
                buy1Btn.style.fontSize = '15px';
                buy1Btn.style.backgroundColor = '#333';
                buy1Btn.style.color = 'white';


                //for user buy2 input
                const buy2INPUT = document.createElement('input');
                buy2INPUT.setAttribute('type', 'text');
                buy2INPUT.id = 'buy2inputID';
                li.appendChild(buy2INPUT);
                buy2INPUT.style.width = '60px';
                buy2INPUT.style.marginLeft = '40px';
                buy2INPUT.style.padding = '5px';
                //for user buy2 button
                const buy2Btn = document.createElement('input');
                buy2Btn.setAttribute('type', 'button');
                buy2Btn.setAttribute('value', 'Buy2');
                buy2Btn.id = res.data._id;
                buy2Btn.setAttribute('onclick', 'buy2Items(this)');
                li.appendChild(buy2Btn);
                buy2Btn.style.margin = '10px';
                buy2Btn.style.padding = '5px';
                buy2Btn.style.fontSize = '15px';
                buy2Btn.style.backgroundColor = '#333';
                buy2Btn.style.color = 'white';


                //for user buy3 input
                const buy3INPUT = document.createElement('input');
                buy3INPUT.setAttribute('type', 'text');
                buy3INPUT.id = 'buy3inputID';
                li.appendChild(buy3INPUT);
                buy3INPUT.style.width = '60px';
                buy3INPUT.style.marginLeft = '40px';
                buy3INPUT.style.padding = '5px';
                //for user buy2 button
                const buy3Btn = document.createElement('input');
                buy3Btn.setAttribute('type', 'button');
                buy3Btn.setAttribute('value', 'Buy2');
                buy3Btn.id = res.data._id;
                buy3Btn.setAttribute('onclick', 'buy3Items(this)');
                li.appendChild(buy3Btn);
                buy3Btn.style.margin = '10px';
                buy3Btn.style.padding = '5px';
                buy3Btn.style.fontSize = '15px';
                buy3Btn.style.backgroundColor = '#333';
                buy3Btn.style.color = 'white';

                candyNameInput.value = '';
                descriptionInput.value = '';
                priceInput.value = '';
                quantityInput.value = '';
            }).catch(err => console.log(err + ' error'));

    }//submit

}//onSubmit

function buy1Items(val) {
    //this will delete the record from BE server
    console.log('itemID = ' + val.id);
    axios.get('https://crudcrud.com/api/7645be9a89af49deb84478d0948d333b/SaveStock/' + val.id)
        .then(res => {
            console.log('1 get with id = ');
            console.log(res);
            let buyInputValue = document.querySelector('#buy1inputID').value;
            let quantityValue = document.querySelector('#quantityID').textContent;
            console.log('buyInputValue = ' + buyInputValue);
            console.log('quantityValue = ' + quantityValue);
            console.log('candyName = ' + res.data.candyName);
            console.log('description = ' + res.data.description);
            console.log('price = ' + res.data.price);
            console.log('quantity = ' + res.data.quantity);

            total = Number(quantityValue) - Number(buyInputValue);
            if (total > 0) {
                console.log('total = ' + total);
                quantityValue.textContent = total;
            } else
                console.log('total is lesser');

            axios.put('https://crudcrud.com/api/7645be9a89af49deb84478d0948d333b/SaveStock/' + val.id, {
                candyName: res.data.candyName,
                description: res.data.description,
                price: res.data.price,
                quantity: total,
            }).then(res => {
                console.log('1 put');
                console.log(res);
                document.querySelector('#quantityID').textContent = total;
            }).catch(err => console.log(err + ' error'));

            document.querySelector('#buy1inputID').value = '';
        }).catch(err => console.log(err + ' error'));
}//buy1Items


function buy2Items(val) {
    //this will delete the record from BE server
    console.log('itemID = ' + val.id);
    axios.get('https://crudcrud.com/api/7645be9a89af49deb84478d0948d333b/SaveStock/' + val.id)
        .then(res => {
            console.log('2 get with id = ');
            console.log(res);
            let buyInputValue = document.querySelector('#buy2inputID').value;
            let quantityValue = document.querySelector('#quantityID').textContent;
            console.log('buyInputValue = ' + buyInputValue);
            console.log('quantityValue = ' + quantityValue);
            console.log('candyName = ' + res.data.candyName);
            console.log('description = ' + res.data.description);
            console.log('price = ' + res.data.price);
            console.log('quantity = ' + res.data.quantity);

            total = Number(quantityValue) - Number(buyInputValue);
            if (total > 0) {
                console.log('total = ' + total);
                quantityValue.textContent = total;
            } else
                console.log('total is lesser');

            axios.put('https://crudcrud.com/api/7645be9a89af49deb84478d0948d333b/SaveStock/' + val.id, {
                candyName: res.data.candyName,
                description: res.data.description,
                price: res.data.price,
                quantity: total,
            }).then(res => {
                console.log('2 put');
                console.log(res);
                document.querySelector('#quantityID').textContent = total;
            }).catch(err => console.log(err + ' error'));

            document.querySelector('#buy2inputID').value = '';
        }).catch(err => console.log(err + ' error'));
}//buy2Items

function buy3Items(val) {
    //this will delete the record from BE server
    console.log('itemID = ' + val.id);
    axios.get('https://crudcrud.com/api/7645be9a89af49deb84478d0948d333b/SaveStock/' + val.id)
        .then(res => {
            console.log('3 get with id = ');
            console.log(res);
            let buyInputValue = document.querySelector('#buy3inputID').value;
            let quantityValue = document.querySelector('#quantityID').textContent;
            console.log('buyInputValue = ' + buyInputValue);
            console.log('quantityValue = ' + quantityValue);
            console.log('candyName = ' + res.data.candyName);
            console.log('description = ' + res.data.description);
            console.log('price = ' + res.data.price);
            console.log('quantity = ' + res.data.quantity);

            total = Number(quantityValue) - Number(buyInputValue);
            if (total > 0) {
                console.log('total = ' + total);
                quantityValue.textContent = total;
            } else
                console.log('total is lesser');

            axios.put('https://crudcrud.com/api/7645be9a89af49deb84478d0948d333b/SaveStock/' + val.id, {
                candyName: res.data.candyName,
                description: res.data.description,
                price: res.data.price,
                quantity: total,
            }).then(res => {
                console.log('3 put');
                console.log(res);
                document.querySelector('#quantityID').textContent = total;
            }).catch(err => console.log(err + ' error'));

            document.querySelector('#buy3inputID').value = '';
        }).catch(err => console.log(err + ' error'));
}//buy3Items


