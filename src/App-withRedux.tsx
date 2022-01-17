import React from 'react';
import {TodoList} from "./components/TodoList";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Header} from "./components/header";
import {Grid, GridItem} from "@chakra-ui/react";

export type TasksType = {
    id: string
    title: string
    status: number
}

export type FilterValuesType = "all" | "in progress" | "completed" | 'new' | 'draft'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)


    return (
        <>
            <Header/>
            <Grid templateColumns='repeat(3, 1fr)' gap={6} m={3}>
                {
                    todoLists.map((todoList) => {
                        return (
                            <GridItem key={todoList.id}>
                                <TodoList
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    filter={todoList.filter}/>
                            </GridItem>
                        )
                    })
                }
            </Grid>
        </>


    );
}

export default AppWithRedux;


