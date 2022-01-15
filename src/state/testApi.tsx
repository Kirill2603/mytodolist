import {useEffect, useState} from "react";
import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c1850674-2ba1-4277-8a68-62e315d41cd0',
    }
}

export const GetDataFromAPI = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.0/todo-lists', settings)

        .then((res) => {
            setState(res.data)
        })
    }, [])

    return (
        <div>{JSON.stringify(state)}</div>
    )
}


export const PostDataToAPI = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.0/todo-lists',{title: 'firs post'}, settings)

            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return (
        <button onClick={()=> {}}>Post!</button>
    )
}