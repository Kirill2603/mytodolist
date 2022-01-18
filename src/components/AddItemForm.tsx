import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Center, IconButton, Input} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo (({addItem}) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!error && event.charCode === 13) {
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
        <Center>
            {/*<input*/}
            {/*    value={newTaskTitle}*/}
            {/*    onChange={onChangeTitleHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}/>*/}
            <Input
                variant='outline'
                placeholder='Add new'
                value={newTaskTitle}
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}/>
            <IconButton aria-label='Add'
                        icon={<AddIcon />}
                        onClick={addTaskHandler}/>
        </Center>
    )
} )