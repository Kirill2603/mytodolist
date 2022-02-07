import React from "react";
import {
    Button, ButtonGroup,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Progress,
    useColorMode
} from "@chakra-ui/react";
import {ChevronDownIcon, SunIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {Link} from "react-router-dom";
import {path} from "../App-withRedux";

export const Header = () => {

    const {toggleColorMode} = useColorMode()

    // const TodoListsStatus = useSelector<AppRootStateType, 'idle' | 'loading' | 'succeeded' | 'failed'>( (state) =>
    //     state.app.TodoListsStatus)



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
                            <MenuItem as={Link} to={path.login}>Login</MenuItem>
                            <MenuItem as={Link} to={path.todo}>Todo Lists</MenuItem>
                        </MenuList>
                    </Menu>
                    </ButtonGroup>
                </Flex>
            </Flex>

            {/*{TodoListsStatus === 'loading'*/}
            {/*    &&*/}
            {/*    <Progress*/}
            {/*    style={{position: "absolute", zIndex: 10, width: '100%', height: '5px', top: 0}}*/}
            {/*    size='xs'*/}
            {/*    isIndeterminate />}*/}


        </>
    )
}

