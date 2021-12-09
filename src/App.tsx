import React, {useState} from 'react';
import {TodoList} from "./components/TodoList";
import './App.css'

function App() {

    type TasksType = {
        id: number
        title: string
        isDone: boolean
    }


    let [tasks, setTasks] = useState<TasksType[]>(
        [
            {id: 0, title: 'HTML&CSS', isDone: true},
            {id: 1, title: 'JS', isDone: true},
            {id: 2, title: 'React', isDone: false},
            {id: 3, title: 'Redux', isDone: false}
        ]
    )

    let [filter, setFilter] = useState('all')

    function removeTask(id: number) {
        let filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }

    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => !task.isDone)
    }
    if (filter === 'all') {
        tasksForTodoList = tasks
    }

    // const tasks2: TasksType[] = [
    //     {id: 0, title: 'Terminator', isDone: true},
    //     {id: 1, title: 'XXX', isDone: true},
    //     {id: 2, title: `Gentlemen's of fortune`, isDone: false},
    //     {id: 4, title: `Terminator 2`, isDone: true},
    // ]

  return (
    <div className="App">
      <TodoList
          title="What to learn"
          tasks={tasksForTodoList}
          removeTask={removeTask}
          setFilter={setFilter}
      />
      {/*<TodoList title="Movies" tasks={tasks2}/>*/}
    </div>
  );
}

export default App;
