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
    status: number
}

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML&CSS', status: 2},
        {id: v1(), title: 'JS', status: 2},
        {id: v1(), title: 'React', status: 1},
        {id: v1(), title: 'Redux', status: 1}
    ],
    [todoListId2]: [
        {id: v1(), title: 'Book', status: 3},
        {id: v1(), title: 'Milk', status: 2},
        {id: v1(), title: 'Cola', status: 0},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            const newTasks = tasks.filter(t => t.id !== action.id);
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {
                id: v1(),
                title: action.title,
                status: 0
            }
            const tasks = stateCopy[action.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }

        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todoListId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.id ? {...t, title: action.title} : t);

            state[action.todoListId] = newTasksArray;
            return ({...state});
        }

        case 'CHANGE-TASK-STATUS' : {
            let todolistTasks = state[action.todoListId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.id ? {...t, status: action.status} : t);

            state[action.todoListId] = newTasksArray;
            return ({...state});
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoListId]: []
            }
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

export const changeTaskStatusAC = (id: string, status: number, todoListId: string): ChangeTaskStatusActionType=> {
  return {type: "CHANGE-TASK-STATUS", status: status, id: id, todoListId: todoListId}
}