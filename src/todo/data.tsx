import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineFileDone } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import TodoForm from './TodoForm';

// if update hoow get data , I'll use this file

interface TodoProps {
  todos : any
  , completeTodo : (id: number) => void
  , editTodo: any
  , deleteTodo: any
}

function Data({todos, completeTodo, editTodo, deleteTodo}:TodoProps): JSX.Element {


    const [todos2, setTodos2] = useState([]);

    useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/todos`)
      .then(res => {
        setTodos2(res.data);
      })
      .catch(error => {
        return toast.error("please check" + error.code);
      });
    }, [])

    const [edit, setEdit] = useState({
      id: null,
      value: ''
  });

  const submitUpdate = (value:any) => {
      editTodo(edit.id, value);

      setEdit({
          id: null,
          value: ''
      });
  }
  if(edit.id) {
      return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  const test =  [...todos2];
    return (
      <>{
      todos2.map((todo:any, index:number) => (
          
        <div className={todo.completed ? 'todo-row complete ' : 'todo-row'} key={index}>

            <div key={todo.id} onClick={() => completeTodo(todo.id)} className="textTodo">
                {todo.title.replace(/ /g, "\u00a0")}
            </div>
            <div className='icons'>
                <AiOutlineEdit onClick={() => setEdit({id: todo.id, value: todo.text})} className="icon-edit"/>
                {/* <AiOutlineEdit onClick={() => editTodo({id: todo.id, value: todo.text})} className="icon-edit"/> */}
                <MdDeleteForever onClick={() => deleteTodo(todo.id)} className="icon-delete"/>
                <AiOutlineFileDone onClick={() => completeTodo(todo.id)} className="icon-done"/>
            </div>
        </div>

      ))
      }</>
    );
}

export default Data;
export var todos2 : TodoProps ;
// export const todos2 : TodoProps[]  = [...todos2];
// export const test = [...todos2];