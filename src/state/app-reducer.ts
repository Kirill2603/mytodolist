import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    todoListsStatus: 'idle',
    todoListsError: null,
    tasksStatus: 'idle',
    tasksError: null,
    initialised: false
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setTodoListErrorAC (state, action: PayloadAction<{todoListError: string | null}>) {
            return {...state, todoListError: action.payload.todoListError}
        },
        setTodoListStatusAC (state, action: PayloadAction<{todoListStatus: 'idle' | 'loading' | 'succeeded' | 'failed'}>) {
           return  {...state, todoListStatus: action.payload.todoListStatus}
        },
        setTaskErrorAC (state, action: PayloadAction<{taskError: string | null}>) {
            return {...state, taskError: action.payload.taskError}
        },
        setTaskStatusAC (state, action: PayloadAction<{taskStatus: 'idle' | 'loading' | 'succeeded' | 'failed'}>) {
            return {...state, taskStatus: action.payload.taskStatus}
        },
        setAppInitialisedAC (state, action: PayloadAction<{initialised: boolean}>) {
            return {...state, initialised: action.payload.initialised}
        }
    }
})

export const appReducer = slice.reducer
export const {setAppInitialisedAC, setTodoListStatusAC, setTodoListErrorAC, setTaskErrorAC, setTaskStatusAC} = slice.actions

export const initialiseAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        res.data.resultCode === 0 && dispatch(setAppInitialisedAC({initialised: true}))
        dispatch(setIsLoggedInAC({value: true}))
    })
}
