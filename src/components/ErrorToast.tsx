import React from "react";
import {useToast} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/store";

export const ToastStatusExample = () => {

    const errorBar = useToast()

    const error = useSelector<AppRootState>(state => state.app.TodoListsError)

    return (
        <div >
            {errorBar({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })}
        </div>
    )
}
