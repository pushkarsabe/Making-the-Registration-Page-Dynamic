// Why do we need headers any idea?
// header are needed when we have to send common or default data parameters through the request

// What is axios?
// a function which connects BE to FE
// a function which sends the request with data to any server address  and gets the data which returns promise

// What are the common problems faced when you make network calls and what should you do to solve it.
// wrong url was the major problems


//website  = https://jwt.io/
//global tokens
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


// GET REQUEST
function getTodos() {
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5,
  //   }
  // })
  //   .then(respose => showOutput(respose))
  //   .catch(err => console.log(err));

  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout: 5000 })
    .then(respose => showOutput(respose))
    .catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New todo',
    completed: false,
  })
    .then(respose => showOutput(respose))
    .catch(err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  //put will update the all records of id = 1 with the new data sent by the user
  // axios.put('https://jsonplaceholder.typicode.com/todos/1', {
  //   title: 'Updated todo',
  //   completed: true,
  // })
  //   .then(respose => showOutput(respose))
  //   .catch(err => console.log(err));

  //patch will only update the records of id = 1 with the new data sent by the user
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
    title: 'Updated todo',
    completed: true,
  })
    .then(respose => showOutput(respose))
    .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(respose => showOutput(respose))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
  ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    header: {
      'Content-Type': 'application/json',
      Authorization: 'sometozken',
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New todo',
    completed: false,
  }, config)
    .then(respose => showOutput(respose))
    .catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };
  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss', {
    validateStatus: function (status) {
      return status < 500; //reject only if status code is greater than 500
    }
  })
    .then(respose => showOutput(respose))
    .catch(err => {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      if (err.response.status === 404) {
        alert('Error: page not found');
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });
  if (true) {
    source.cancel('Request canceled!');
  }
}
// INTERCEPTING REQUESTS & RESPONSES
//this will intercept the request and fetch the data
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
const axiosIntance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

axiosIntance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

