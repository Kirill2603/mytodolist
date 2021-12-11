import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    return (

        <div className={s.TodoListWrapper}>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler} />
                <button onClick={addTaskHandler}>+</button>
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