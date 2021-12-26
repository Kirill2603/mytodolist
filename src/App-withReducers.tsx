import React, {useReducer} from 'react';
import {TodoList} from "./components/TodoList";
import './App.css'
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithReducers() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

    let [todoLists, dispatchTodoListsReducer] = useReducer(todoListsReducer,[
        {id: todoListId1, title: "What to learn", filter: 'all'},
        {id: todoListId2, title: "What to buy", filter: 'all'},
    ])

    function removeTask(id: string, todoListId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todoListId))
        // let tasksForFilter = tasks[todoListId]
        // tasks[todoListId] = tasksForFilter.filter((task) => task.id !== id)
        // setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasksReducer(addTaskAC(title, todoListId))
        // let newTask: TasksType = {id: v1(), title: title, isDone: false}
        // let tasksForAdd = tasks[todoListId]
        // tasks[todoListId] = [...tasksForAdd, newTask]
        // setTasks({...tasks})
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(newTitle, id, todoListId))
        // let tasksForChange = tasks[todoListId]
        // let task = tasksForChange.find(task => task.id === id)
        // if (task) {
        //     task.title = newTitle
        // }
        // setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskID, isDone, todolistId))
        // let tasksForChange = tasks[todolistId]
        // let task = tasksForChange.find(task => task.id === taskID)
        // if (task) {
        //     task.isDone = isDone
        // }
        // setTasks({...tasks})
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        dispatchTodoListsReducer(changeTodoListFilterAC(filter, todolistId))
        // let todolist = todoLists.find(todolist => todolist.id === todolistId)
        // if (todolist) {
        //     todolist.filter = filter
        //     setTodoLists([...todoLists])
        // }
    }

    function changeTodoListTitle(newTodoListTitle: string, todoListId: string) {
        dispatchTodoListsReducer(changeTodoListTitleAC(newTodoListTitle, todoListId))
        // let todolist = todoLists.find(todolist => todolist.id === todoListId)
        // if (todolist) {
        //     todolist.title = newTodoListTitle
        //     setTodoLists([...todoLists])
        // }
    }

    let removeTodoList = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatchTodoListsReducer(action)
        dispatchToTasksReducer(action)
        // let filteredTodoList = todoLists.filter(todoList => todoList.id !== todoListId)
        // setTodoLists(filteredTodoList)
        // delete tasks[todoListId]
        // setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchTodoListsReducer(action)
        dispatchToTasksReducer(action)
        // let newTodoList: TodoListsType = {
        //     id: v1(),
        //     title: title,
        //     filter: "all"
        // }
        // setTodoLists([...todoLists, newTodoList])
        // setTasks({...tasks, [newTodoList.id]: []})
    }

    return (

        <div className="App">

            <AppBar enableColorOnDark={true} position="static" style={{marginBottom: "12px"}}>
                <Toolbar>
                    <Grid container xs={5} direction={"row"} justifyContent="center"
                          alignItems="center">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            To Do List
                        </Typography>
                    </Grid>
                    <Grid container xs gridTemplateRows={1}>
                        <AddItemForm  addItem={addTodoList}/>
                    </Grid>
                    <Grid container xs={2} alignItems={"end"} justifyContent={"end"}>
                        <Button color="inherit">Login</Button>
                    </Grid>


                </Toolbar>
            </AppBar>

                <Grid container spacing={3} alignItems={"center"} justifyContent={"center"}>
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
                                <Grid item >
                                    <Paper elevation={12} style={{padding: '15px'}}>
                                <TodoList
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addItem={addTask}
                                    changeStatus={changeStatus}
                                    filter={todoList.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

        </div>
    );
}

export default AppWithReducers;
