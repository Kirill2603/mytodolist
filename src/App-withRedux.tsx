import React from 'react';
import {TodoList} from "./components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Header} from "./components/header";
import {Grid, GridItem} from "@chakra-ui/react";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)


    return (
        <>
            <Header/>
            <Grid templateColumns='repeat(5, 1fr)' gap={6} m={3}>
                {
                    todoLists.map((todoList) => {
                        return (
                            <GridItem>
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


