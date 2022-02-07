import {TaskStatuses, todoListsAPI, TodoListsType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setTodoListStatusAC} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TodolistDomainType = TodoListsType & {
    activeStatus: TaskStatuses
}

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todoListId: string }>) {
            return state.filter(todolist => todolist.id !== action.payload.todoListId)
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListsType }>) {
            return [{...action.payload.todoList, activeStatus: TaskStatuses.All}, ...state]
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ title: string, todoListId: string }>) {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
        },
        changeTodoListActiveStatusAC(state, action: PayloadAction<{ status: TaskStatuses, todoListId: string }>) {
            return state.map(tl => tl.id === action.payload.todoListId ? {
                ...tl,
                activeStatus: action.payload.status
            } : tl)
        },
        setTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodoListsType>}>) {
            console.log(action.payload.todoLists.map(tl => ({...tl, activeStatus: TaskStatuses.All})))
            return action.payload.todoLists.map(tl => ({...tl, activeStatus: TaskStatuses.All}))
        }
    }
})


export const todoListsReducer = slice.reducer
export const {
    changeTodoListTitleAC,
    addTodoListAC,
    removeTodolistAC,
    changeTodoListActiveStatusAC,
    setTodoListsAC
} = slice.actions

//(state: Array<TodolistDomainType> = initialState, action: ActionsType): TodoListsType[]=> {
//     switch (action.type) {
//
//         case 'REMOVE-TODOLIST': {
//             return state.filter(todolist => todolist.id !== action.id)
//         }
//
//         case 'ADD-TODOLIST': {
//             return [{...action.todoList, activeStatus: TaskStatuses.All}, ...state]
//         }
//
//         case 'CHANGE-TODOLIST-TITLE': {
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         }
//
//         case 'CHANGE-TODOLIST-STATUS' : {
//             return state.map(tl => tl.id === action.id ? {...tl, activeStatus: action.status} : tl)
//
//         }
//         case 'SET-TODOLIST' : {
//             return action.todoLists
//         }
//
//         default:
//             return state
//     }
// }

//
// export const removeTodolistAC = (id: string) =>
//     ({ type: 'REMOVE-TODOLIST', id} as const)
//
// export const addTodoListAC = (todoList: TodoListsType) =>
//     ({type: "ADD-TODOLIST", todoList} as const)
//
// export const changeTodoListTitleAC = (title: string, id: string) =>
//     ({type: "CHANGE-TODOLIST-TITLE", title, id} as const)
//
// export const changeTodoListActiveStatusAC = (status: TaskStatuses, id: string) =>
//     ({type: "CHANGE-TODOLIST-STATUS", status, id} as const)
//
// export const setTodoListsAC = (todoLists: Array<TodoListsType>) =>
//     ({type: "SET-TODOLIST", todoLists} as const)
//


export const fetchTodoListTC = () => (dispatch: Dispatch) => {
    dispatch(setTodoListStatusAC({todoListStatus: "loading"}))
    todoListsAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC({todoLists: res.data}))
            dispatch(setTodoListStatusAC({todoListStatus: "succeeded"}))
        })
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.addTodoList(title)
            .then(res => {
                const action = addTodoListAC({todoList: res.data.data.item})
                dispatch(action)
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.deleteTodoLIst(todoListId)
            .then(() => {
                dispatch(removeTodolistAC({todoListId: todoListId}))
            })
    }
}

export const changeTodoListTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.changeTodoListTitle(todoListId, title)
            .then(() => {
                dispatch(changeTodoListTitleAC({title: title, todoListId: todoListId}))
            })
    }
}