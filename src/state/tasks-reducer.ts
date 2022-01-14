import {AddTodoListActionType, RemoveTodoListActionType, todoListId1, todoListId2} from "./todolists-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../App-withRedux";

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

const initialState: TasksStateType = {
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
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.id)
            return stateCopy
        }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todoListId] = [...tasks, newTask]
            return stateCopy
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
            let tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
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
            return state
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