import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./TodoList.module.css";

type AddItemFormPropsType = {
    id: string
    addItem: (title: string, todolistId: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({id, addItem}) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.charCode === 13) {
            addItem(newTaskTitle, id)
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle.trim(), id)
            setNewTaskTitle('')
        } else setError(true)
    }

    return (
        <div>
            <input value={newTaskTitle}
                   className={error ? s.error : ''}
                   onChange={onChangeTitleHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.errorMessage}>Field is required</div>}
        </div>
    )
}