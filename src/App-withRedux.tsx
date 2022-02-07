import React, {useCallback, useEffect} from 'react';
import {TodoList} from "./components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Header} from "./components/header";
import {Center, CircularProgress, Grid, GridItem} from "@chakra-ui/react";
import {addTodoListTC, fetchTodoListTC, TodolistDomainType} from "./state/todolists-reducer";
import {AddItemForm} from "./components/AddItemForm";
import {Routes, Route} from "react-router-dom";
import {LoginForm} from "./components/loginForm";
import {initialiseAppTC} from "./state/app-reducer";

export const path = {
    login: '/login',
    todo: '/todo',
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    useEffect(() => {
        dispatch(initialiseAppTC())
        dispatch(fetchTodoListTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListTC(title)
        dispatch(action)
    }, [dispatch])

    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialised)

    // const isLoggedIn = useSelector<AppRootStateType , boolean>(state => state.auth.isLoggedIn)
    //
    // const navigate = useNavigate()
    //
    // !isLoggedIn && navigate(path.login)

    return (<>

            <Header/>
            {!initialized
                ?
                <>
                    <Center p={5} h={'50vh'}>
                        <CircularProgress size={200} isIndeterminate color='green.300'/>
                    </Center>
                </>
                :
                <>


                    <Routes>
                        <Route path={path.todo} element={
                            <Grid templateColumns='repeat(4, 1fr)' gap={6} m={3} alignItems={"start"}>
                                <AddItemForm addItem={addTodoList}/>
                                {
                                    todoLists.map((todoList) => {
                                        return (
                                            <GridItem key={todoList.id}>
                                                <TodoList
                                                    id={todoList.id}
                                                    title={todoList.title}
                                                    activeStatus={todoList.activeStatus}
                                                />
                                            </GridItem>
                                        )
                                    })
                                }
                            </Grid>
                        }/>
                        <Route path={path.login} element={
                            <LoginForm/>
                        }/>
                    </Routes>
                </>

            }


        </>
    );
}

export default AppWithRedux;


