import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer"

type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoList: todoListsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store