import {addTodoListAC, removeTodolistAC, setTodoListsAC} from "./todolists-reducer";
import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";
import {AppActionsType, setTaskStatusAC, setTodoListStatusAC} from "./app-reducer";


type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>

    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>


type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.id)}
        }

        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }

        case 'UPDATE-TASK' : {
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.id ? {...t, ...action.task} : t)
            }
        }

        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todoListId];
            // найдём нужную таску:
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.id ? {...t, title: action.title} : t);
            return ({...state});
        }


        case 'SET-TODOLIST' : {
            const stateCopy = {...state}

            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            return {...state, [action.todoList.id]: []}
        }

        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }

        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}


export const removeTaskAC = (id: string, todoListId: string) =>
    ({type: 'REMOVE-TASK', todoListId, id} as const)


export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)


export const changeTaskTitleAC = (title: string, id: string, todoListId: string) =>
    ({type: "CHANGE-TASK-TITLE", title: title, id, todoListId} as const)


export const updateTaskAC = (todoListId: string, id: string, task: UpdateTaskModelType) =>
    ({type: "UPDATE-TASK", todoListId, id, task} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | AppActionsType>) => {
    dispatch(setTaskStatusAC("loading"))
    todoListsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setTaskStatusAC("succeeded"))
        })
}

export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch<ActionsType>) => {
    todoListsAPI.deleteTask(todoListID, taskID)
        .then(() => {
            const action = removeTaskAC(taskID, todoListID)
            dispatch(action)
        })
}

export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch<ActionsType | AppActionsType>) => {
    dispatch(setTodoListStatusAC("loading"))
    todoListsAPI.addTask(todoListID, title)
        .then(res => {
            const action = addTaskAC(res.data.data.item)
            dispatch(action)
            dispatch(setTodoListStatusAC("succeeded"))
        })
}

export const changeTaskStatusTC = (todoListID: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootState) => {

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
                const action = updateTaskAC(todoListID, taskId, model)
                dispatch(action)
            })
    }


