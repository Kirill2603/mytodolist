import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setTaskStatusAC, setTodoListStatusAC} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TasksStateType = {
    [key: string]: TaskType[]
}
const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC (state, action: PayloadAction<{id: string, todoListId: string}>) {
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.id)}
        },
        addTaskAC (state, action: PayloadAction<{task: TaskType}>) {
            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
        },
        changeTaskTitleAC (state, action: PayloadAction<{title: string, id: string, todoListId: string}>) {
            let todolistTasks = state[action.payload.todoListId];
            // найдём нужную таску:
            state[action.payload.todoListId] = todolistTasks
                .map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t);
            return ({...state});
        },
        updateTaskAC (state, action: PayloadAction<{todoListId: string, id: string, task: UpdateTaskModelType}>) {
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.id ? {...t, ...action.payload.task} : t)
            }
        },
        setTasksAC (state, action: PayloadAction<{tasks: Array<TaskType>, todolistId: string}>) {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        },

    }
})

export const tasksReducer = slice.reducer
export const {addTaskAC, removeTaskAC, changeTaskTitleAC, setTasksAC,updateTaskAC} = slice.actions

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    debugger
    dispatch(setTaskStatusAC({taskStatus: "loading"}))
    todoListsAPI.getTasks(todolistId)
        .then((res) => {
            console.log(res.data.items)
            dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
            dispatch(setTaskStatusAC({taskStatus: "succeeded"}))
        })
}

export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todoListID, taskID)
        .then(() => {
            const action = removeTaskAC({id: taskID, todoListId: todoListID})
            dispatch(action)
        })
}

export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setTodoListStatusAC({todoListStatus: "loading"}))
    todoListsAPI.addTask(todoListID, title)
        .then(res => {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setTodoListStatusAC({todoListStatus: "succeeded"}))
        })
}

export const changeTaskStatusTC = (todoListID: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todoListID].find(t => t.id === taskId)

        if (!task) {
            console.log('not found task!!!')
            return
        }

        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        todoListsAPI.updateTask(todoListID, taskId, model)
            .then(() => {
                const action = updateTaskAC({todoListId: todoListID, id: taskId, task: model})
                dispatch(action)
            })
    }


