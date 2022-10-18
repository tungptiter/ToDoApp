import React, { FormEventHandler, useState } from 'react'
import Datetime from 'react-datetime';

function TodoForm(props : any) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const [timer, setTimer] = useState(props.edit ? props.edit.value : '');

    const changeText = ( e: React.FormEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    };
    const changeTime  = ( e:  string | moment.Moment) => {
        setTimer(e);
    };
    const submit =( e: React.FormEvent<HTMLFormElement>)  => {
        e.preventDefault();
        

        props.onSubmit({
            id: Math.floor(Math.random() * 100000),
            title: input,
            time: timer
        })
        setInput('');
        setIsActive(current => !current);
        
    }

    const [isActive, setIsActive] = useState(false);
    function showDate() {
        setIsActive(current => !current);
    };
    return (
        <form action="todo-form" onSubmit={(e) => submit(e)} className="formTodo">
            {props.edit ? 
            (
                <>
                <input value={input} placeholder="Update your todo" className="todo-input update-input" onChange={changeText} name="text" autoFocus />
                <button className="add-todo update-todo">Update Todo</button>
                </>
            ) : 
            (
                <>
                <input value={input} placeholder="Enter your todo" className="todo-input" style={{marginLeft: (isActive || input !== '') ? '5%' : '0'}} onChange={changeText} name="text" autoFocus />
                
                <button type='button' className="button-date"  style={{display: (isActive || input !== '') ? 'inline' : 'none'}}   onClick={() => showDate()} >Timer</button>
                
                <button type='submit' className="add-todo">Add Todo</button>
                <div> 
                    <span style={{display: isActive ? 'block' : 'none'}} ><Datetime onChange={(e)=> changeTime(e)} value={timer} className='todo-date ' /></span>
                </div>
                </>
            ) }

        </form>
    )
}

export default TodoForm