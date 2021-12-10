import React, {useState} from "react";
import s from './TodoList.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: "all" | "active" | "completed") => void
    addTask: (title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    return (

        <div className={s.TodoListWrapper}>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(event) => setNewTaskTitle(event.currentTarget.value)}
                       onKeyPress={ (event) => {
                           console.log(event)
                       }}
                />
                <button
                    onClick={() => {
                        addTask(newTaskTitle)
                        setNewTaskTitle('')
                    }}>+
                </button>
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
                                <button onClick={() => removeTask(task.id)}>x</button>
                            </li>
                        )
                    })}
                </ul>
                <div className={s.TodoListButtonBlock}>
                    <button onClick={() => changeFilter('all')}>All</button>
                    <button onClick={() => changeFilter('active')}>Active</button>
                    <button onClick={() => changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}