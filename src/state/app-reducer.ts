export type initialStateType = {
    TodoListsStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
    TodoListsError: string | null
    TasksStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
    TasksError: string | null
}

const initialState: initialStateType = {
    TodoListsStatus: 'idle',
    TodoListsError: null,
    TasksStatus: 'idle',
    TasksError: null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'TODOLIST/SET-STATUS':
            return {...state, TodoListsStatus: action.TodoListStatus}
        case 'TODOLIST/SET-ERROR':
            return {...state, TodoListsError: action.TodoListError}
        case 'TASK/SET-STATUS':
            return {...state, TodoListsStatus: action.TaskStatus}
        case 'TASK/SET-ERROR':
            return {...state, TodoListsError: action.TaskError}
        default:
            return state
    }
}

export const setTodoListErrorAC = (TodoListError: string | null) =>
    ({type: 'TODOLIST/SET-ERROR', TodoListError} as const)
export const setTodoListStatusAC = (TodoListStatus: 'idle' | 'loading' | 'succeeded' | 'failed') =>
    ({type: 'TODOLIST/SET-STATUS',TodoListStatus} as const)
export const setTaskErrorAC = (TaskError: string | null) =>
    ({type: 'TASK/SET-ERROR', TaskError} as const)
export const setTaskStatusAC = (TaskStatus: 'idle' | 'loading' | 'succeeded' | 'failed') =>
    ({type: 'TASK/SET-STATUS',TaskStatus} as const)


type SetTodoListErrorActionType = ReturnType<typeof setTodoListErrorAC>
type SetStatusActionType = ReturnType<typeof setTodoListStatusAC>
type SetTaskErrorActionType = ReturnType<typeof setTaskErrorAC>
type SetTaskStatusActionType = ReturnType<typeof setTaskStatusAC>

export type AppActionsType =
    | SetTodoListErrorActionType
    | SetStatusActionType
    | SetTaskErrorActionType
    | SetTaskStatusActionType
