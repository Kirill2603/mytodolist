
import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App-withRedux";

type ActionsType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todoListId: string
    title: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: TodoListsType[] = [
    {id: todoListId1, title: "What to learn", filter: 'all'},
    {id: todoListId2, title: "What to buy", filter: 'all'},
]


export const todoListsReducer = (state: TodoListsType[] = initialState, action: ActionsType): TodoListsType[]=> {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state ]
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            let todolist = state.find(todolist => todolist.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
  return {type: "ADD-TODOLIST", title: title, todoListId: v1()}
}

export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
  return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
}

export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}