import {v1} from "uuid";
import {TaskStatuses, todoListsAPI, TodoListsType} from "../api/todolists-api";
import {Dispatch} from "redux";

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListActiveStatusAC>
    | ReturnType<typeof setTodoListsAC>



export type TodolistDomainType = TodoListsType & {
    activeStatus: TaskStatuses
}

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodolistDomainType> = []


export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): TodoListsType[]=> {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            const newTodoList : TodoListsType = {...action.todoList}
            return [newTodoList, ...state]
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
    ({type: "ADD-TODOLIST", todoList, activeStatus: TaskStatuses.All} as const)

export const changeTodoListTitleAC = (title: string, id: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", title, id} as const)

export const changeTodoListActiveStatusAC = (status: TaskStatuses, id: string) =>
    ({type: "CHANGE-TODOLIST-STATUS", status, id} as const)

export const setTodoListsAC = (todoLists: Array<TodoListsType>) =>
    ({type: "SET-TODOLIST", todoLists} as const)



export const fetchTodoListTC = () => {
  return (dispatch: Dispatch) => {
      todoListsAPI.getTodoLists()
          .then(res => {
              dispatch(setTodoListsAC(res.data))
          })
  }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.addTodoList(title)
            .then(res => {
                const action = addTodoListAC(res.data.data.item)
                dispatch(action)
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.deleteTodoLIst(todoListId)
            .then(() => {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}

export const changeTodoListTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.changeTodoListTitle(todoListId, title)
            .then(() => {
                dispatch(changeTodoListTitleAC(title, todoListId))
            })
    }
}