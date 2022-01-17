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


export const AddTodoList = () => {

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

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    const todoListID = 'ab020602-6fd4-44c5-ba93-03ce2cc1297a'

    useEffect(() => {
        todoListsAPI.getTasks(todoListID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const AddTask = () => {

    const [state, setState] = useState<any>(null)

    const todoListID = 'ab020602-6fd4-44c5-ba93-03ce2cc1297a'

    useEffect(() => {
        todoListsAPI.addTask(todoListID, "third task")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

