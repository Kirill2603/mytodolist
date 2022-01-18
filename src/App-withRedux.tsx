import React from 'react';
import {TodoList} from "./components/TodoList";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Header} from "./components/header";
import {Grid, GridItem} from "@chakra-ui/react";
import {TodolistDomainType} from "./state/todolists-reducer";

function AppWithRedux() {

    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists)

    return (
        <>
            <Header/>
            <Grid templateColumns='repeat(4, 1fr)' gap={6} m={3}>
                {
                    todoLists.map((todoList) => {
                        return (
                            <GridItem key={todoList.id}>
                                <TodoList
                                    key={todoList.id}
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


