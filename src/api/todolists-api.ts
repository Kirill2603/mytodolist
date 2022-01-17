import axios from "axios";

type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodoListResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodoListsType
    }
}

type DeleteTodoListResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type UpdateTodoListType = {
    resultCode: number
    messages: Array<string>
    data: {}
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
        return axios.post<CreateTodoListResponseType>('https://social-network.samuraijs.com/api/1.0/todo-lists', {title: title}, settings)
    },
    deleteTodoLIst(todoLIstID: string) {
        return axios.delete<DeleteTodoListResponseType>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoLIstID}`, settings)
    },
    changeTodoListTitle(todoLIstID: string, title: string) {
        return axios.put<UpdateTodoListType>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoLIstID}`,{title: title}, settings)
    }
}