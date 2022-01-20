import React, {useEffect} from 'react';
import {TodoList} from "./components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Header} from "./components/header";
import {Grid, GridItem} from "@chakra-ui/react";
import {fetchTodoListTC, TodolistDomainType} from "./state/todolists-reducer";

function AppWithRedux() {

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)

    useEffect(() => {
        dispatch(fetchTodoListTC())
    }, [dispatch])

    return (
        <>
            <Header/>
            <Grid templateColumns='repeat(3, 1fr)' gap={6} m={3}>
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
        </>
    );
}

export default AppWithRedux;


