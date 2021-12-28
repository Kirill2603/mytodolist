import React, {useCallback} from "react";
import s from './TodoList.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {FilterValuesType} from "../App-withRedux";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodolistAC} from "../state/todolists-reducer";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodoList: React.FC<TodoListPropsType> = ({id,title,filter}) => {

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()


    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [])

    const changeTodoListTitleHandler = (newTodoListTitle: string) => {
        dispatch(changeTodoListTitleAC(newTodoListTitle, id))
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        dispatch(changeTodoListFilterAC(filter, todolistId))
    }

    let tasksForTodoList = tasks

    if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
    }
    if (filter === 'all') {
        tasksForTodoList = tasksForTodoList.filter(task => task)
    }

    
    return (
        <div className={s.TodoListWrapper}>
            <h3><EditableSpan title={title} onChangeTitle={changeTodoListTitleHandler}/>
            <IconButton onClick={() => dispatch(removeTodolistAC(id))}>
                <Delete />
            </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask} />
                <List>
                    {tasksForTodoList.map((task) => {

                        const onChangeTaskHandler = (newTaskTitle: string) => {
                            dispatch(changeTaskTitleAC(newTaskTitle, task.id, id))
                        }

                        return (
                            <ListItem key={task.id} className={task.isDone ? s.IsDone : ''}>
                                <Checkbox
                                       onChange={(e) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, id))}
                                       checked={task.isDone}/>
                                <EditableSpan
                                    onChangeTitle={onChangeTaskHandler}
                                    title={task.title} />
                                <IconButton onClick={() => dispatch(removeTaskAC(task.id, id))}>
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

