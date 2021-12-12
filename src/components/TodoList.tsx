import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './TodoList.module.css'
import {FilterValuesType} from "../App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const TodoList: React.FC<TodoListPropsType> = (
    {
        id,
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeStatus,
        filter
    }) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.charCode === 13) {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle.trim())
            setNewTaskTitle('')

        } else setError(true)

    }

    return (
        <div className={s.TodoListWrapper}>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       className={error ? s.error : ''}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={s.errorMessage}>Field is required</div>}
                <ul>
                    {tasks.map((task) => {

                        const onClickHandler = () => removeTask(task.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(task.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? s.IsDone : ''}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={task.isDone}/><span>{task.title}</span>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })}
                </ul>
                <div className={s.TodoListButtonBlock}>
                    <button
                        className={filter === 'all'? s.ActiveFilter : ''}
                        onClick={() => changeFilter('all', id)}>All</button>
                    <button
                        className={filter === 'active'? s.ActiveFilter : ''}
                        onClick={() => changeFilter('active', id)}>Active</button>
                    <button
                        className={filter === 'completed'? s.ActiveFilter : ''}
                        onClick={() => changeFilter('completed', id)}>Completed</button>
                </div>
            </div>
        </div>
    )
}