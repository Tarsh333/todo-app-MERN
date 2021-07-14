const getTodos = async () => {
  const res = await fetch('http://localhost:5000/data', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem('profile')).token
    }
  })
  const data = await res.json()
  const todoData = data.todos
  if (todoData) {
    return todoData

  }
  else if (data.error) {
    return 'ERROR'
   }
  else {
    return []
  }
}

const sendData = async (todo) => {
  const res = await fetch('http://localhost:5000/data', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem('profile')).token
    },
    body: JSON.stringify({
      todo: todo
    })

  })
  const data = await res.json()
  console.log(data);
  if (data.error) {
    return 'ERROR'
   }
  else {
    return 'SUCCESS'
  }
}

const delData = async (id) => {
  const res = await fetch(`http://localhost:5000/data/${id}`, {
    method: 'DELETE', headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem('profile')).token
    }
  })
  const data = await res.json()
  console.log(data);
  if (data.error) {
    return 'ERROR'
   }
  else {
    return 'SUCCESS'
  }
}

const editData = async (id, todo) => {
  const res = await fetch(`http://localhost:5000/data/${id}`, {
    method: 'PUT', headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem('profile')).token
    },
    body: JSON.stringify({
      todo: todo
    })
  })
  const data = await res.json()

  console.log(data);
  if (data.error) {
    return 'ERROR'
   }
  else {
    return 'SUCCESS'
  }
}


const delAll = async () => {
  const res = await fetch(`http://localhost:5000/data/`, {
    method: 'DELETE', headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(localStorage.getItem('profile')).token
    }
  })
  const data = await res.json()
  console.log(data);
  if (data.error) {
    return 'ERROR'
   }
  else {
    return 'SUCCESS'
  }

}
export { getTodos, delData, delAll, editData, sendData }

