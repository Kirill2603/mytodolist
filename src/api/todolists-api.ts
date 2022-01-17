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
    data: D
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c1850674-2ba1-4277-8a68-62e315d41cd0',
    }
}

export const todoListsAPI = {
    getTodoLists() {
        return axios.get<Array<TodoListsType>>('https://social-network.samuraijs.com/api/1.0/todo-lists', settings)
    },
    addTodoList(title: string) {
        return axios.post<ResponseType<{item: TodoListsType}>>('https://social-network.samuraijs.com/api/1.0/todo-lists', {title: title}, settings)
    },
    deleteTodoLIst(todoLIstID: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoLIstID}`, settings)
    },
    changeTodoListTitle(todoLIstID: string, title: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoLIstID}`,{title: title}, settings)
    }
}