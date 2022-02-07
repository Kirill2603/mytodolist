import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {setTodoListStatusAC} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            return {...state, isLoggedIn: action.payload.value}
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setTodoListStatusAC({todoListStatus: "loading"}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                console.log(res.data.data.userId)
                dispatch(setTodoListStatusAC({todoListStatus: "succeeded"}))
            } else {
                alert('Error!')
                dispatch(setTodoListStatusAC({todoListStatus: "succeeded"}))
            }
        })
        .catch(error => {
            alert(error)
            dispatch(setTodoListStatusAC({todoListStatus: "succeeded"}))
        })
}

