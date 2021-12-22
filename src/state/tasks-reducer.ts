import {TasksStateType} from "../App";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodoListActionType |
    RemoveTodoListActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    id: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    id: string
    title: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    id: string
    isDone: boolean
}



export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.id)
            return stateCopy
            // let tasksForFilter = tasks[action.todoListId]
            // tasks[action.todoListId]  = tasksForFilter.filter((task) => task.id !== action.id)
            // return {...tasks}
        }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const newTask = {id: action.todoListId, title: action.title, isDone: false}
            stateCopy[action.todoListId] = [...tasks, newTask]
            return stateCopy
            // let newTask: TasksType = {id: v1(), title: action.title, isDone: false}
            // let tasksForAdd = state[action.todoListId]
            // state[action.todoListId] = [...tasksForAdd, newTask]
            // return {...state}
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasksForChange = stateCopy[action.todoListId]
            let task = tasksForChange.find(task => task.id === action.id)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }

        case 'CHANGE-TASK-STATUS' : {
            const stateCopy = {...state}
            let tasksForChange = stateCopy[action.todoListId]
            let task = tasksForChange.find(task => task.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todoListId: todolistId, id: id}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: "ADD-TASK", title: title, todoListId: todolistId}
}

export const changeTaskTitleAC = (title: string, id: string, todoListId: string): ChangeTaskTitleActionType => {
  return {type: "CHANGE-TASK-TITLE", title: title, id: id, todoListId: todoListId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType=> {
  return {type: "CHANGE-TASK-STATUS", isDone: isDone, id: id, todoListId: todoListId}
}