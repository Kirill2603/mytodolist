import React from "react";
import {
    Button, ButtonGroup,
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

export const Header = () => {

    const {toggleColorMode} = useColorMode()

    return (
        <>
            <Flex justifyContent={"space-between"} p={5}>
                <Heading>ToDo List</Heading>

                <Flex>
                    <ButtonGroup isAttached variant='outline'>
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
                    </ButtonGroup>
                </Flex>
            </Flex>
        </>
    )
}