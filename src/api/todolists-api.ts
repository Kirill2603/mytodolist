import axios from "axios";

type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}
// ResponseType<Уточняет объект D при объявлении типа>
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c1850674-2ba1-4277-8a68-62e315d41cd0',
    }
})


export const todoListsAPI = {

    getTodoLists() {
        return instance.get<Array<TodoListsType>>('todo-lists')
    },
    addTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListsType}>>('todo-lists', {title: title})
    },
    deleteTodoLIst(todoLIstID: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoLIstID}`)
    },
    changeTodoListTitle(todoLIstID: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todoLIstID}`,{title: title})
    },


    getTasks(todoLIstID: string) {
        return instance.get(`todo-lists/${todoLIstID}/tasks`)
    },
    addTask(todoLIstID: string, title: string) {
        return instance.post(`todo-lists/${todoLIstID}/tasks`, {title: title})
    },
}