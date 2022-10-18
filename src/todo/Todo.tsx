import React, {useState} from 'react'

import TodoForm from './TodoForm';
import { AiOutlineEdit, AiOutlineFileDone } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

interface TodoProps {
    todos : any
    , completeTodo : (id: number) => void
    , editTodo: any
    , deleteTodo: any
}

function Todo({todos, completeTodo, editTodo, deleteTodo}:TodoProps) {
    
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

  return (
    todos.map((todo:any, index:number) => (
    
        <div className={todo.completed ? 'todo-row complete ' : 'todo-row'} key={index}>
            <div className='datee'>
                {todo.timeShow}
            </div>

            <div key={todo.id} onClick={() => completeTodo(todo.id)} className="textTodo">
                {todo.title.replace(/ /g, "\u00a0")}
            </div>
            <div className='icons'>
                <AiOutlineEdit onClick={() => setEdit({id: todo.id, value: todo.title})} className="icon-edit"/>
                {/* <AiOutlineEdit onClick={() => editTodo({id: todo.id, value: todo.text})} className="icon-edit"/> */}
                <MdDeleteForever onClick={() => deleteTodo(todo.id)} className="icon-delete"/>
                <AiOutlineFileDone onClick={() => completeTodo(todo.id)} className="icon-done"/>
            </div>
        </div>
    
      ))
  );
}

export default Todo