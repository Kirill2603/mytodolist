import React, {ChangeEvent} from "react";
import s from './TodoList.module.css'
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (newTodoListTitle: string, todoListId: string) => void

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
        removeTodoList,
        changeTaskTitle,
        changeTodoListTitle,
    }) => {

    const removeTodoListHandler = () => {
      removeTodoList (id)
    }

    const addTask = (title: string) => {
        addItem (title, id)
    }

    const changeTodoListTitleHandler = (newTodoListTitle: string) => {
        changeTodoListTitle (newTodoListTitle, id)
    }
    
    return (
        <div className={s.TodoListWrapper}>
            <h3><EditableSpan title={title} onChangeTitle={changeTodoListTitleHandler}/>
            <IconButton onClick={removeTodoListHandler}>
                <Delete />
            </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask} />
                <List>
                    {tasks.map((task) => {

                        const onClickHandler = () => removeTask(task.id, id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(task.id, e.currentTarget.checked, id)
                        }
                        const onChangeTaskHandler = (newTaskTitle: string) => {
                            changeTaskTitle(task.id, newTaskTitle, id)
                        }

                        return (
                            <ListItem key={task.id} className={task.isDone ? s.IsDone : ''}>
                                <Checkbox
                                       onChange={onChangeStatusHandler}
                                       checked={task.isDone}/>
                                <EditableSpan
                                    onChangeTitle={onChangeTaskHandler}
                                    title={task.title} />
                                <IconButton onClick={onClickHandler}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
                <div className={s.TodoListButtonBlock}>
                    <ButtonGroup variant={"outlined"}>
                    <Button
                        className={filter === 'all'? s.ActiveFilter : ''}
                        onClick={() => changeFilter('all', id)}>All</Button>
                    <Button
                        className={filter === 'active'? s.ActiveFilter : ''}
                        onClick={() => changeFilter('active', id)}>Active</Button>
                    <Button
                        className={filter === 'completed'? s.ActiveFilter : ''}
                        onClick={() => changeFilter('completed', id)}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

