import './App.css';
import TodoList from './todo/TodoList';

function App() {
  return (
    <div className="App">
      <h1>Todo <span className='name-branch'>NCC</span></h1>
      <TodoList />
    </div>
  );
}

export default App;
