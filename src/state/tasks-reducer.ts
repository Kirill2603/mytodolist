import {addTodoListAC, removeTodolistAC, todoListId1, todoListId2} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskStatuses, TaskType} from "../api/todolists-api";


type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoListAC>

type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: 5, startDate: ''},
        {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: 4, startDate: ''},
        {id: v1(), title: 'React', status: TaskStatuses.InProgress, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: 4, startDate: ''},
        {id: v1(), title: 'Redux', status: TaskStatuses.InProgress, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: 5, startDate: ''},
        {id: v1(), title: 'Thunk', status: TaskStatuses.New, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: 3, startDate: ''},
        {id: v1(), title: 'Chakra', status: TaskStatuses.Draft, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, priority: 4, startDate: ''},
    ],
    [todoListId2]: [
        {id: v1(), title: 'Book', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: 4, startDate: ''},
        {id: v1(), title: 'Milk', status: TaskStatuses.InProgress, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: 2, startDate: ''},
        {id: v1(), title: 'Cola', status: TaskStatuses.Draft, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: 2, startDate: ''},
        {id: v1(), title: 'Bread', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, priority: 1, startDate: ''},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.id);
            return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListId,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: ''
            }
            const tasks = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = [newTask, ...tasks];
            return stateCopy;
        }

        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todoListId];
            // найдём нужную таску:
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.id ? {...t, title: action.title} : t);
            return ({...state});
        }

        case 'CHANGE-TASK-STATUS' : {
            let todolistTasks = state[action.todoListId];
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.id ? {...t, status: action.status} : t);
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

export const removeTaskAC = (id: string, todoListId: string)=>
    ({ type: 'REMOVE-TASK', todoListId, id} as const)


export const addTaskAC = (title: string, todoListId: string) =>
    ({type: "ADD-TASK", title, todoListId}  as const)


export const changeTaskTitleAC = (title: string, id: string, todoListId: string) =>
    ({type: "CHANGE-TASK-TITLE", title: title, id, todoListId}  as const)


export const changeTaskStatusAC = (id: string, status: number, todoListId: string) =>
    ({type: "CHANGE-TASK-STATUS", status: status, id, todoListId} as const)