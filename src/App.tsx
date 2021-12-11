import React, {useState} from 'react';
import {TodoList} from "./components/TodoList";
import './App.css'
import {v1} from "uuid";

function App() {

    type TasksType = {
        id: string
        title: string
        isDone: boolean
    }

    let [tasks, setTasks] = useState<TasksType[]>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ]
    )

    let [filter, setFilter] = useState('all')

    function removeTask(id: string) {
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

    function changeFilter(filter: "all" | "active" | "completed") {
        setFilter(filter)
    }

    function addTask(title: string) {
        let newTask: TasksType = {id: v1(), title: title, isDone: false}
        let newTasks: TasksType[] = [...tasks, newTask]
        setTasks(newTasks)
    }

    function changeStatus (taskID: string, isDone: boolean) {
        let task = tasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
