import React from "react";

type EditableSpanPropsType = {
    title: string
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({title}) => {
    return (
        <span>{title}</span>
    )
}