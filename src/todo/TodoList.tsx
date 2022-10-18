import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';

interface todo { 
  userId: number;
  id:number;
  title: string; 
  completed: boolean; 
  time: string;
  timeShow: string | number,
}

function TodoList() {
    var [todos, setTodos] = useState<todo[]>([]);
    var [temTodos, setTemTodos] = useState<todo[]>([]);
    var [checkStatusComplete, setCheckStatusComplete] = useState(Boolean);
    var [checkStatusUnComplete, setCheckStatusUnComplete] = useState(Boolean);

    const [inputFilter, setInputFilter] = useState('');
    // var checkSearch = false;
    // var [checkSearch, setCheckSearch] = useState(Boolean);

    const changeTextFilter = (e: React.FormEvent<HTMLInputElement>) => {
      setInputFilter(e.currentTarget.value);
      const text = e.currentTarget.value;

      let searchTodos = [...temTodos].filter((todo:todo) => todo.title.includes(text));
      // if(!checkSearch && searchTodos.length >= 1) setCheckSearch(true);
      
      setTodos(searchTodos);
      if(text === ''){
        setTodos(temTodos);
      }

    };
    // get fake data todo
    useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/todos`)
      .then(res => {
        setTodos(res.data);
        setTemTodos(res.data);
      })
      .catch(error => {
        return toast.error("please check" + error.code);
      });
    }, [])
    //End of get fake data todo

    // push data

    const onAdd = () => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        userId: 1,
        id: 1,
        title: "add todo success",
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.data)
      .then((data) => {
        if(data.id !== 201){
          return toast.error("Add error");
        }
        else return toast.success("Add to Json placeholder success");
      });
    }

    const onEdit = () => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
      method: 'PUT',
      body: JSON.stringify({
        userId: 1,
        id: 1,
        title: "edit todo success",
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.data)
      .then((data) => {
        if(data.id !== 201){
          return toast.error("Edit error");
        }
        else return toast.success("Edit to Json placeholder success");
      });
    }

    const onDelete = () => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
      method: 'DELETE',
      body: JSON.stringify({
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.data)
      .then((data) => {
        if(data.id !== 201){
          return toast.error("Delete error");
        }
        else return toast.success("Delete to Json placeholder success");
      });
    }

    //End of push data
    

    const addTodo = (todo : todo) => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return toast.error("Please double check what todo");
        }
        
        todo.userId = todos.length + 1;
        todo.completed = false;
        if(todo.time === ''){
          const dt = new Date();
          todo.time = dt.toString();
          todo.timeShow =  'today';
        }
        else {

          const d = new Date(todo.time.toString());
          todo.time = todo.time.toString();
          
          
          var chooseTime = new Date(todo.time);
          const now =  new Date();
          var minNow = now.getHours();
          var hourNow = now.getHours();
          var dateNow = now.getDate();
          var monthNow = now.getMonth();
          var yearNow = now.getFullYear();

          var minChoose = chooseTime.getHours();
          var hourChoose = chooseTime.getHours();
          var dateChoose = chooseTime.getDate();
          var monthChoose = chooseTime.getMonth();
          var yearChoose = chooseTime.getFullYear();
          if(yearChoose > yearNow){
            todo.timeShow = yearChoose - yearNow + ' năm';
          }
          else {
            if(monthChoose > monthNow){
              todo.timeShow = monthChoose - monthNow + ' tháng';
            }
            else {
              if(dateChoose > dateNow){
                todo.timeShow = dateChoose - dateNow + ' ngày';
              }
              else if(dateChoose === dateNow){
                todo.timeShow = 'today';
                if(hourChoose > hourNow){
                  todo.timeShow = hourChoose - hourNow + ' giờ';
                }
                else {
                  if(minChoose > minNow){
                    todo.timeShow = minChoose - minNow + ' phút';
                  }
                  else {
                    return toast.error("Please choose a larger mintute");
                  }
                }
              }
              else {
                return toast.error("Please choose a larger date");
              }
            }
          }
        }
        

        if(checkStatusComplete || checkStatusUnComplete) {
          setTemTodos( [todo, ...temTodos] );
        }
        setTodos([todo, ...todos]); // [todo new, todo old]
        onAdd();
        return toast.success("Add success todo");
    };

    const editTodo = (todoId: number, newTodo: todo) => {
      if (!newTodo.title || /^\s*$/.test(newTodo.title)) {
        return;
      }
      setTodos( (todosBefore : any) => todosBefore.map((todo : todo) => (todo.id === todoId ? newTodo : todo)));

      if(checkStatusComplete || checkStatusUnComplete) {
        setTemTodos( (todosBefore) => todosBefore.map((todo:todo) => (todo.id === todoId ? newTodo : todo)));
      }

      onEdit();
      return toast.success("Edit success todo");
    }

    
    const deleteTodo = (id:number) => {
      let arrAfterRemoveTodo = [...todos].filter((todo:todo) => todo.id !== id);

      let tempTodo = todos.find((todo : todo) => {
        return todo.id === id;
      });
      
      setTodos(arrAfterRemoveTodo);

      onDelete();
      
      if(tempTodo){
        var textTodo = tempTodo.title.length > 30 ? tempTodo.title.slice(0, 30) + "..." : tempTodo.title;
        return toast.success("Delete success todo" + "\" " + textTodo +  "\"");
      }
      else {
        return toast.error("Todo not found");
      }
      
      
    }

    const completeTodo = (id:number) =>{
      setTodos(todos);
      var tempTodo = '';
      var statusTodo = true;

      // let updatedTodos : todo[] = [];
      let updatedTodos = todos.map((todo : todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;

          tempTodo = todo.title;
          statusTodo = todo.completed;
        }
        return todo;
      })
      setTodos(updatedTodos);
      var textTodo = tempTodo.length > 30 ? tempTodo.slice(0, 30) + "..." : tempTodo;
      return statusTodo ? toast.success("\"" + textTodo  + "\"" + " is complete") : toast.error("\"" + textTodo  + "\"" + " is uncomplete") ;
    };
    
    

    function completeTodoFilter() {
      if(checkStatusComplete) return;
      var todoFilter = [];

      if(!checkStatusUnComplete) {
        temTodos = todos;
        setTemTodos(temTodos);
        todoFilter = [...todos].filter((todo : todo) => todo.completed === true);

        setCheckStatusUnComplete(false);
      }
      else {
        todos = temTodos;
        setTodos(todos);
        todoFilter = [...todos].filter((todo : todo) => todo.completed === true);
      }

      setCheckStatusComplete(true);
      setTodos(todoFilter);
      
      // return toast.success("SHOW COMPLETE");
    };

    function unCompleteTodoFilter() {
      if(checkStatusUnComplete) return;

      var todoFilter = [];
      if(!checkStatusComplete) {
        temTodos = todos;
        setTemTodos(temTodos);
        todoFilter = [...todos].filter((todo : todo)  => todo.completed === false);

        setCheckStatusComplete(false);
      }
      else {
        todos = temTodos;
        setTodos(todos);
        todoFilter = [...todos].filter((todo : todo)  => todo.completed === false);
      }

      setCheckStatusComplete(true);
      setTodos(todoFilter);
      
      // return toast.success("SHOW UNCOMPLETE");
    };

    function showAll() {
      setCheckStatusComplete(false);
      setCheckStatusUnComplete(false);

      todos = temTodos;
      setTodos(todos);
      setTemTodos([]);
      // return toast.success("SHOW ALL");
    };
    
    var all = 0;
    var complete = 0;
    var unComplete = 0;
    if(checkStatusComplete || checkStatusUnComplete) {
      all = [...temTodos].length;
      complete = [...temTodos].filter(todo => todo.completed === true).length;
      unComplete = [...temTodos].filter(todo => todo.completed === false).length;
    }
    else {
      all = [...todos].length;
      complete = [...todos].filter(todo => todo.completed === true).length;
      unComplete = [...todos].filter(todo => todo.completed === false).length;
    }
    

  return (
    <div>
      <script src="https://smtpjs.com/v3/smtp.js">
      </script>
      <div className='card-todo'></div>
        <h4>What are you doing today?</h4>

        { checkStatusComplete || [...todos].length > 1 ? 
        (
          <span className='show-counter'>all  {all}  <span className='text-unComplete'>| active {unComplete}</span> <span className='text-complete'> | complete {complete}</span></span>
          // <span className='show-counter'>all  {all} | active {unComplete} | complete {complete}</span>
        ) : 
        (
          <span></span>
        )}    

        { checkStatusComplete || [...todos].length > 1 || [...temTodos].length > 1 ? 
        (
          <div className='filter' >
              <input value={inputFilter} placeholder="Hey! What todo are you looking for????" className="todo-input input-search" onChange={changeTextFilter} name="title"/>
              <button className="filter-todo">
              <AiFillCheckCircle onClick={() => completeTodoFilter()} className="icon-complete" aria-disabled={true}/>
              <AiFillCloseCircle onClick={() => unCompleteTodoFilter()} className="icon-unComplete"/>
              </button>

              { checkStatusComplete ? 
              (
                <button className="add-todo all-todo" onClick={() => showAll()} >All</button> 
              ) : 
              (
                <span></span>
              )}

          </div>
        ) : 
        (
          <span></span>
        )}

        <TodoForm onSubmit={addTodo}/>

        <Todo todos={todos} completeTodo={completeTodo} 
        editTodo={editTodo} deleteTodo={deleteTodo} />

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> 
    </div>
  )
}

export default TodoList