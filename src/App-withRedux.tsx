import React, {useCallback, useEffect} from 'react';
import {TodoList} from "./components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Header} from "./components/header";
import {Grid, GridItem, Progress} from "@chakra-ui/react";
import {addTodoListTC, fetchTodoListTC, TodolistDomainType} from "./state/todolists-reducer";
import {AddItemForm} from "./components/AddItemForm";

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

    return (
        <>
            <Header/>
            <Progress size='xs' isIndeterminate />

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

        </>
    );
}

export default AppWithRedux;


