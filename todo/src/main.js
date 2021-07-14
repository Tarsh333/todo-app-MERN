import './App.css';
import { useEffect, useRef, useState } from 'react'
import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';
import Alert from './Alert';
import { useHistory } from 'react-router';
import { getTodos, delData, delAll, editData, sendData } from './FetchMethods'
import { VscLoading } from "react-icons/vsc";

function Main({ delUser }) {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [alert, setAlert] = useState({ message: '', type: '', show: false })
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef();
  useEffect(async () => {
    const x = await getTodos()
    if (x === 'ERROR') {
      setAlert({ message: 'Could not load data . Try again later.', type: 'danger', show: true })
    } else {
      setTodos(x)

    }
  }, [todos])



  const submitHandler = async (e) => {
    e.preventDefault()
    if (!input) {
      setAlert({ message: 'Please enter a value', type: 'danger', show: true })
    }
    else if (isEditing) {
      setLoading(true)
      const result = await editData(editId, input)
      if (result === 'ERROR') {
        setAlert({ message: 'Error saving data. Try again', type: 'danger', show: true })
        setIsEditing(false)
        setEditId(null)
        setInput('')
        setLoading(false)
      } else {
        setTodos(todos.map((data) => {
          if (data.id === editId) {
            return { ...data, title: input }
          }
          return data
        }))
        setLoading(false)
        setIsEditing(false)
        setEditId(null)
        setInput('')
        setAlert({ message: 'value edited', type: 'success', show: true })
      }
    }
    else {
      setLoading(true)
      const inputTodo = { title: input, id: uuidv4() }
      const x = await sendData(inputTodo)
      if (x === 'ERROR') {
        setAlert({ message: 'Error adding data. Try again', type: 'danger', show: true })
        setLoading(false)
      }
      else {
        setTodos((prev) => { return [...prev, inputTodo] })
        setInput('')
        setAlert({ message: 'Todo added', type: 'success', show: true })
        setLoading(false)
      }
    }
  }
  const deleteItem = async (id) => {
    setLoading(true)
    const x = await delData(id)
    if (x === 'ERROR') {
      setAlert({ message: 'error deleting item. Please try again', type: 'danger', show: true })
      setIsEditing(false)
      setInput('')
      setLoading(false)
    } else {
      const newTodos = todos.filter((data) => { return (data.id !== id) })
      setTodos(newTodos)
      setAlert({ message: 'item deleted', type: 'danger', show: true })
      setIsEditing(false)
      setInput('')
      setLoading(false)
    }
  }
  const editItem = (id) => {
    setIsEditing(true)
    setEditId(id)
    const editInput = todos.filter(data => data.id === id)[0].title
    setInput(editInput)
  }
  const clearList = async () => {
    setLoading(true)
    const x = await delAll()
    if (x == 'ERROR') {
      setAlert({ message: 'errro deleting . try again', type: 'danger', show: true })
setLoading(false)
    } else {
      setTodos([])
      setAlert({ message: 'list cleared', type: 'danger', show: true })
setLoading(false)

    }
  }
  const removeAlert = () => {
    setAlert({ ...alert, show: false })
  }
  const history = useHistory()
  const logout = async () => {
    localStorage.clear()
    const res = await fetch(`http://localhost:5000/logout/`)
    const data = await res.json()
    history.push('/auth')
  }
  const inputFocus = () => {
    inputRef.current.focus();
  }
  return (
    <div className="main">
      {alert.show &&
        <Alert
          alert={alert}
          removeAlert={removeAlert}
          todos={todos}
        />}
      <h1>Todos</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='e.g. Go To Walk' onChange={(e) => { setInput(e.target.value) }} value={input} ref={inputRef} />
        <button type="submit">
          {loading?<VscLoading/>:isEditing ? 'Edit' : 'Add'}
        </button>
      </form>
      {todos.length > 0 &&
        <div style={{ width: '100%' }}>
          <Todo
            todos={todos}
            deleteItem={deleteItem}
            editItem={editItem}
            inputFocus={inputFocus}
          />
          <button onClick={clearList} className='clear-btn'>Clear Items</button>
        </div>
      }
      <button onClick={() => { delUser(); logout() }} className='logout'>Logout</button>
    </div>
  );
}

export default Main;