import React from "react";
import {useToast} from "@chakra-ui/react";

export const ToastStatusExample = () => {

    const toast = useToast()

    return (
        <>
            {toast({title: `Error toast`, status: 'error', isClosable: true})}
        </>
    )
}