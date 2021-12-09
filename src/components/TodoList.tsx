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
    removeTask: (id: number) => void
    // removeTask: Function
    setFilter: (filter: "all" | "active" | "completed") => void
}

export const TodoList: React.FC<TodoListPropsType> = ({title, tasks, removeTask, setFilter}) => {
    return (
        <div className={s.TodoListWrapper}>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li>
                                <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
                                <button onClick={() => removeTask(task.id)}>x</button>
                            </li>
                    )
                    })}
                </ul>
                <div className={s.TodoListButtonBlock}>
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter('active')}>Active</button>
                    <button onClick={() => setFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}