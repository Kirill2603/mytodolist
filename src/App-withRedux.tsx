import React, {useCallback, useEffect} from 'react';
import {TodoList} from "./components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Header} from "./components/header";
import {Grid, GridItem} from "@chakra-ui/react";
import {addTodoListTC, fetchTodoListTC, TodolistDomainType} from "./state/todolists-reducer";
import {AddItemForm} from "./components/AddItemForm";
import {Routes, Route} from "react-router-dom";
import {LoginForm} from "./components/loginForm";

export const path = {
    login: '/',
    todo: '/todo',
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)

    useEffect(() => {
        dispatch(fetchTodoListTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListTC(title)
        dispatch(action)
    }, [dispatch])

    return (<>
        <Header/>
        <Routes>
            <Route path={path.todo} element={
                <Grid templateColumns='repeat(4, 1fr)' gap={6} m={3} alignItems={"start"}>

                    <AddItemForm addItem={addTodoList} />

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
                <LoginForm />
            }/>
        </Routes>
        </>
    );
}

export default AppWithRedux;


