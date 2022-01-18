import {useDispatch} from "react-redux";
import React, {useCallback} from "react";
import {addTodoListAC} from "../state/todolists-reducer";
import {
    Button,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode
} from "@chakra-ui/react";
import {ChevronDownIcon, SunIcon} from "@chakra-ui/icons";
import {AddItemForm} from "./AddItemForm";

export const Header = () => {

    const dispatch = useDispatch()
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const {toggleColorMode} = useColorMode()

    return (
        <>
            <Flex justifyContent={"space-between"} p={5}>
                <Heading>ToDo List</Heading>
                <AddItemForm addItem={addTodoList}/>
                <Flex>
                    <IconButton aria-label={"set mode"} icon={<SunIcon/>} onClick={toggleColorMode}/>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Menu
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Login</MenuItem>
                            <MenuItem>Create a Copy</MenuItem>
                            <MenuItem>Mark as Draft</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Attend a Workshop</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </>
    )
}