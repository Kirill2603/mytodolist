import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({title,onChangeTitle}) => {

    let [editMode, setEditMode] = useState(false)
    let [editTitle, setEditTitle] = useState("")

    const changeEditMode =() => {
        setEditMode(!editMode)
        onChangeTitle(editTitle)
        setEditTitle(title)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
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
            ? <input
                value={editTitle}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeEditTitleHandler}
                onDoubleClickCapture={changeEditMode}
                autoFocus={true}/>
            : <span onDoubleClick={changeEditMode}>{title}</span>
    )
}