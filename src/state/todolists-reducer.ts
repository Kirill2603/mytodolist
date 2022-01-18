import {v1} from "uuid";
import {TaskStatuses, TodoListsType} from "../api/todolists-api";

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>


export type TodolistDomainType = TodoListsType & {
    activeStatus: TaskStatuses
}

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = [
    {id: todoListId1, title: "What to learn", order: 0, addedDate: '', activeStatus: TaskStatuses.All},
    {id: todoListId2, title: "What to buy", order: 0, addedDate: '' , activeStatus: TaskStatuses.All},
]


export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): TodoListsType[]=> {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {id: action.todoListId, title: action.title, order: 0, addedDate: ''}]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state ]
        }

        case 'CHANGE-TODOLIST-STATUS' : {
            let todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.activeStatus = action.status
            }
            return [...state]
        }

        default:
            return state
    }
}

export const removeTodolistAC = (id: string) =>
    ({ type: 'REMOVE-TODOLIST', id} as const)

export const addTodoListAC = (title: string) =>
    ({type: "ADD-TODOLIST", title, todoListId: v1()} as const)

export const changeTodoListTitleAC = (title: string, id: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", title, id} as const)

export const changeTodoListFilterAC = (status: TaskStatuses, id: string) =>
    ({type: "CHANGE-TODOLIST-STATUS", status, id} as const)

