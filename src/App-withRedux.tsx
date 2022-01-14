import React, {useCallback} from 'react';
import {TodoList} from "./components/TodoList";
import './App.css'
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Grid, Paper} from "@mui/material";
import {addTodoListAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AppBar enableColorOnDark={true} position="static" style={{marginBottom: "12px"}}>
                <Toolbar>
                    <Grid container xs={5} direction={"row"} justifyContent="center"
                          alignItems="center">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            ToDo List
                        </Typography>
                    </Grid>
                    <Grid container xs gridTemplateRows={1}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container xs={2} alignItems={"end"} justifyContent={"end"}>
                        <Button color="inherit">Login</Button>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3} alignItems={"center"} justifyContent={"center"}>
                {
                    todoLists.map((todoList) => {
                        return (
                            <Grid item>
                                <Paper elevation={12} style={{padding: '15px'}}>
                                    <TodoList
                                        key={todoList.id}
                                        id={todoList.id}
                                        title={todoList.title}
                                        filter={todoList.filter}/>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default AppWithRedux;
