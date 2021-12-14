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

    // let [tasks, setTasks] = useState<TasksType[]>(
    //     [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'Redux', isDone: false}
    //     ]
    // )

    function removeTask(id: string, todoListId: string) {
        let tasksForFilter = tasks[todoListId]
        let filteredTasks = tasksForFilter.filter((task) => task.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        let newTask: TasksType = {id: v1(), title: title, isDone: false}
        let tasksForAdd = tasks[todoListId]
        let newTasks: TasksType[] = [...tasksForAdd, newTask]
        tasks[todoListId] = newTasks
        setTasks({...tasks})
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodoLists([...todoLists])
        }
    }

    function changeStatus (taskID: string, isDone: boolean, todolistId: string) {
        let tasksForChange = tasks[todolistId]
        let task = tasksForChange.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cola', isDone: false},
        ]
    })


    let [todoLists, setTodoLists]= useState<Array<TodoListsType>>([
        {id: todoListId1, title: "What to learn", filter: 'all'},
        {id: todoListId2, title: "What to buy", filter: 'all'},
    ])

    return (
        <div className="App">
            {
                todoLists.map((todoList) => {

                    let tasksForTodoList = tasks[todoList.id]

                    if (todoList.filter === 'completed') {
                        tasksForTodoList = tasks[todoList.id].filter(task => task.isDone)
                    }
                    if (todoList.filter === 'active') {
                        tasksForTodoList = tasks[todoList.id].filter(task => !task.isDone)
                    }
                    if (todoList.filter === 'all') {
                        tasksForTodoList = tasks[todoList.id]
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
