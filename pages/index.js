fetch('http://localhost:8080/productos/')
  .then(response => response.json())
  .then(data => {
    const productos = data.map((newData) => {
      return `
      <tr>
        <th scope="row">${newData.id}</th>
        <td>${newData.title}</td>
        <td>${newData.thumbnail}</td>
        <td>${newData.precio}</td>
      </tr>
      `
    }).join('')

    usersBody.innerHTML = productos
  })

//const formUser = document.getElementById('formUser')
//const buttonSubmit = document.getElementById('buttonSubmit')
const usersBody = document.getElementById('usersBody')

//const nameInput = document.getElementById('exampleInputName')
//const emailInput = document.getElementById('exampleInputEmail')
//const usernameInput = document.getElementById('exampleInputUsername')

buttonSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  
  const user = {
    name: nameInput.value,
    email: emailInput.value,
    username: usernameInput.value
  }

  return fetch('http://localhost:8080/public', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
})
