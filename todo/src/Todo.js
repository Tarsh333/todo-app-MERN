import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
function Todo({ todos,deleteItem,editItem,inputFocus }) {
    return (
        <div>
            {todos.map((data , index) => {
                return (
                    <article key={index}>
                        <p className='todo'>{data.title}</p>
                        <div className='btns'>

                       <button onClick={()=>{editItem(data.id);inputFocus()}}> <FaEdit style={{color:'green'}}/></button>
                       <button onClick={()=>{deleteItem(data.id)}}><FaTrashAlt style={{color:'red'}}/></button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default Todo
