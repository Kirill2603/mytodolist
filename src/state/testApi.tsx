import {useEffect, useState} from "react";
import {todoListsAPI} from "../api/todolists-api";



export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todoListsAPI.getTodoLists()
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return (
        <h1>{JSON.stringify(state)}</h1>
    )
}


export const AddPost = () => {

    const [state, setState] = useState<any>(null)

    const title = "New TODO LIST"

    useEffect(() => {
        todoListsAPI.addTodoList(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return (
        <></>
    )
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)

    const todoListID = '9a214e35-3a1e-49f4-aeb3-bfb36869d236'

    useEffect(() => {
        todoListsAPI.deleteTodoLIst(todoListID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const ChangeTodoListTitle = () => {

    const [state, setState] = useState<any>(null)

    const todoListID = '9a214e35-3a1e-49f4-aeb3-bfb36869d236'
    const title = "Changed!!!"

    useEffect(() => {
        todoListsAPI.changeTodoListTitle(todoListID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return (
        <></>
    )
}