import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./TodoList.module.css";
import { IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.charCode === 13) {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else setError(true)
    }

    return (
        <div>
            <TextField
                label={"Enter your task"}
                variant={"outlined"}
                size={"small"}
                error={error}

                helperText={error && 'Title is required'}
                value={newTaskTitle}
                className={error ? s.error : ''}
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}/>
            <IconButton
                onClick={addTaskHandler}>
                <AddCircle />
            </IconButton>
        </div>
    )
}