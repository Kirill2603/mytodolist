import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Input, Text} from "@chakra-ui/react";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, onChangeTitle}) => {

    let [editMode, setEditMode] = useState(false)
    let [editTitle, setEditTitle] = useState("")

    const changeEditMode = () => {
        setEditMode(!editMode)
        onChangeTitle(editTitle)
        setEditTitle(title)
    }
    const onKeyPressHandler = ({charCode}: KeyboardEvent<HTMLInputElement>) => {
        if (charCode === 13) {
            setEditMode(!editMode)
            onChangeTitle(editTitle)
            setEditTitle(title)
        }
    }

    const onChangeEditTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <Input
                value={editTitle}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeEditTitleHandler}
                onDoubleClickCapture={changeEditMode}/>

            : <Text
                onDoubleClick={changeEditMode}
                fontSize='xl'>{title}</Text>
    )
})