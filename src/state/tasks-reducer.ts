import {addTodoListAC, removeTodolistAC, setTodoListsAC} from "./todolists-reducer";
import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";


type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
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
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            stateCopy[action.todoListId] = tasks.filter(t => t.id !== action.id);
            return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId];
            stateCopy[newTask.todoListId] = [newTask, ...tasks];
            return stateCopy;
        }

        case 'UPDATE-TASK' : {
            let todoListTasks = state[action.todoListId]
            state[action.todoListId] = todoListTasks
                .map(t => t.id === action.id ? {...t, ...action.task} : t)
            return {...state}
        }

        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todoListId];
            // найдём нужную таску:
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.id ? {...t, title: action.title} : t);
            return ({...state});
        }

        case 'CHANGE-TASK-STATUS' : {
            let todolistTasks = state[action.todoListId];
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.id ? {...t, status: action.status} : t);
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
            return {
                ...state,
                [action.todoList.id]: []
            }
        }

        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
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


export const changeTaskStatusAC = (id: string, status: TaskStatuses, todoListId: string) =>
    ({type: "CHANGE-TASK-STATUS", status: status, id, todoListId} as const)

export const updateTaskAC = (todoListId: string, id: string, task: UpdateTaskModelType) =>
    ({type: "UPDATE-TASK", todoListId, id, task} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const )



export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (todoListID: string, taskID: string) => {
  return (dispatch: Dispatch) => {
      todoListsAPI.deleteTask(todoListID, taskID)
          .then(() => {
              const action = removeTaskAC(taskID, todoListID)
              dispatch(action)
          })
  }
}

export const addTaskTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.addTask(todoListID, title)
            .then(res => {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
            })
    }
}

export const changeTaskStatusTC = (todoListID: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

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

        debugger
        todoListsAPI.changeTask(todoListID, taskId, model)
            .then((res) => {
                const action = changeTaskStatusAC(res.data.data.todoListId, res.data.data.status, res.data.data.id)
                dispatch(action)
            })
    }
}

