import React, {useState} from 'react';
import {TodoList} from "./components/TodoList";
import './App.css'
import {v1} from "uuid";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState<TasksType[]>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ]
    )



    function removeTask(id: string) {
        let filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask: TasksType = {id: v1(), title: title, isDone: false}
        let newTasks: TasksType[] = [...tasks, newTask]
        setTasks(newTasks)
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodoLists([...todoLists])
        }
    }

    function changeStatus (taskID: string, isDone: boolean) {
        let task = tasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let [todoLists, setTodoLists]= useState<Array<TodoListsType>>([
        {id: v1(), title: "What to learn", filter: 'all'},
        {id: v1(), title: "What to buy", filter: 'active'},
    ])

    return (
        <div className="App">
            {
                todoLists.map((todoList) => {

                    let tasksForTodoList = tasks

                    if (todoList.filter === 'completed') {
                        tasksForTodoList = tasks.filter(task => task.isDone)
                    }
                    if (todoList.filter === 'active') {
                        tasksForTodoList = tasks.filter(task => !task.isDone)
                    }
                    if (todoList.filter === 'all') {
                        tasksForTodoList = tasks
                    }

                    return (
                        <TodoList
                            key={todoList.id}
                            id={todoList.id}
                            title={todoList.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={todoList.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
