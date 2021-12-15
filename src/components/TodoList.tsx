import React, {ChangeEvent} from "react";
import s from './TodoList.module.css'
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addItem: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (
    {
        id,
        title,
        tasks,
        removeTask,
        changeFilter,
        addItem,
        changeStatus,
        filter,
        removeTodoList
    }) => {

    const removeTodoListHandler = () => {
      removeTodoList(id)
    }

    return (
        <div className={s.TodoListWrapper}>
            <h3>{title}<button onClick={removeTodoListHandler}>x</button></h3>
            <div>
                <AddItemForm addItem={addItem} id={id} />
                <ul>
                    {tasks.map((task) => {

                        const onClickHandler = () => removeTask(task.id, id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(task.id, e.currentTarget.checked, id)
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

