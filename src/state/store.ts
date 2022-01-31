import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer"
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store