import React from 'react';
import {TodoList} from "./components/TodoList";
import './App.css'

function App() {

    type TasksType = {
        id: number
        title: string
        isDone: boolean
    }

    const tasks1: TasksType[] = [
        {id: 0, title: 'HTML&CSS', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'React', isDone: false},
    ]

    const tasks2: TasksType[] = [
        {id: 0, title: 'Terminator', isDone: true},
        {id: 1, title: 'XXX', isDone: true},
        {id: 2, title: `Gentlemen's of fortune`, isDone: true},
    ]

  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasks1}/>
      <TodoList title="Movies" tasks={tasks2}/>
    </div>
  );
}

export default App;
