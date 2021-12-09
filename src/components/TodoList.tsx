import React from "react";
import s from './TodoList.module.css'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export const TodoList: React.FC<TodoListPropsType> = ({title, tasks}) => {
    return (
        <div className={s.TodoListWrapper}>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
                <ul>
                    <li><input type="checkbox" checked={tasks[0].isDone}/><span>{tasks[0].title}</span></li>
                    <li><input type="checkbox" checked={tasks[1].isDone}/><span>{tasks[1].title}</span></li>
                    <li><input type="checkbox" checked={tasks[2].isDone}/><span>{tasks[2].title}</span></li>
                </ul>
                <div className={s.TodoListButtonBlock}>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}