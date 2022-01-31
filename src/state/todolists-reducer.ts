import {TaskStatuses, todoListsAPI, TodoListsType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, setTodoListStatusAC} from "./app-reducer";

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListActiveStatusAC>
    | ReturnType<typeof setTodoListsAC>



export type TodolistDomainType = TodoListsType & {
    activeStatus: TaskStatuses
}

const initialState: Array<TodolistDomainType> = []


export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): TodoListsType[]=> {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [{...action.todoList, activeStatus: TaskStatuses.All}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-STATUS' : {
            return state.map(tl => tl.id === action.id ? {...tl, activeStatus: action.status} : tl)

        }
        case 'SET-TODOLIST' : {
            return action.todoLists
        }

        default:
            return state
    }
}


export const removeTodolistAC = (id: string) =>
    ({ type: 'REMOVE-TODOLIST', id} as const)

export const addTodoListAC = (todoList: TodoListsType) =>
    ({type: "ADD-TODOLIST", todoList} as const)

export const changeTodoListTitleAC = (title: string, id: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", title, id} as const)

export const changeTodoListActiveStatusAC = (status: TaskStatuses, id: string) =>
    ({type: "CHANGE-TODOLIST-STATUS", status, id} as const)

export const setTodoListsAC = (todoLists: Array<TodoListsType>) =>
    ({type: "SET-TODOLIST", todoLists} as const)



export const fetchTodoListTC = () => (dispatch: Dispatch<ActionsType | AppActionsType>) => {
    dispatch(setTodoListStatusAC('loading'))
      todoListsAPI.getTodoLists()
          .then(res => {
              dispatch(setTodoListsAC(res.data))
              dispatch(setTodoListStatusAC('succeeded'))
          })
  }


//

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListsAPI.addTodoList(title)
            .then(res => {
                const action = addTodoListAC(res.data.data.item)
                dispatch(action)
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListsAPI.deleteTodoLIst(todoListId)
            .then(() => {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}

export const changeTodoListTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListsAPI.changeTodoListTitle(todoListId, title)
            .then(() => {
                dispatch(changeTodoListTitleAC(title, todoListId))
            })
    }
}